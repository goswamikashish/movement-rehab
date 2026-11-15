import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultBlogs } from "../data/defaultBlogs";

const API_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
  title: "",
  category: "",
  description: "",
  sections: [{ heading: "", paragraphs: [""] }],
};

const AdminBlogUpload = () => {
  const [ownerKey, setOwnerKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loginError, setLoginError] = useState("");

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const ownerHeaders = (key) => ({
    headers: { "x-owner-key": key || localStorage.getItem("owner_key") || "" },
  });

  // Verify the saved key when the page opens
  useEffect(() => {
    const saved = localStorage.getItem("owner_key");
    if (!saved) {
      setChecking(false);
      return;
    }
    axios
      .get(`${API_URL}/api/blogs/admin/verify`, ownerHeaders(saved))
      .then(() => setIsAdmin(true))
      .catch(() => localStorage.removeItem("owner_key"))
      .finally(() => setChecking(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOwnerLogin = async () => {
    const key = ownerKey.trim();
    if (!key) {
      setLoginError("Please enter owner secret key");
      return;
    }

    try {
      setLoginError("");
      await axios.get(`${API_URL}/api/blogs/admin/verify`, ownerHeaders(key));
      localStorage.setItem("owner_key", key);
      setIsAdmin(true);
      setOwnerKey("");
    } catch (err) {
      setLoginError(
        err.response?.status === 401
          ? "Wrong owner key. Please try again."
          : "Server error. Please try again.",
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("owner_key");
    setOwnerKey("");
    setIsAdmin(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSectionHeading = (sectionIndex, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].heading = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleParagraph = (sectionIndex, paragraphIndex, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].paragraphs[paragraphIndex] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { heading: "", paragraphs: [""] }],
    });
  };

  const removeSection = (sectionIndex) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, index) => index !== sectionIndex),
    });
  };

  const addParagraph = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].paragraphs.push("");
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeParagraph = (sectionIndex, paragraphIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].paragraphs = updatedSections[
      sectionIndex
    ].paragraphs.filter((_, index) => index !== paragraphIndex);
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSessionExpired = () => {
    handleLogout();
    alert("Session expired. Please login again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/blogs`, formData, ownerHeaders());
      alert("Blog uploaded successfully");
      setFormData(emptyForm);
    } catch (error) {
      if (error.response?.status === 401) return handleSessionExpired();
      alert(error.response?.data?.message || "Blog upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async () => {
    if (bulkLoading) return;

    try {
      setBulkLoading(true);

      // skip blogs that already exist in the database
      const existing = await axios.get(`${API_URL}/api/blogs`);
      const titles = new Set((existing.data.blogs || []).map((b) => b.title));

      const cleanedBlogs = defaultBlogs
        .filter((b) => !titles.has(b.title))
        .map(({ id, ...blog }) => blog);

      if (cleanedBlogs.length === 0) {
        alert("All default blogs already exist.");
        return;
      }

      await axios.post(
        `${API_URL}/api/blogs/bulk-upload`,
        { blogs: cleanedBlogs },
        ownerHeaders(),
      );

      alert(`${cleanedBlogs.length} blogs uploaded successfully`);
    } catch (error) {
      if (error.response?.status === 401) return handleSessionExpired();
      alert(error.response?.data?.message || "Bulk upload failed");
    } finally {
      setBulkLoading(false);
    }
  };

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Checking access...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 pt-32">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-2xl font-semibold text-[#003A80]">
            Owner Access
          </h1>

          <input
            type="password"
            placeholder="Enter owner secret key"
            value={ownerKey}
            onChange={(e) => {
              setOwnerKey(e.target.value);
              setLoginError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleOwnerLogin()}
            className="mb-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
          />

          {loginError && (
            <p className="mb-3 text-sm text-red-500">{loginError}</p>
          )}

          <button
            onClick={handleOwnerLogin}
            className="mt-2 w-full rounded-xl bg-[#003A80] px-6 py-3 font-medium text-white"
          >
            Continue
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-28">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-lg sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-[#00C4CD]">Admin Panel</p>
            <h1 className="text-3xl font-semibold text-[#003A80]">
              Upload Blog
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Use once to add the 8 default blogs, then comment this button out */}
            <button
              type="button"
              onClick={handleBulkUpload}
              disabled={bulkLoading}
              className="rounded-xl bg-[#00C4CD] px-5 py-3 text-sm font-medium text-white hover:bg-[#00aab2] disabled:opacity-60"
            >
              {bulkLoading ? "Uploading..." : "Upload All Default Blogs"}
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border px-5 py-2 text-sm text-[#003A80]"
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog title"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
            required
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Blog category"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short blog description"
            rows="4"
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
            required
          />

          {formData.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="rounded-2xl border bg-gray-50 p-5"
            >
              <div className="mb-4 flex justify-between">
                <h2 className="font-semibold text-[#003A80]">
                  Section {sectionIndex + 1}
                </h2>

                {formData.sections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSection(sectionIndex)}
                    className="text-sm text-red-500"
                  >
                    Remove Section
                  </button>
                )}
              </div>

              <input
                value={section.heading}
                onChange={(e) =>
                  handleSectionHeading(sectionIndex, e.target.value)
                }
                placeholder="Section heading"
                className="mb-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
                required
              />

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex} className="mb-3">
                  <textarea
                    value={paragraph}
                    onChange={(e) =>
                      handleParagraph(
                        sectionIndex,
                        paragraphIndex,
                        e.target.value,
                      )
                    }
                    placeholder={`Paragraph ${paragraphIndex + 1}`}
                    rows="4"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#003A80]"
                    required
                  />

                  {section.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeParagraph(sectionIndex, paragraphIndex)
                      }
                      className="mt-1 text-sm text-red-500"
                    >
                      Remove Paragraph
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addParagraph(sectionIndex)}
                className="rounded-xl border border-[#003A80] px-4 py-2 text-sm text-[#003A80]"
              >
                + Add Paragraph
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="rounded-xl border border-[#00C4CD] px-5 py-3 font-medium text-[#003A80]"
          >
            + Add Section
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#003A80] px-6 py-4 font-medium text-white disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Blog"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminBlogUpload;