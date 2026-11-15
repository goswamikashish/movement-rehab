


// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// /* ------------------------------------------------------------------
//    BUSINESS / GEO CONSTANTS  (edit these - everything below uses them)
// ------------------------------------------------------------------ */
// const SITE_URL = "https://movementrehab.in";
// const SITE_NAME = "Movement Rehab";
// const CITY = "Indore";
// const REGION = "Madhya Pradesh";
// const AREA = "Khandwa Road";
// // Only list areas you really serve. Used in copy + schema areaServed.
// const AREAS = ["Khandwa Road", "Bhawarkuan", "Rajendra Nagar", "Annapurna Road"];
// const ORG_ID = `${SITE_URL}/#medicalclinic`;

// // TODO: add real streetAddress, postalCode, telephone, geo{latitude,longitude}, sameAs
// // (Google Business Profile URL, Instagram...) - these boost local ranking a lot.
// const clinicNode = {
//   "@type": ["MedicalClinic", "LocalBusiness"],
//   "@id": ORG_ID,
//   name: SITE_NAME,
//   url: SITE_URL,
//   medicalSpecialty: "Physiotherapy",
//   address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: REGION, addressCountry: "IN" },
//   areaServed: [{ "@type": "City", name: CITY }, ...AREAS.map((a) => ({ "@type": "Place", name: `${a}, ${CITY}` }))],
// };

// /* ------------------------------------------------------------------
//    HELPERS
// ------------------------------------------------------------------ */
// const slugify = (t = "") =>
//   t.toString().toLowerCase().trim().replace(/&/g, "-and-").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
// const normalizeText = (t = "") => t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
// const getBlogSlug = (b) => (b ? b.slug || slugify(b.title) : "");
// const getBlogUrl = (b) => `${SITE_URL}/blog/${getBlogSlug(b)}`;
// const wordsOf = (b) =>
//   [b?.title, b?.description, ...(b?.sections || []).flatMap((s) => [s?.heading, ...(s?.paragraphs || [])])]
//     .filter(Boolean).join(" ").split(/\s+/).filter(Boolean).length;
// const getReadingTime = (b) => Math.max(2, Math.ceil(wordsOf(b) / 200));
// const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "");

// const setMeta = (attr, key, content) => {
//   if (!content) return;
//   let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
//   if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attr, key); document.head.appendChild(tag); }
//   tag.setAttribute("content", content);
// };
// const setCanonical = (url) => {
//   let l = document.head.querySelector('link[rel="canonical"]');
//   if (!l) { l = document.createElement("link"); l.setAttribute("rel", "canonical"); document.head.appendChild(l); }
//   l.setAttribute("href", url);
// };
// const setJsonLd = (data) => {
//   let s = document.head.querySelector('script[data-movement-blog-schema="true"]');
//   if (!data) return s && s.remove();
//   if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-movement-blog-schema", "true"); document.head.appendChild(s); }
//   s.textContent = JSON.stringify(data);
// };
// const applySeo = ({ title, desc, url, type = "website", noindex = false, schema }) => {
//   document.title = title;
//   setMeta("name", "description", desc.slice(0, 160));
//   setMeta("name", "robots", noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
//   setMeta("name", "geo.region", "IN-MP");
//   setMeta("name", "geo.placename", CITY);
//   setMeta("property", "og:site_name", SITE_NAME);
//   setMeta("property", "og:locale", "en_IN");
//   setMeta("property", "og:title", title);
//   setMeta("property", "og:description", desc);
//   setMeta("property", "og:type", type);
//   setMeta("property", "og:url", url);
//   setMeta("name", "twitter:card", "summary");
//   setMeta("name", "twitter:title", title);
//   setMeta("name", "twitter:description", desc);
//   setCanonical(url);
//   setJsonLd(schema);
// };

// /* GEO (answer-engine) content: questions people ask AI + Google about local physio */
// const faqsFor = (blog) => {
//   const topic = (blog?.category || "pain and mobility problems").toLowerCase();
//   return [
//     {
//       q: `When should I see a physiotherapist in ${CITY} for ${topic}?`,
//       a: `See a physiotherapist if pain or stiffness lasts more than a few days, keeps returning, limits daily activities such as walking, sitting or lifting, or follows an injury or surgery. Early assessment usually makes recovery faster and helps prevent the problem from becoming long-term.`,
//     },
//     {
//       q: `Does ${SITE_NAME} treat ${topic} near ${AREA}, ${CITY}?`,
//       a: `Yes. ${SITE_NAME} is a physiotherapy and rehabilitation clinic in ${CITY} that supports patients from ${AREA} and nearby areas, including ${AREAS.slice(1).join(", ")}. Each plan starts with a proper assessment of your condition.`,
//     },
//     {
//       q: `How many physiotherapy sessions will I need?`,
//       a: `It depends on your diagnosis, how long you have had symptoms, your age and your goals. Some people improve within a few sessions, while post-surgery or long-standing problems need a longer programme. Your physiotherapist will explain a realistic timeline after the first assessment.`,
//     },
//     {
//       q: `How do I book a physiotherapy appointment at ${SITE_NAME}?`,
//       a: `Use the Book Consultation button on this page to request an appointment at our ${CITY} clinic.`,
//     },
//   ];
// };

// /* ------------------------------------------------------------------
//    SMALL UI PIECES
// ------------------------------------------------------------------ */
// const Faq = ({ items }) => (
//   <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
//     {items.map((f) => (
//       <details key={f.q} className="group p-5">
//         <summary className="cursor-pointer list-none text-base font-semibold text-[#003A80]">{f.q}</summary>
//         <p className="mt-3 text-[15px] leading-7 text-gray-600">{f.a}</p>
//       </details>
//     ))}
//   </div>
// );

// const CtaBar = ({ title, text, onClick }) => (
//   <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#003A80] px-6 py-7 sm:flex-row sm:items-center sm:px-8">
//     <div>
//       <h2 className="text-xl font-bold text-white">{title}</h2>
//       <p className="mt-1 text-sm text-white/75">{text}</p>
//     </div>
//     <button onClick={onClick} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#003A80] transition hover:bg-gray-100">
//       Book Consultation
//     </button>
//   </div>
// );

// const BlogCard = ({ blog, isAdmin = false, onEdit, onDelete }) => (
//   <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#dce8ef] hover:shadow-xl">
//     <div className="h-1 w-full bg-gradient-to-r from-[#003A80] to-[#00C4CD]" />
//     <div className="flex flex-1 flex-col p-6">
//       <div className="mb-4 flex items-center justify-between gap-3">
//         <span className="rounded-full bg-[#eefafa] px-3 py-1 text-[11px] font-bold text-[#008f99]">{blog?.category || "Physiotherapy"}</span>
//         <span className="text-xs text-gray-500">{getReadingTime(blog)} min read</span>
//       </div>
//       <h3 className="line-clamp-3 text-xl font-bold leading-snug text-[#003A80]">
//         <Link to={`/blog/${getBlogSlug(blog)}`} title={`${blog?.title} - physiotherapy in ${CITY}`} onClick={() => window.scrollTo({ top: 0 })}>
//           {blog?.title}
//         </Link>
//       </h3>
//       <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{blog?.description}</p>
//       <div className="mt-auto pt-6">
//         <Link to={`/blog/${getBlogSlug(blog)}`} className="text-sm font-bold text-[#003A80] hover:text-[#00A8B2]" aria-label={`Read article: ${blog?.title}`}>
//           Read article →
//         </Link>
//         {isAdmin && (
//           <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
//             <button onClick={() => onEdit(blog)} className="rounded-lg border border-[#003A80] px-3 py-2 text-xs font-semibold text-[#003A80] hover:bg-[#003A80] hover:text-white">Edit</button>
//             <button onClick={() => onDelete(blog._id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-500 hover:text-white">Delete</button>
//           </div>
//         )}
//       </div>
//     </div>
//   </article>
// );

// /* ------------------------------------------------------------------
//    ADMIN EDIT FORM
// ------------------------------------------------------------------ */
// const inputCls = "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#003A80]";

// const EditForm = ({ blog, setBlog, onSubmit, onCancel }) => {
//   const upd = (patch) => setBlog({ ...blog, ...patch });
//   const updSection = (i, fn) => upd({ sections: blog.sections.map((s, idx) => (idx === i ? fn(s) : s)) });
//   return (
//     <main className="min-h-screen bg-[#f7fafc] px-4 py-28">
//       <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
//         <div className="mb-8 flex items-center justify-between gap-4">
//           <h1 className="text-2xl font-bold text-[#003A80] sm:text-3xl">Update blog</h1>
//           <button onClick={onCancel} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-[#003A80] hover:bg-gray-50">Cancel</button>
//         </div>
//         <form onSubmit={onSubmit} className="space-y-6">
//           {[["title", "Blog title", "input"], ["category", "Category", "input"], ["description", "Description (50-160 characters ranks best, include city keyword)", "textarea"]].map(([key, label, kind]) => (
//             <div key={key}>
//               <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
//               {kind === "input" ? (
//                 <input value={blog[key] || ""} onChange={(e) => upd({ [key]: e.target.value })} className={inputCls} required />
//               ) : (
//                 <textarea rows="4" value={blog[key] || ""} onChange={(e) => upd({ [key]: e.target.value })} className={inputCls} required />
//               )}
//             </div>
//           ))}

//           {blog.sections.map((section, si) => (
//             <div key={si} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="font-semibold text-[#003A80]">Section {si + 1}</h2>
//                 {blog.sections.length > 1 && (
//                   <button type="button" className="text-sm font-medium text-red-500" onClick={() => upd({ sections: blog.sections.filter((_, i) => i !== si) })}>Remove section</button>
//                 )}
//               </div>
//               <input value={section.heading} onChange={(e) => updSection(si, (s) => ({ ...s, heading: e.target.value }))} placeholder="Section heading (becomes an H2)" className={`${inputCls} mb-4`} required />
//               {section.paragraphs?.map((p, pi) => (
//                 <div key={pi} className="mb-4">
//                   <textarea rows="5" value={p} placeholder={`Paragraph ${pi + 1}`} className={inputCls} required
//                     onChange={(e) => updSection(si, (s) => ({ ...s, paragraphs: s.paragraphs.map((x, i) => (i === pi ? e.target.value : x)) }))} />
//                   {section.paragraphs.length > 1 && (
//                     <button type="button" className="mt-1 text-sm text-red-500" onClick={() => updSection(si, (s) => ({ ...s, paragraphs: s.paragraphs.filter((_, i) => i !== pi) }))}>Remove paragraph</button>
//                   )}
//                 </div>
//               ))}
//               <button type="button" onClick={() => updSection(si, (s) => ({ ...s, paragraphs: [...s.paragraphs, ""] }))} className="rounded-xl border border-[#003A80] px-4 py-2 text-sm font-medium text-[#003A80]">+ Add paragraph</button>
//             </div>
//           ))}

//           <button type="button" onClick={() => upd({ sections: [...blog.sections, { heading: "", paragraphs: [""] }] })} className="rounded-xl border border-[#00C4CD] px-5 py-3 font-medium text-[#003A80]">+ Add section</button>
//           <button type="submit" className="w-full rounded-xl bg-[#003A80] px-6 py-4 font-semibold text-white hover:bg-[#002d63]">Update blog</button>
//         </form>
//       </div>
//     </main>
//   );
// };

// /* ------------------------------------------------------------------
//    PAGE
// ------------------------------------------------------------------ */
// const TOPICS = [
//   ["Back, neck and spine pain", `Desk work, long commutes and poor posture make back and neck pain one of the most common reasons people in ${CITY} look for physiotherapy. Our articles explain likely causes, safe movement habits and when pain needs a proper assessment.`],
//   ["Knee, shoulder and joint problems", `Joint pain can limit walking, climbing stairs or lifting your arm. These guides cover common joint conditions, exercise-based recovery and how physiotherapy supports mobility without relying only on painkillers.`],
//   ["Sports injury and post-surgery rehabilitation", `Whether you play cricket on weekends or are recovering from a fracture or joint surgery, structured rehabilitation restores strength and confidence. Read how a graded recovery plan works and what to expect at each stage.`],
//   ["Neurological and balance conditions", `Stroke recovery, balance problems and nerve-related weakness need specialised, patient-paced care. We share clear information for patients and families who want to understand the rehabilitation process.`],
// ];

