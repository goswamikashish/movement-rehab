import { useEffect } from "react";

const businessId = "https://movementrehab.in/#physiotherapy-clinic";
const websiteId = "https://movementrehab.in/#website";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": businessId,

  name: "Movement Rehab | Physiotherapy & Rehabilitation in Indore",
  alternateName: "Movement Rehab",

  url: "https://movementrehab.in/",
  telephone: "+916262666558",

  description:
    "Movement Rehab is a physiotherapy and rehabilitation center in Indore offering professional physiotherapy, rehabilitation and physical therapy services.",

  medicalSpecialty: "Physiotherapy",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Khandwa Naka, Bhavna Nagar",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452020",
    addressCountry: "IN",
  },

  areaServed: [
    {
      "@type": "City",
      name: "Indore",
    },
    {
      "@type": "AdministrativeArea",
      name: "Madhya Pradesh",
    },
  ],

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],

  founder: {
    "@type": "Person",
    "@id": "https://movementrehab.in/#dr-mayank-gupta",
    name: "Dr. Mayank Gupta",
    jobTitle: "Physiotherapist",
    worksFor: {
      "@id": businessId,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,

  url: "https://movementrehab.in/",
  name: "Movement Rehab",
  description:
    "Movement Rehab Physiotherapy & Rehabilitation Center in Indore.",

  publisher: {
    "@id": businessId,
  },

  inLanguage: "en-IN",
};

const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

function addSchema(schema, id) {
  const script = document.createElement("script");

  script.type = "application/ld+json";
  script.id = id;

  script.textContent = JSON.stringify(schema);

  document.head.appendChild(script);
}

function removeSchema(id) {
  const existing = document.getElementById(id);

  if (existing) {
    existing.remove();
  }
}

export default function SchemaMarkup() {
  const pathname = window.location.pathname.toLowerCase();

  useEffect(() => {
    // Remove schemas from previous route
    removeSchema("movement-business-schema");
    removeSchema("movement-website-schema");
    removeSchema("movement-breadcrumb-schema");

    // --------------------------------
    // HOME PAGE
    // --------------------------------
    if (pathname === "/") {
      addSchema(businessSchema, "movement-business-schema");
      addSchema(websiteSchema, "movement-website-schema");
    }

    // --------------------------------
    // ABOUT PAGE
    // --------------------------------
    else if (pathname === "/about") {
      addSchema(businessSchema, "movement-business-schema");

      addSchema(
        breadcrumbSchema([
          {
            name: "Home",
            url: "https://movementrehab.in/",
          },
          {
            name: "About",
            url: "https://movementrehab.in/About",
          },
        ]),
        "movement-breadcrumb-schema"
      );
    }

    // --------------------------------
    // OFFERING PAGE
    // --------------------------------
    else if (pathname === "/offering") {
      addSchema(businessSchema, "movement-business-schema");

      addSchema(
        breadcrumbSchema([
          {
            name: "Home",
            url: "https://movementrehab.in/",
          },
          {
            name: "Offering",
            url: "https://movementrehab.in/Offering",
          },
        ]),
        "movement-breadcrumb-schema"
      );
    }

    // --------------------------------
    // SERVICE PAGE
    // --------------------------------
    else if (pathname === "/service") {
      addSchema(businessSchema, "movement-business-schema");

      addSchema(
        breadcrumbSchema([
          {
            name: "Home",
            url: "https://movementrehab.in/",
          },
          {
            name: "Services",
            url: "https://movementrehab.in/Service",
          },
        ]),
        "movement-breadcrumb-schema"
      );
    }

    // --------------------------------
    // APPOINTMENT PAGE
    // --------------------------------
    else if (pathname === "/appointment") {
      addSchema(businessSchema, "movement-business-schema");

      addSchema(
        breadcrumbSchema([
          {
            name: "Home",
            url: "https://movementrehab.in/",
          },
          {
            name: "Appointment",
            url: "https://movementrehab.in/Appointment",
          },
        ]),
        "movement-breadcrumb-schema"
      );
    }

    // --------------------------------
    // BLOG PAGE
    // --------------------------------
    else if (pathname === "/blogs") {
      addSchema(
        breadcrumbSchema([
          {
            name: "Home",
            url: "https://movementrehab.in/",
          },
          {
            name: "Blogs",
            url: "https://movementrehab.in/Blogs",
          },
        ]),
        "movement-breadcrumb-schema"
      );
    }

    return () => {
      removeSchema("movement-business-schema");
      removeSchema("movement-website-schema");
      removeSchema("movement-breadcrumb-schema");
    };
  }, [pathname]);

  return null;
}