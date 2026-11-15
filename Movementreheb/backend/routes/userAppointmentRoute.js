import "dotenv/config";
import express from "express";
import authUser from "../middleware/auth.js";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

import {
  createUserBookingAppointment,
  getUserBookingAppointment,
} from "../controllers/userBookingAppointmentController.js";

const userAppointmentRouter = express.Router();

const getCalendar = () => {
  const missing = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_REDIRECT_URI",
    "GOOGLE_REFRESH_TOKEN",
  ].filter((k) => !process.env[k]);

  if (missing.length) {
    throw new Error("Missing .env variables: " + missing.join(", "));
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
};

const getTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const bookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

const esc = (s = "") =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

const convertTo24Hour = (time) => {
  const m = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(String(time).trim());
  if (!m) return null;

  let h = Number(m[1]);
  const mod = m[3].toUpperCase();

  if (mod === "PM" && h !== 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;

  return `${String(h).padStart(2, "0")}:${m[2]}`;
};

const locks = new Set();

userAppointmentRouter.post(
  "/createAppointment",
  authUser,
  createUserBookingAppointment,
);

userAppointmentRouter.get(
  "/getUserBookingAppointment",
  authUser,
  getUserBookingAppointment,
);

userAppointmentRouter.post("/book", bookLimiter, async (req, res) => {
  let lockKey;

  try {
    const calendar = getCalendar();
    const data = req.body;

    if (data.visitType === "Follow-up") {
      if (!data.patientName || !data.mobile) {
        return res.status(400).json({
          success: false,
          message: "Patient name, mobile number are required",
        });
      }
    } else {
      if (!data.patientName || !data.mobile || !data.complaint) {
        return res.status(400).json({
          success: false,
          message: "Patient name, mobile number and complaint are required",
        });
      }
    }

    if (!/^[6-9]\d{9}$/.test(data.mobile)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid 10 digit mobile number",
      });
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return res.status(400).json({
        success: false,
        message: "Enter valid email",
      });
    }

    if (data.mode === "Home Visit") {
      if (!data.address || !data.city || !data.landmark) {
        return res.status(400).json({
          success: false,
          message: "Address, city and landmark are required for home visit",
        });
      }
    }

    if (!data.appointmentDate || !data.mode || !data.timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Appointment date, mode and time slot are required",
      });
    }

    const time24 = convertTo24Hour(data.timeSlot);

    if (!time24 || !/^\d{4}-\d{2}-\d{2}$/.test(data.appointmentDate)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date or time slot",
      });
    }

    const startDateTime = new Date(
      `${data.appointmentDate}T${time24}:00+05:30`,
    );

    if (isNaN(startDateTime.getTime()) || startDateTime < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Select a valid future slot",
      });
    }

    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

    // Prevent simultaneous double booking (single server instance)
    lockKey = startDateTime.toISOString();
    if (locks.has(lockKey)) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked. Please select another slot.",
      });
    }
    locks.add(lockKey);

    const attendees = [];
    if (data.email && data.email.trim()) {
      attendees.push({ email: data.email.trim() });
    }

    const event = {
      summary: `Physiotherapy Appointment - ${data.patientName}`,
      description: `
Patient Name: ${data.patientName}
Age: ${data.age || "Not provided"}
Gender: ${data.gender || "Not provided"}
Mobile: ${data.mobile}
Email: ${data.email || "Not provided"}

Mode: ${data.mode}
Visit Type: ${data.visitType || "Not provided"}
Complaint: ${data.complaint || "Not provided"}
Duration: ${data.duration || "Not provided"}
Diagnosis: ${data.diagnosis || "Not provided"}
Pain Level: ${data.painLevel || "Not provided"}

Address: ${data.address || ""}
City: ${data.city || ""}
Landmark: ${data.landmark || ""}
      `,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const existingEvents = await calendar.events.list({
      calendarId: "primary",
      timeMin: startDateTime.toISOString(),
      timeMax: endDateTime.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    if (existingEvents.data.items.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked. Please select another slot.",
      });
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendUpdates: "all",
    });

    const calendarLink = response.data.htmlLink;

    // Email failure should not fail the booking
    try {
      await getTransporter().sendMail({
        from: `"Movement Rehab Appointment" <${process.env.EMAIL_USER}>`,
        to: process.env.OWNER_EMAIL,
        subject: `New Appointment Booked - ${data.patientName}`,
        html: `
        <h2>New Appointment Booked</h2>

        <p><strong>${esc(data.patientName)}</strong> has booked an appointment.</p>

        <h3>Patient Details</h3>
        <p><strong>Name:</strong> ${esc(data.patientName)}</p>
        <p><strong>Age:</strong> ${esc(data.age || "Not provided")}</p>
        <p><strong>Gender:</strong> ${esc(data.gender || "Not provided")}</p>
        <p><strong>Mobile:</strong> ${esc(data.mobile)}</p>
        <p><strong>Email:</strong> ${esc(data.email || "Not provided")}</p>

        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> ${esc(data.appointmentDate)}</p>
        <p><strong>Time Slot:</strong> ${esc(data.timeSlot)}</p>
        <p><strong>Mode:</strong> ${esc(data.mode)}</p>
        <p><strong>Visit Type:</strong> ${esc(data.visitType || "Not provided")}</p>

        <h3>Medical Details</h3>
        <p><strong>Complaint:</strong> ${esc(data.complaint || "Not provided")}</p>
        <p><strong>Duration:</strong> ${esc(data.duration || "Not provided")}</p>
        <p><strong>Diagnosis:</strong> ${esc(data.diagnosis || "Not provided")}</p>
        <p><strong>Pain Level:</strong> ${esc(data.painLevel || "Not provided")}</p>

        <h3>Address Details</h3>
        <p><strong>Address:</strong> ${esc(data.address || "Not provided")}</p>
        <p><strong>City:</strong> ${esc(data.city || "Not provided")}</p>
        <p><strong>Landmark:</strong> ${esc(data.landmark || "Not provided")}</p>

        <br />

        <p>
          <a href="${esc(calendarLink)}" target="_blank">
            View Appointment in Google Calendar
          </a>
        </p>
      `,
      });
    } catch (mailErr) {
      console.error("Email Error:", mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      calendarLink,
    });
  } catch (error) {
    console.error("Booking Error:", error.message, error.response?.data);

    res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  } finally {
    if (lockKey) locks.delete(lockKey);
  }
});

userAppointmentRouter.get("/booked-slots", async (req, res) => {
  try {
    const calendar = getCalendar();
    const { date } = req.query;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Valid date is required",
      });
    }

    const startOfDay = new Date(`${date}T00:00:00+05:30`);
    const endOfDay = new Date(`${date}T23:59:59+05:30`);

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const bookedSlots = response.data.items
      .filter((event) => event.start?.dateTime)
      .map((event) =>
        new Date(event.start.dateTime)
          .toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          })
          .toUpperCase(),
      );

    res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    console.error("Booked Slots Error:", error.message, error.response?.data);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booked slots",
    });
  }
});

export default userAppointmentRouter;