// const BlogPage = () => {
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [editBlog, setEditBlog] = useState(null);
//   const isAdmin = !!localStorage.getItem("owner_key");
//   const ownerHeaders = () => ({ headers: { "x-owner-key": localStorage.getItem("owner_key") } });

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/blogs`);
//         setBlogs(res.data.blogs || []);
//       } catch (e) {
//         console.error("Blog fetch error:", e);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [API_URL]);

//   const selectedBlog = useMemo(() => (slug && blogs.length ? blogs.find((b) => getBlogSlug(b) === slug) || null : null), [slug, blogs]);

//   const categories = useMemo(() => ["All", ...new Set(blogs.map((b) => b?.category).filter(Boolean))], [blogs]);

//   const filteredBlogs = useMemo(() => {
//     const q = normalizeText(search);
//     return blogs
//       .map((b) => {
//         const all = normalizeText([b.title, b.category, b.description, ...(b.sections || []).flatMap((s) => [s?.heading, ...(s?.paragraphs || [])])].filter(Boolean).join(" "));
//         const t = normalizeText(b.title), c = normalizeText(b.category), d = normalizeText(b.description);
//         let score = 0;
//         if (q) {
//           q.split(" ").forEach((w) => {
//             if (t.includes(w)) score += 8;
//             if (c.includes(w)) score += 5;
//             if (d.includes(w)) score += 3;
//             if (all.includes(w)) score += 1;
//           });
//           if (t.includes(q)) score += 15;
//           if (c.includes(q)) score += 8;
//         }
//         return { ...b, searchScore: score };
//       })
//       .filter((b) => (activeCategory === "All" || b.category === activeCategory) && (!q || b.searchScore > 0))
//       .sort((a, b) => (q ? b.searchScore - a.searchScore : 0));
//   }, [blogs, search, activeCategory]);

//   /* ---------- admin actions ---------- */
//   const handleDeleteBlog = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`${API_URL}/api/blogs/${id}`, ownerHeaders());
//       setBlogs((p) => p.filter((b) => b._id !== id));
//       alert("Blog deleted successfully");
//       if (selectedBlog?._id === id) navigate("/blog");
//     } catch (e) {
//       alert(e.response?.data?.message || "Blog delete failed");
//     }
//   };
//   const handleEditClick = (b) => {
//     setEditBlog({ ...b, sections: (b.sections || []).map((s) => ({ ...s, paragraphs: [...(s.paragraphs || [])] })) });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
//   const handleUpdateBlog = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`${API_URL}/api/blogs/${editBlog._id}`, editBlog, ownerHeaders());
//       setBlogs((p) => p.map((b) => (b._id === editBlog._id ? res.data.blog : b)));
//       setEditBlog(null);
//       alert("Blog updated successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || "Blog update failed");
//     }
//   };

//   /* ---------- SEO + GEO (meta, canonical, JSON-LD) ---------- */
//   useEffect(() => {
//     if (slug && loading) return;

//     if (slug && selectedBlog) {
//       const b = selectedBlog;
//       const url = getBlogUrl(b);
//       const category = b.category || "Physiotherapy";
//       const desc = b.description || `${b.title} - physiotherapy and rehabilitation advice from ${SITE_NAME}, ${CITY}.`;
//       const faqs = faqsFor(b);
//       applySeo({
//         title: `${b.title} | ${SITE_NAME}, ${CITY}`,
//         desc,
//         url,
//         type: "article",
//         schema: {
//           "@context": "https://schema.org",
//           "@graph": [
//             clinicNode,
//             {
//               "@type": "BlogPosting",
//               "@id": `${url}#article`,
//               headline: b.title,
//               description: desc,
//               url,
//               mainEntityOfPage: { "@type": "WebPage", "@id": url },
//               datePublished: b.createdAt,
//               dateModified: b.updatedAt || b.createdAt,
//               wordCount: wordsOf(b),
//               timeRequired: `PT${getReadingTime(b)}M`,
//               articleSection: category,
//               inLanguage: "en-IN",
//               author: { "@id": ORG_ID },
//               publisher: { "@id": ORG_ID },
//               about: [{ "@type": "MedicalSpecialty", name: "Physiotherapy" }, { "@type": "Place", name: `${CITY}, ${REGION}` }],
//               keywords: [`physiotherapy in ${CITY}`, `physiotherapy clinic in ${CITY}`, `physiotherapist in ${CITY}`, `${AREA} physiotherapy`, `${category} physiotherapy ${CITY}`, category].join(", "),
//               isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: `${SITE_NAME} Physiotherapy Blog`, url: `${SITE_URL}/blog` },
//             },
//             {
//               "@type": "BreadcrumbList",
//               "@id": `${url}#breadcrumb`,
//               itemListElement: [
//                 { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
//                 { "@type": "ListItem", position: 2, name: `Physiotherapy Blog ${CITY}`, item: `${SITE_URL}/blog` },
//                 { "@type": "ListItem", position: 3, name: b.title, item: url },
//               ],
//             },
//             {
//               "@type": "FAQPage",
//               "@id": `${url}#faq`,
//               mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
//             },
//           ],
//         },
//       });
//     } else if (slug) {
//       applySeo({ title: `Article not found | ${SITE_NAME}`, desc: "This article could not be found.", url: `${SITE_URL}/blog`, noindex: true });
//     } else {
//       applySeo({
//         title: `Physiotherapy Blog in ${CITY} | ${SITE_NAME}`,
//         desc: `Physiotherapy, rehabilitation and pain-management guides from ${SITE_NAME}, ${CITY}. Practical advice for patients on ${AREA} and nearby areas.`,
//         url: `${SITE_URL}/blog`,
//         schema: {
//           "@context": "https://schema.org",
//           "@graph": [
//             clinicNode,
//             {
//               "@type": ["CollectionPage", "Blog"],
//               "@id": `${SITE_URL}/blog#blog`,
//               name: `Physiotherapy Blog in ${CITY}`,
//               description: `Physiotherapy and rehabilitation articles from ${SITE_NAME} in ${CITY}.`,
//               url: `${SITE_URL}/blog`,
//               inLanguage: "en-IN",
//               publisher: { "@id": ORG_ID },
//               mainEntity: {
//                 "@type": "ItemList",
//                 itemListElement: blogs.slice(0, 20).map((b, i) => ({ "@type": "ListItem", position: i + 1, url: getBlogUrl(b), name: b.title })),
//               },
//             },
//             {
//               "@type": "FAQPage",
//               mainEntity: faqsFor(null).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
//             },
//           ],
//         },
//       });
//     }
//     return () => setJsonLd(null);
//   }, [slug, selectedBlog, loading, blogs]);

//   /* ---------- EDIT SCREEN ---------- */
//   if (editBlog) return <EditForm blog={editBlog} setBlog={setEditBlog} onSubmit={handleUpdateBlog} onCancel={() => setEditBlog(null)} />;

//   /* ---------- ARTICLE PAGE ---------- */
//   if (slug && selectedBlog) {
//     const b = selectedBlog;
//     const category = b.category || "Physiotherapy";
//     const topic = category.toLowerCase();
//     const related = blogs.filter((x) => x._id !== b._id && x.category === b.category).slice(0, 3);
//     const sections = (b.sections || []).map((s, i) => ({ ...s, id: `${slugify(s.heading) || "section"}-${i + 1}` }));
//     const faqs = faqsFor(b);

//     return (
//       <main className="min-h-screen bg-white pt-24 sm:pt-28">
//         <div className="mx-auto max-w-5xl px-4 sm:px-6">
//           <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
//             <ol className="flex flex-wrap items-center gap-2">
//               <li><Link to="/" className="hover:text-[#003A80]">Home</Link></li>
//               <li aria-hidden="true">/</li>
//               <li><Link to="/blog" className="hover:text-[#003A80]">Physiotherapy Blog {CITY}</Link></li>
//               <li aria-hidden="true">/</li>
//               <li className="text-gray-700" aria-current="page">{category}</li>
//             </ol>
//           </nav>
//         </div>

//         <header className="mx-auto max-w-5xl px-4 sm:px-6">
//           <div className="max-w-4xl">
//             <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
//               <span className="rounded-full bg-[#e9fafa] px-3 py-1 text-xs font-bold text-[#007a83]">{category}</span>
//               <span>{getReadingTime(b)} min read</span>
//               {b.updatedAt || b.createdAt ? (
//                 <>
//                   <span aria-hidden="true">•</span>
//                   <span>Updated <time dateTime={new Date(b.updatedAt || b.createdAt).toISOString()}>{fmtDate(b.updatedAt || b.createdAt)}</time></span>
//                 </>
//               ) : null}
//               <span aria-hidden="true">•</span>
//               <span>By {SITE_NAME}, {CITY}</span>
//             </div>
//             <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-[#003A80] sm:text-4xl lg:text-5xl">{b.title}</h1>
//             <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">{b.description}</p>
//           </div>
//         </header>

//         <article className="mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
//           {/* Quick answer + contents: easy for Google snippets and AI engines to quote */}
//           <aside className="mb-12 rounded-2xl border border-[#e5eef5] bg-[#f7fafc] p-6 sm:p-8">
//             <h2 className="text-lg font-bold text-[#003A80]">Quick answer</h2>
//             <p className="mt-2 text-[15px] leading-7 text-gray-700">{b.description}</p>
//             {sections.length > 1 && (
//               <>
//                 <h3 className="mt-6 text-sm font-bold text-[#003A80]">In this article</h3>
//                 <ul className="mt-2 space-y-1.5 text-sm">
//                   {sections.map((s) => (
//                     <li key={s.id}><a href={`#${s.id}`} className="text-gray-600 underline decoration-[#00C4CD] underline-offset-4 hover:text-[#003A80]">{s.heading}</a></li>
//                   ))}
//                   <li><a href="#physiotherapy-in-indore" className="text-gray-600 underline decoration-[#00C4CD] underline-offset-4 hover:text-[#003A80]">Physiotherapy for {topic} in {CITY}</a></li>
//                   <li><a href="#faqs" className="text-gray-600 underline decoration-[#00C4CD] underline-offset-4 hover:text-[#003A80]">Frequently asked questions</a></li>
//                 </ul>
//               </>
//             )}
//           </aside>

//           <div className="space-y-12">
//             {sections.map((s) => (
//               <section key={s.id} id={s.id} className="scroll-mt-28">
//                 <h2 className="mb-5 text-2xl font-bold leading-tight text-[#003A80] sm:text-3xl">{s.heading}</h2>
//                 <div className="space-y-5">
//                   {s.paragraphs?.map((p, i) => (
//                     <p key={i} className="text-[16px] leading-8 text-gray-700 sm:text-[17px]">{p}</p>
//                   ))}
//                   {/* optional: if your API later returns section.subsections = [{heading, paragraphs}] they render as H3 */}
//                   {s.subsections?.map((sub, i) => (
//                     <div key={i}>
//                       <h3 className="mb-3 mt-6 text-xl font-semibold text-[#003A80]">{sub.heading}</h3>
//                       {sub.paragraphs?.map((p, j) => <p key={j} className="mb-4 text-[16px] leading-8 text-gray-700 sm:text-[17px]">{p}</p>)}
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             ))}

//             {/* Local section: generated for every article, with H3 subheadings */}
//             <section id="physiotherapy-in-indore" className="scroll-mt-28">
//               <h2 className="mb-5 text-2xl font-bold leading-tight text-[#003A80] sm:text-3xl">Physiotherapy for {topic} in {CITY}</h2>

//               <h3 className="mb-3 text-xl font-semibold text-[#003A80]">When to book a physiotherapy assessment</h3>
//               <p className="mb-8 text-[16px] leading-8 text-gray-700 sm:text-[17px]">
//                 Reading about {topic} helps you understand your symptoms, but it cannot replace an examination. If your pain is getting worse, spreading, keeping you awake or limiting everyday movement, a physiotherapist in {CITY} can identify what is driving it and build a plan that fits your body, work and lifestyle.
//               </p>

//               <h3 className="mb-3 text-xl font-semibold text-[#003A80]">What to expect at {SITE_NAME}</h3>
//               <p className="mb-8 text-[16px] leading-8 text-gray-700 sm:text-[17px]">
//                 Your first visit at our {CITY} clinic starts with a detailed history and physical assessment. We explain the likely cause, set clear recovery goals with you, and combine hands-on treatment, guided exercise and home advice so progress continues between sessions.
//               </p>

//               <h3 className="mb-3 text-xl font-semibold text-[#003A80]">Serving {AREA} and nearby areas of {CITY}</h3>
//               <p className="text-[16px] leading-8 text-gray-700 sm:text-[17px]">
//                 {SITE_NAME} is easy to reach for patients across {AREA}, {AREAS.slice(1, -1).join(", ")} and {AREAS[AREAS.length - 1]}. If you are searching for a physiotherapy clinic near you in {CITY}, book a consultation and we will guide you on the right next step.
//               </p>
//             </section>

//             <section id="faqs" className="scroll-mt-28">
//               <h2 className="mb-5 text-2xl font-bold leading-tight text-[#003A80] sm:text-3xl">Frequently asked questions</h2>
//               <Faq items={faqs} />
//             </section>
//           </div>

//           <p className="mt-10 text-xs leading-6 text-gray-500">
//             This article is for general information and does not replace medical advice. Please consult a qualified physiotherapist or doctor about your own condition.
//           </p>

//           <div className="mt-10 border-t border-gray-100 pt-8">
//             <CtaBar title={`Need physiotherapy guidance in ${CITY}?`} text={`Speak with ${SITE_NAME} near ${AREA}.`} onClick={() => navigate("/Appointment")} />
//           </div>
//         </article>

//         {related.length > 0 && (
//           <section className="border-t border-gray-100 bg-[#f8fafc] px-4 py-14 sm:px-6">
//             <div className="mx-auto max-w-5xl">
//               <h2 className="mb-8 text-2xl font-bold text-[#003A80]">More {topic} articles from {CITY}</h2>
//               <div className="grid gap-5 md:grid-cols-3">
//                 {related.map((x) => <BlogCard key={x._id} blog={x} />)}
//               </div>
//             </div>
//           </section>
//         )}

//         <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
//           <Link to="/blog" className="text-sm font-semibold text-[#003A80] hover:text-[#00A8B2]">← Back to all articles</Link>
//         </div>
//       </main>
//     );
//   }

//   /* ---------- NOT FOUND ---------- */
//   if (slug && !selectedBlog && !loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-white px-4 pt-24">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-[#003A80]">Article not found</h1>
//           <p className="mt-3 text-gray-600">The article you are looking for may have been moved or removed.</p>
//           <Link to="/blog" className="mt-6 inline-block rounded-xl bg-[#003A80] px-6 py-3 text-sm font-semibold text-white">View all physiotherapy articles</Link>
//         </div>
//       </main>
//     );
//   }

//   /* ---------- BLOG LANDING PAGE ---------- */
//   return (
//     <main className="min-h-screen bg-white">
//       <header className="border-b border-gray-100 px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-10">
//         <div className="mx-auto max-w-7xl max-w-3xl lg:max-w-7xl">
//           <div className="max-w-3xl">
//             <h1 className="text-3xl font-bold tracking-tight text-[#003A80] sm:text-4xl lg:text-5xl">Physiotherapy Blog in {CITY}</h1>
//             <h2 className="mt-3 text-lg font-semibold text-[#007a83] sm:text-xl">Pain relief, rehabilitation and recovery advice from {SITE_NAME}</h2>
//             <p className="mt-4 text-base leading-7 text-gray-600">
//               Welcome to the {SITE_NAME} blog. Our physiotherapists in {CITY} write clear, practical guides on back pain, joint problems, sports injuries, post-surgery rehabilitation and everyday mobility, so patients on {AREA} and across the city can understand their condition and know when to seek help.
//             </p>
//           </div>
//         </div>
//       </header>

//       <section aria-label="Search and filter articles" className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
//         <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
//           <div className="relative flex-1">
//             <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
//               <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
//             </svg>
//             <input type="search" aria-label="Search physiotherapy articles" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search back pain, knee pain, rehab..." className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-16 text-sm outline-none transition focus:border-[#003A80] focus:bg-white" />
//             {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-100">Clear</button>}
//           </div>
//           <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[55%]">
//             {categories.map((c) => (
//               <button key={c} onClick={() => setActiveCategory(c)} aria-pressed={activeCategory === c}
//                 className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition ${activeCategory === c ? "border-[#003A80] bg-[#003A80] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-[#003A80] hover:text-[#003A80]"}`}>
//                 {c}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section aria-labelledby="latest" className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-8 flex items-end justify-between gap-4">
//             <div>
//               <h2 id="latest" className="text-2xl font-bold text-[#003A80] sm:text-3xl">Latest physiotherapy and rehabilitation articles</h2>
//               <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">Written by the {SITE_NAME} team in {CITY}. Browse by condition or search for your symptoms.</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="hidden text-sm text-gray-500 sm:block">{filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}</span>
//               {isAdmin && <button onClick={() => navigate("/admin/blog-upload")} className="rounded-xl bg-[#003A80] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#002d63]">+ Add blog</button>}
//             </div>
//           </div>

//           {loading && (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-72 animate-pulse rounded-2xl border border-gray-100 bg-gray-50" />)}
//             </div>
//           )}

//           {!loading && filteredBlogs.length === 0 && (
//             <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center">
//               <h3 className="text-xl font-bold text-[#003A80]">No articles found</h3>
//               <p className="mt-2 text-sm text-gray-500">Try another search term or category.</p>
//               <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-5 rounded-xl bg-[#003A80] px-5 py-2.5 text-sm font-semibold text-white">Reset filters</button>
//             </div>
//           )}

//           {!loading && filteredBlogs.length > 0 && (
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredBlogs.map((b) => <BlogCard key={b._id} blog={b} isAdmin={isAdmin} onEdit={handleEditClick} onDelete={handleDeleteBlog} />)}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Topic hubs: subheading + paragraph blocks for topical authority */}
//       <section aria-labelledby="topics" className="border-t border-gray-100 bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-10">
//         <div className="mx-auto max-w-7xl">
//           <h2 id="topics" className="text-2xl font-bold text-[#003A80] sm:text-3xl">Physiotherapy topics we cover in {CITY}</h2>
//           <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
//             Every {SITE_NAME} article is grouped around the conditions patients in {CITY} ask us about most. Start with the topic closest to your problem.
//           </p>
//           <div className="mt-8 grid gap-6 md:grid-cols-2">
//             {TOPICS.map(([h, p]) => (
//               <div key={h} className="rounded-2xl border border-gray-100 bg-white p-6">
//                 <h3 className="text-lg font-bold text-[#003A80]">{h}</h3>
//                 <p className="mt-2 text-sm leading-7 text-gray-600">{p}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section aria-labelledby="local" className="px-4 py-14 sm:px-6 lg:px-10">
//         <div className="mx-auto max-w-7xl max-w-3xl lg:max-w-7xl">
//           <div className="max-w-3xl">
//             <h2 id="local" className="text-2xl font-bold text-[#003A80] sm:text-3xl">Physiotherapy resources for patients in {CITY}</h2>

//             <h3 className="mt-6 text-lg font-semibold text-[#003A80]">Why local physiotherapy advice matters</h3>
//             <p className="mt-2 text-[15px] leading-7 text-gray-600">
//               Lifestyle, work routines and daily travel shape the injuries we see. Our guides are written with patients in {CITY} in mind, from long hours at a desk to busy commutes along {AREA}.
//             </p>

//             <h3 className="mt-6 text-lg font-semibold text-[#003A80]">Areas we serve</h3>
//             <p className="mt-2 text-[15px] leading-7 text-gray-600">
//               {SITE_NAME} supports patients from {AREAS.join(", ")} and other parts of {CITY}, {REGION}. If you are not sure whether physiotherapy is right for you, book a consultation and our team will advise you honestly.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section aria-labelledby="faq" className="border-t border-gray-100 bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-10">
//         <div className="mx-auto max-w-4xl">
//           <h2 id="faq" className="mb-6 text-2xl font-bold text-[#003A80] sm:text-3xl">Physiotherapy in {CITY}: common questions</h2>
//           <Faq items={faqsFor(null)} />
//         </div>
//       </section>

//       <section className="px-4 py-12 sm:px-6">
//         <div className="mx-auto max-w-7xl">
//           <CtaBar title={`Need physiotherapy in ${CITY}?`} text={`Book a consultation with ${SITE_NAME} near ${AREA}.`} onClick={() => navigate("/Appointment")} />
//         </div>
//       </section>
//     </main>
//   );
// };

// export default BlogPage;


import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

/* ---------- CONSTANTS ---------- */
const SITE_URL = "https://movementrehab.in";
const SITE_NAME = "Movement Rehab";
const CITY = "Indore";
const REGION = "Madhya Pradesh";
const AREA = "Khandwa Road";
const AREAS = ["Khandwa Road", "Bhawarkuan", "Rajendra Nagar", "Annapurna Road"];
const ORG_ID = `${SITE_URL}/#medicalclinic`;

const clinicNode = {
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  medicalSpecialty: "Physiotherapy",
  address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: REGION, addressCountry: "IN" },
  areaServed: [{ "@type": "City", name: CITY }, ...AREAS.map((a) => ({ "@type": "Place", name: `${a}, ${CITY}` }))],
};

/* ---------- HELPERS ---------- */
const slugify = (t = "") =>
  t.toString().toLowerCase().trim().replace(/&/g, "-and-").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
const normalizeText = (t = "") => t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const getBlogSlug = (b) => (b ? b.slug || slugify(b.title) : "");
const getBlogUrl = (b) => `${SITE_URL}/blog/${getBlogSlug(b)}`;
const wordsOf = (b) =>
  [b?.title, b?.description, ...(b?.sections || []).flatMap((s) => [s?.heading, ...(s?.paragraphs || [])])]
    .filter(Boolean).join(" ").split(/\s+/).filter(Boolean).length;
const getReadingTime = (b) => Math.max(2, Math.ceil(wordsOf(b) / 200));
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "");

const setMeta = (attr, key, content) => {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) { tag = document.createElement("meta"); tag.setAttribute(attr, key); document.head.appendChild(tag); }
  tag.setAttribute("content", content);
};
const setCanonical = (url) => {
  let l = document.head.querySelector('link[rel="canonical"]');
  if (!l) { l = document.createElement("link"); l.setAttribute("rel", "canonical"); document.head.appendChild(l); }
  l.setAttribute("href", url);
};
const setJsonLd = (data) => {
  let s = document.head.querySelector('script[data-movement-blog-schema="true"]');
  if (!data) return s && s.remove();
  if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-movement-blog-schema", "true"); document.head.appendChild(s); }
  s.textContent = JSON.stringify(data);
};
const applySeo = ({ title, desc, url, type = "website", noindex = false, schema }) => {
  document.title = title;
  setMeta("name", "description", desc.slice(0, 160));
  setMeta("name", "robots", noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
  setMeta("name", "geo.region", "IN-MP");
  setMeta("name", "geo.placename", CITY);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:locale", "en_IN");
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", desc);
  setMeta("property", "og:type", type);
  setMeta("property", "og:url", url);
  setMeta("name", "twitter:card", "summary");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", desc);
  setCanonical(url);
  setJsonLd(schema);
};

const faqsFor = (blog) => {
  const topic = (blog?.category || "pain and mobility problems").toLowerCase();
  return [
    {
      q: `When should I see a physiotherapist in ${CITY} for ${topic}?`,
      a: `See a physiotherapist if pain or stiffness lasts more than a few days, keeps returning, limits daily activities such as walking, sitting or lifting, or follows an injury or surgery. Early assessment usually makes recovery faster and helps prevent the problem from becoming long-term.`,
    },
    {
      q: `Does ${SITE_NAME} treat ${topic} near ${AREA}, ${CITY}?`,
      a: `Yes. ${SITE_NAME} is a physiotherapy and rehabilitation clinic in ${CITY} that supports patients from ${AREA} and nearby areas, including ${AREAS.slice(1).join(", ")}. Each plan starts with a proper assessment of your condition.`,
    },
    {
      q: `How many physiotherapy sessions will I need?`,
      a: `It depends on your diagnosis, how long you have had symptoms, your age and your goals. Some people improve within a few sessions, while post-surgery or long-standing problems need a longer programme. Your physiotherapist will explain a realistic timeline after the first assessment.`,
    },
    {
      q: `How do I book a physiotherapy appointment at ${SITE_NAME}?`,
      a: `Use the Book Consultation button on this page to request an appointment at our ${CITY} clinic.`,
    },
  ];
};

/* ---------- BLOG CARD ---------- */
const BlogCard = ({ blog, isAdmin = false, onEdit, onDelete }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white shadow-[0_5px_24px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_18px_48px_rgba(0,58,128,0.12)]">
    <Link to={`/blog/${getBlogSlug(blog)}`} onClick={() => window.scrollTo({ top: 0 })} className="relative block aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-50 via-slate-100 to-cyan-50" aria-label={`Read ${blog?.title}`}>
      {blog?.image || blog?.coverImage || blog?.featuredImage ? (
        <img src={blog.image || blog.coverImage || blog.featuredImage} alt={blog?.imageAlt || blog?.title || "Movement Rehab article"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/80 bg-white/80 text-[#003A80] shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" strokeLinecap="round" /></svg>
          </div>
        </div>
      )}
      <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#007a83] backdrop-blur">{blog?.category || "Physiotherapy"}</span>
    </Link>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>{getReadingTime(blog)} min read</span>
        {(blog?.updatedAt || blog?.createdAt) && <><span aria-hidden="true">·</span><time dateTime={blog.updatedAt || blog.createdAt}>{fmtDate(blog.updatedAt || blog.createdAt)}</time></>}
      </div>
      <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-900 transition group-hover:text-[#003A80]">
        <Link to={`/blog/${getBlogSlug(blog)}`} onClick={() => window.scrollTo({ top: 0 })}>{blog?.title}</Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{blog?.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <Link to={`/blog/${getBlogSlug(blog)}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#003A80] transition hover:gap-3 hover:text-[#008b96]" aria-label={`Read article: ${blog?.title}`}>
          Read article <span aria-hidden="true">→</span>
        </Link>
        {isAdmin && (
          <div className="flex gap-2">
            <button onClick={() => onEdit(blog)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-[#003A80]">Edit</button>
            <button onClick={() => onDelete(blog._id)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button>
          </div>
        )}
      </div>
    </div>
  </article>
);

/* ---------- ADMIN EDIT FORM ---------- */
const inputCls = "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#003A80]";

const EditForm = ({ blog, setBlog, onSubmit, onCancel }) => {
  const upd = (patch) => setBlog({ ...blog, ...patch });
  const updSection = (i, fn) => upd({ sections: blog.sections.map((s, idx) => (idx === i ? fn(s) : s)) });
  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-28">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#003A80] sm:text-3xl">Update blog</h1>
          <button onClick={onCancel} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-[#003A80] hover:bg-gray-50">Cancel</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          {[["title", "Blog title", "input"], ["category", "Category", "input"], ["description", "Description (50-160 characters ranks best)", "textarea"]].map(([key, label, kind]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
              {kind === "input" ? (
                <input value={blog[key] || ""} onChange={(e) => upd({ [key]: e.target.value })} className={inputCls} required />
              ) : (
                <textarea rows="4" value={blog[key] || ""} onChange={(e) => upd({ [key]: e.target.value })} className={inputCls} required />
              )}
            </div>
          ))}

          {blog.sections.map((section, si) => (
            <div key={si} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-[#003A80]">Section {si + 1}</h2>
                {blog.sections.length > 1 && (
                  <button type="button" className="text-sm font-medium text-red-500" onClick={() => upd({ sections: blog.sections.filter((_, i) => i !== si) })}>Remove section</button>
                )}
              </div>
              <input value={section.heading} onChange={(e) => updSection(si, (s) => ({ ...s, heading: e.target.value }))} placeholder="Section heading" className={`${inputCls} mb-4`} required />
              {section.paragraphs?.map((p, pi) => (
                <div key={pi} className="mb-4">
                  <textarea rows="5" value={p} placeholder={`Paragraph ${pi + 1}`} className={inputCls} required
                    onChange={(e) => updSection(si, (s) => ({ ...s, paragraphs: s.paragraphs.map((x, i) => (i === pi ? e.target.value : x)) }))} />
                  {section.paragraphs.length > 1 && (
                    <button type="button" className="mt-1 text-sm text-red-500" onClick={() => updSection(si, (s) => ({ ...s, paragraphs: s.paragraphs.filter((_, i) => i !== pi) }))}>Remove paragraph</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => updSection(si, (s) => ({ ...s, paragraphs: [...s.paragraphs, ""] }))} className="rounded-xl border border-[#003A80] px-4 py-2 text-sm font-medium text-[#003A80]">+ Add paragraph</button>
            </div>
          ))}

          <button type="button" onClick={() => upd({ sections: [...blog.sections, { heading: "", paragraphs: [""] }] })} className="rounded-xl border border-[#00C4CD] px-5 py-3 font-medium text-[#003A80]">+ Add section</button>
          <button type="submit" className="w-full rounded-xl bg-[#003A80] px-6 py-4 font-semibold text-white hover:bg-[#002d63]">Update blog</button>
        </form>
      </div>
    </main>
  );
};

/* ---------- PAGE ---------- */
const BlogPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [editBlog, setEditBlog] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [ownerKeyInput, setOwnerKeyInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const ownerHeaders = () => ({
    headers: { "x-owner-key": localStorage.getItem("owner_key") || "" },
  });

  const forceLogout = () => {
    localStorage.removeItem("owner_key");
    setIsAdmin(false);
    setEditBlog(null);
  };

  // Fetch blogs
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(res.data.blogs || []);
      } catch (e) {
        console.error("Blog fetch error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [API_URL]);

  // Verify the saved key on page load (admin buttons only if the key is valid)
  useEffect(() => {
    const saved = localStorage.getItem("owner_key");
    if (!saved) return;
    axios
      .get(`${API_URL}/api/blogs/admin/verify`, ownerHeaders())
      .then(() => setIsAdmin(true))
      .catch(() => forceLogout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  const selectedBlog = useMemo(
    () => (slug && blogs.length ? blogs.find((b) => getBlogSlug(b) === slug) || null : null),
    [slug, blogs],
  );

  const categories = useMemo(() => ["All", ...new Set(blogs.map((b) => b?.category).filter(Boolean))], [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = normalizeText(search);
    return blogs
      .map((b) => {
        const all = normalizeText([b.title, b.category, b.description, ...(b.sections || []).flatMap((s) => [s?.heading, ...(s?.paragraphs || [])])].filter(Boolean).join(" "));
        const t = normalizeText(b.title), c = normalizeText(b.category), d = normalizeText(b.description);
        let score = 0;
        if (q) {
          q.split(" ").forEach((w) => {
            if (t.includes(w)) score += 8;
            if (c.includes(w)) score += 5;
            if (d.includes(w)) score += 3;
            if (all.includes(w)) score += 1;
          });
          if (t.includes(q)) score += 15;
          if (c.includes(q)) score += 8;
        }
        return { ...b, searchScore: score };
      })
      .filter((b) => (activeCategory === "All" || b.category === activeCategory) && (!q || b.searchScore > 0))
      .sort((a, b) => (q ? b.searchScore - a.searchScore : 0));
  }, [blogs, search, activeCategory]);

  /* ---------- admin login ---------- */
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const key = ownerKeyInput.trim();
    if (!key) return;

    try {
      setLoggingIn(true);
      setLoginError("");
      await axios.get(`${API_URL}/api/blogs/admin/verify`, {
        headers: { "x-owner-key": key },
      });
      localStorage.setItem("owner_key", key);
      setIsAdmin(true);
      setShowLoginModal(false);
      setOwnerKeyInput("");
    } catch (err) {
      setLoginError(
        err.response?.status === 401
          ? "Wrong owner key. Please try again."
          : "Server error. Please try again.",
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => forceLogout();

  /* ---------- admin actions ---------- */
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, ownerHeaders());
      setBlogs((p) => p.filter((b) => b._id !== id));
      if (selectedBlog?._id === id) navigate("/blog");
    } catch (e) {
      if (e.response?.status === 401) {
        forceLogout();
        alert("Session expired. Please login again.");
        return;
      }
      alert(e.response?.data?.message || "Blog delete failed");
    }
  };

  const handleEditClick = (b) => {
    setEditBlog({ ...b, sections: (b.sections || []).map((s) => ({ ...s, paragraphs: [...(s.paragraphs || [])] })) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/api/blogs/${editBlog._id}`, editBlog, ownerHeaders());
      setBlogs((p) => p.map((b) => (b._id === editBlog._id ? res.data.blog : b)));
      setEditBlog(null);
      alert("Blog updated successfully");
    } catch (err) {
      if (err.response?.status === 401) {
        forceLogout();
        alert("Session expired. Please login again.");
        return;
      }
      alert(err.response?.data?.message || "Blog update failed");
    }
  };

  /* ---------- SEO ---------- */
  useEffect(() => {
    if (slug && loading) return;

    if (slug && selectedBlog) {
      const b = selectedBlog;
      const url = getBlogUrl(b);
      const category = b.category || "Physiotherapy";
      const desc = b.description || `${b.title} physiotherapy and rehabilitation advice from ${SITE_NAME}, ${CITY}.`;
      applySeo({
        title: `${b.title} | ${SITE_NAME}, ${CITY}`,
        desc,
        url,
        type: "article",
        schema: {
          "@context": "https://schema.org",
          "@graph": [
            clinicNode,
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              headline: b.title,
              description: desc,
              url,
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              datePublished: b.createdAt,
              dateModified: b.updatedAt || b.createdAt,
              wordCount: wordsOf(b),
              timeRequired: `PT${getReadingTime(b)}M`,
              articleSection: category,
              inLanguage: "en-IN",
              author: b.authorName ? { "@type": "Person", name: b.authorName } : { "@id": ORG_ID },
              publisher: { "@id": ORG_ID },
            },
          ],
        },
      });
    } else {
      applySeo({
        title: `Physiotherapy Blog in ${CITY} | ${SITE_NAME}`,
        desc: `Physiotherapy guides from ${SITE_NAME}, ${CITY}.`,
        url: `${SITE_URL}/blog`,
      });
    }
  }, [slug, selectedBlog, loading, blogs]);

  if (editBlog) {
    return <EditForm blog={editBlog} setBlog={setEditBlog} onSubmit={handleUpdateBlog} onCancel={() => setEditBlog(null)} />;
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-24 sm:pt-28">
      {/* Admin bar */}
      <div className="mx-auto mb-6 flex max-w-7xl justify-end px-4 sm:px-6">
        {!isAdmin ? (
          <button onClick={() => setShowLoginModal(true)} className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-bold text-[#003A80] transition hover:bg-gray-200">
            🔒 Admin Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-green-600">Admin mode on</span>
            <button onClick={handleLogout} className="rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100">
              🔓 Logout Admin
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ARTICLE VIEW */}
        {slug ? (
          loading ? (
            <p className="py-20 text-center text-gray-500">Loading...</p>
          ) : !selectedBlog ? (
            <div className="py-20 text-center">
              <h1 className="mb-4 text-2xl font-bold text-[#003A80]">Article not found</h1>
              <Link to="/blog" className="font-semibold text-[#003A80] underline">Back to all articles</Link>
            </div>
          ) : (
            <article className="mx-auto max-w-3xl">
              <Link to="/blog" className="text-sm font-semibold text-[#003A80]">← All articles</Link>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.12em] text-[#007a83]">{selectedBlog.category || "Physiotherapy"}</p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{selectedBlog.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>{getReadingTime(selectedBlog)} min read</span>
                {(selectedBlog.updatedAt || selectedBlog.createdAt) && (
                  <><span aria-hidden="true">·</span><time dateTime={selectedBlog.updatedAt || selectedBlog.createdAt}>{fmtDate(selectedBlog.updatedAt || selectedBlog.createdAt)}</time></>
                )}
              </div>

              {isAdmin && (
                <div className="mt-5 flex gap-3">
                  <button onClick={() => handleEditClick(selectedBlog)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#003A80]">Edit</button>
                  <button onClick={() => handleDeleteBlog(selectedBlog._id)} className="rounded-lg border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
                </div>
              )}

              <p className="mt-6 text-lg leading-8 text-slate-600">{selectedBlog.description}</p>

              {(selectedBlog.sections || []).map((s, i) => (
                <section key={i} className="mt-10">
                  <h2 className="mb-3 text-2xl font-bold text-[#003A80]">{s.heading}</h2>
                  {(s.paragraphs || []).map((p, j) => (
                    <p key={j} className="mb-4 leading-8 text-slate-700">{p}</p>
                  ))}
                </section>
              ))}

              <section className="mt-12">
                <h2 className="mb-4 text-2xl font-bold text-[#003A80]">Frequently asked questions</h2>
                {faqsFor(selectedBlog).map((f, i) => (
                  <details key={i} className="mb-3 rounded-xl border border-slate-200 p-4">
                    <summary className="cursor-pointer font-semibold text-slate-900">{f.q}</summary>
                    <p className="mt-2 leading-7 text-slate-600">{f.a}</p>
                  </details>
                ))}
              </section>

              <div className="mt-10 rounded-2xl bg-[#003A80] p-6 text-center text-white">
                <p className="mb-3 text-lg font-semibold">Need help with your pain or mobility?</p>
                <Link to="/appointment" className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-[#003A80]">Book Consultation</Link>
              </div>
            </article>
          )
        ) : (
          /* LIST VIEW */
          <>
            <h1 className="mb-6 text-3xl font-bold text-[#003A80]">Physiotherapy Articles</h1>

            <div className="mb-6 flex flex-col gap-4">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#003A80] sm:max-w-md"
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                      activeCategory === c ? "border-[#003A80] bg-[#003A80] text-white" : "border-gray-200 text-gray-600 hover:border-[#003A80]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <p className="py-20 text-center text-gray-500">Loading...</p>
            ) : filteredBlogs.length === 0 ? (
              <p className="py-20 text-center text-gray-500">No articles found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} isAdmin={isAdmin} onEdit={handleEditClick} onDelete={handleDeleteBlog} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-2 text-xl font-bold text-[#003A80]">Admin Login</h2>
            <p className="mb-4 text-sm text-gray-500">Enter the owner key to unlock blog editing and deletion.</p>
            <form onSubmit={handleAdminLogin}>
              <input
                type="password"
                placeholder="Enter owner key..."
                value={ownerKeyInput}
                onChange={(e) => { setOwnerKeyInput(e.target.value); setLoginError(""); }}
                className="mb-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#003A80]"
                required
                autoFocus
              />
              {loginError && <p className="mb-3 text-sm text-red-500">{loginError}</p>}
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowLoginModal(false); setLoginError(""); setOwnerKeyInput(""); }}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="rounded-xl bg-[#003A80] px-5 py-2 text-sm font-semibold text-white hover:bg-[#002d63] disabled:opacity-60"
                >
                  {loggingIn ? "Checking..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
