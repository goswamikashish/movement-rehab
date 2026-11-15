// import Appointment from "./Appointment";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaInstagram, FaArrowRight } from "react-icons/fa";
// import Offering from "./Offering";
// import Chatbot from "./Chatbot";
// import raw1 from "./photos/raw1.jpg";
// import raw2 from "./photos/raw2.jpg";
// import raw3 from "./photos/raw3.jpg";
// import raw4 from "./photos/raw4.jpg";
// import raw5 from "./photos/raw5.jpg";
// import raw6 from "./photos/raw6.jpg";
// import banner from "./photos/bannernew.png"
// const Home = () => {
//   const navigate = useNavigate();

//   const posts = [raw1, raw2, raw3, raw4, raw5, raw6];

//   return (
//     <div className="overflow-x-hidden">
//       {/* Hero Section */}
//       <div className="relative w-full pt-20 sm:pt-24 bg-white">
//         <img
//           src={banner}
//           alt="Banner"
//           className="w-full h-full sm:min-h-[420px] lg:min-h-screen object-contain"
//         />
//       </div>

//       {/* Welcome Section */}
//       <section className="bg-gradient-to-b from-white to-gray-100 py-14 sm:py-20 lg:py-24 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
//           <div>
//             <span className="text-[#00C4CD] font-semibold uppercase tracking-widest text-sm">
//               Welcome to Our Clinic
//             </span>

//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003A80] mt-4 leading-tight">
//               Holistic Healing <br /> Through Advanced Physiotherapy
//             </h1>

//             <div className="w-24 h-1 bg-[#00C4CD] mt-6 rounded-full"></div>

//             <p className="text-gray-600 text-base sm:text-lg mt-6 sm:mt-8 leading-relaxed">
//               At Movement Rehab, we restore function, reduce pain, and improve
//               mobility through advanced, evidence-based physiotherapy
//             </p>
//           </div>

//           <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100">
//             <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
//               At our clinic, we believe in the perfect synergy of physiotherapy
//               and Pilates, blending expert care with mindful movement.
//             </p>
//             <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
//               Under the expert guidance of Dr. Mayank Gupta (PT), we deliver
//               advanced physiotherapy and rehabilitation services rooted in
//               evidence-based practice. Our approach focuses on restoring
//               functional movement, relieving pain, and enhancing overall quality
//               of life.
//             </p>

//             <div className="mt-8 bg-[#003A80] text-white p-5 rounded-xl">
//               <p className="text-base sm:text-lg font-semibold">
//                 Dedicated to providing compassionate care and effective
//                 treatment.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Offering Section */}
//       <Offering />
//       <Appointment></Appointment>

//       {/* Instagram Section */}
//       <section className="relative py-14 sm:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
//         {/* Glow Background */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] sm:w-[600px] sm:h-[600px] bg-[#00C4CD]/10 blur-[120px] rounded-full"></div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
//           {/* LEFT SIDE */}
//           <div>
//             {/* Tag */}
//             <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00C4CD]/10 text-[#00C4CD] rounded-full text-sm font-semibold mb-6">
//               <FaInstagram className="text-lg" />
//               Instagram Presence
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//               Follow our journey on <br />
//               <span className="bg-gradient-to-r from-[#003A80] to-[#00C4CD] text-transparent bg-clip-text">
//                 @movementrehab
//               </span>
//             </h2>

//             {/* Description */}
//             <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
//               Explore expert physiotherapy insights, real recovery journeys, and
//               guided exercises designed to help you move better, faster, and
//               stronger.
//             </p>

//             {/* CTA */}
//             <a
//               href="https://www.instagram.com/movement__rehab?igsh=cWdiMW5wOWxrenQ2"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <button className="mt-10 group flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#003A80] to-[#0059d6] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//                 Visit Instagram
//                 <FaArrowRight className="group-hover:translate-x-1 transition" />
//               </button>
//             </a>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="relative">
//             {/* Glass Card */}
//             <div className="bg-white/60 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">
//               {/* Header */}
//               <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   Recovery Moments
//                 </h3>

//                 <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">
//                   Latest Posts
//                 </span>
//               </div>

//               {/* Grid */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
//                 {posts.map((post, index) => (
//                   <div
//                     key={index}
//                     className="group relative overflow-hidden rounded-xl cursor-pointer"
//                   >
//                     {/* Image */}
//                     <img
//                       src={post}
//                       className="w-full h-28 sm:h-36 md:h-40 object-cover transform group-hover:scale-110 transition duration-700 ease-out"
//                     />

//                     {/* Overlay */}
//                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition duration-500"></div>

//                     {/* Hover Content */}
//                     <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition duration-500">
//                       <p className="text-white text-xs font-medium">
//                         View Session →
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Footer */}
//               <p className="text-center text-gray-500 mt-6 text-sm">
//                 Daily rehab tips • Real patient progress • Expert guidance
//               </p>
//             </div>

//             {/* Floating Decoration */}
//             <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#003A80]/10 rounded-full blur-2xl"></div>
//             <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00C4CD]/10 rounded-full blur-2xl"></div>
//           </div>
//         </div>
//       </section>

//       {/* CTA button */}
//       <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-20 bg-gray-50">
//         <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 lg:p-12 text-center border border-gray-100">
//           <h2 className="text-3xl sm:text-4xl font-semibold text-[#003A80] mb-4">
//             Start Your Recovery Today
//           </h2>

//           <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
//             Book your physiotherapy consultation with Movement Rehab and take
//             the first step toward pain-free movement and better mobility.
//           </p>

//           <div className="flex justify-center gap-6 flex-wrap">
//             <button
//               onClick={() => navigate("/Appointment")}
//               className="px-5 py-3 sm:px-8 sm:py-4 border border-[#003A80] text-[#003A80] rounded-lg hover:bg-[#003A80] hover:text-white transition"
//             >
//               Book Appointment
//             </button>
//           </div>
//         </div>
//         <Chatbot></Chatbot>
//       </section>
//     </div>
//   );
// };

// export default Home;






import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaInstagram, FaArrowRight, FaPhoneAlt, FaStar } from "react-icons/fa";
import Appointment from "./Appointment";
import Offering from "./Offering";
import Chatbot from "./Chatbot";
import raw1 from "./photos/raw1.jpg";
import raw2 from "./photos/raw2.jpg";
import raw3 from "./photos/raw3.jpg";
import raw4 from "./photos/raw4.jpg";
import raw5 from "./photos/raw5.jpg";
import raw6 from "./photos/raw6.jpg";
import banner from "./photos/bannernew.png";

/* ------------------------------------------------------------------ */
/* ENTITY DATA: copied from your Google Business Profile.              */
/* Keep name, address and phone identical everywhere (NAP consistency).*/
/* ------------------------------------------------------------------ */
const SITE_URL = "https://www.movementrehab.in"; // TODO: your real domain
const CITY = "Indore";
const AREA = "Khandwa Road ";
const CLINIC = {
  name: "Movement Rehab",
  gbpTitle: "Movement Rehab | Physiotherapy & Rehabilitation in Indore",
  doctor: "Dr. Mayank Gupta (PT)",
  street: "Khandwa Naka, Bhavna Nagar",
  postalCode: "452020",
  region: "Madhya Pradesh",
  regionCode: "IN-MP",
  country: "IN",
  phoneDisplay: "062626 66558", // exactly as on Google
  phoneTel: "+916262666558",
  phoneSchema: "+91-62626-66558",
  rating: "4.9",
  reviewCount: 63,
  // TODO: add exact coordinates (right-click clinic on Google Maps) to enable geo schema
  geo: null, // e.g. { lat: 22.7xxx, lng: 75.8xxx }
  mapUrl: "", // TODO: paste your Google Maps share link
  sameAs: ["https://www.instagram.com/movement__rehab"],
};
const ADDRESS_LINE = `${CLINIC.street}, ${CITY}, ${CLINIC.region} ${CLINIC.postalCode}`;

/* Hours from Google profile: 9am-1pm, Sunday closed.
   TODO: Tuesday was not visible in the screenshot; confirm it. */
const OPEN_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const HOURS_TEXT = "Monday to Saturday, 9 am to 1 pm. Closed on Sunday.";

/* Topical architecture: hub (this page) -> service spokes -> condition spokes.
   Each spoke needs its own page at the path given. */
   const SERVICES = [
    { to: "/services/Neurological Rehabilitation", title: "Neurological Rehabilitation", text: "Specialised rehabilitation for stroke, spinal cord injury, Parkinson's and other neurological conditions to regain movement and independence." },
    { to: "/services/musculoskeletal", title: "Musculoskeletal Rehabilitation", text: "Targeted care for back, neck, joint and muscle pain to ease discomfort and restore everyday movement." },
    { to: "/services/post-surgery-rehabilitation", title: "Post-surgery Rehabilitation", text: "Guided recovery after knee, hip, shoulder and spine procedures." },
    { to: "/services/pilates", title: "Clinical Pilates", text: "Mindful, supervised movement that builds core control and prevents re-injury." },
    { to: "/services/sports-injury-Rehabilitation", title: "Sports injury rehabilitation", text: "Structured return-to-sport plans for sprains, strains and ligament injuries." },

    { to: "/services/obesity-management", title: "Obesity management", text: "Supervised exercise and lifestyle guidance for safe, sustainable weight management." },
  ];

const CONDITIONS = [
  { to: "/conditions/back-pain", label: "Back pain" },
  { to: "/conditions/neck-pain", label: "Neck pain" },
  { to: "/conditions/knee-pain", label: "Knee pain" },
  { to: "/conditions/shoulder-pain", label: "Shoulder pain" },
  { to: "/conditions/sciatica", label: "Sciatica" },
  { to: "/conditions/arthritis", label: "Arthritis" },
  { to: "/conditions/posture-correction", label: "Posture problems" },
  { to: "/conditions/sports-injuries", label: "Sports injuries" },
];

const STEPS = [
  { title: "Assessment", text: "We review your history, test movement and strength, and find the source of the problem." },
  { title: "Diagnosis and goals", text: "You get a clear explanation and agreed recovery goals." },
  { title: "Hands-on treatment", text: "Manual therapy, targeted exercises and modalities chosen for your condition." },
  { title: "Movement and Pilates", text: "Guided exercise rebuilds control so the pain does not return." },
  { title: "Home plan and review", text: "A simple home program, with progress checked at every visit." },
];

/* GEO: answer-first FAQ. Feeds both the visible FAQ and FAQPage JSON-LD. */
const FAQS = [
  {
    q: `Where is Movement Rehab physiotherapy clinic in ${CITY}?`,
    a: `Movement Rehab is at ${ADDRESS_LINE}. It is a physiotherapy and rehabilitation centre serving ${AREA} and nearby areas of ${CITY}.`,
  },
  {
    q: "What are the clinic timings?",
    a: `${HOURS_TEXT} Call ${CLINIC.phoneDisplay} to confirm a slot before you visit.`,
  },
  {
    q: `What does a physiotherapist do at Movement Rehab in ${CITY}?`,
    a: "A physiotherapist at Movement Rehab assesses how you move, finds the cause of pain or stiffness, and treats it with manual therapy, exercise and education. The aim is to restore function, reduce pain and prevent the problem returning.",
  },
  {
    q: "What is the difference between physiotherapy and Pilates?",
    a: "Physiotherapy diagnoses and treats an injury or pain condition. Pilates is a controlled exercise method that builds core strength, posture and flexibility. At Movement Rehab the two are combined so treatment and long-term strengthening support each other.",
  },
  {
    q: "Do I need a doctor's referral to book physiotherapy?",
    a: "A referral is usually not required for a first consultation. If you have scans, reports or a surgeon's notes, bring them so your plan can be built around them.",
  },
  {
    q: "Which conditions can physiotherapy help with?",
    a: "Physiotherapy commonly helps with back and neck pain, knee and shoulder problems, sciatica, arthritis, posture issues, sports injuries and recovery after surgery.",
  },
  {
    q: "How many sessions will I need?",
    a: "It depends on the condition, how long you have had it and your goals. Your physiotherapist will give an expected timeline after the first assessment and update it as you progress.",
  },
  {
    q: "How do I book an appointment?",
    a: `Use the Book Appointment button on this page or call ${CLINIC.phoneDisplay}.`,
  },
];

const POSTS = [
  { src: raw1, alt: "Patient performing a guided rehabilitation exercise at Movement Rehab Indore" },
  { src: raw2, alt: "Physiotherapy session in progress at Movement Rehab Indore" },
  { src: raw3, alt: "Clinical Pilates exercise at Movement Rehab Indore" },
  { src: raw4, alt: "Mobility and stretching routine led by a physiotherapist" },
  { src: raw5, alt: "Strength training as part of injury recovery" },
  { src: raw6, alt: "Recovery progress session at Movement Rehab clinic" },
];

/* ------------------------------------------------------------------ */
/* STRUCTURED DATA                                                     */
/* ------------------------------------------------------------------ */
const clinicSchema = {
  "@type": ["MedicalBusiness", "Physiotherapy", "LocalBusiness"],
  "@id": `${SITE_URL}/#clinic`,
  name: CLINIC.name,
  alternateName: CLINIC.gbpTitle,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: CLINIC.phoneSchema,
  description:
    "Physiotherapy and rehabilitation centre in Indore offering evidence-based treatment for pain, injury and mobility problems, with clinical Pilates.",
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.street,
    addressLocality: CITY,
    addressRegion: CLINIC.region,
    postalCode: CLINIC.postalCode,
    addressCountry: CLINIC.country,
  },
  areaServed: [CITY, AREA, "Khandwa Naka"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPEN_DAYS,
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: CLINIC.sameAs,
  founder: { "@id": `${SITE_URL}/#doctor` },
  medicalSpecialty: "Physiotherapy",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: SITE_URL + s.to },
    })),
  },
};
if (CLINIC.geo) {
  clinicSchema.geo = { "@type": "GeoCoordinates", latitude: CLINIC.geo.lat, longitude: CLINIC.geo.lng };
}
if (CLINIC.mapUrl) {
  clinicSchema.hasMap = CLINIC.mapUrl;
  clinicSchema.sameAs = [...CLINIC.sameAs, CLINIC.mapUrl];
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    clinicSchema,
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#doctor`,
      name: "Mayank Gupta",
      honorificSuffix: "PT",
      jobTitle: "Physiotherapist",
      worksFor: { "@id": `${SITE_URL}/#clinic` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: CLINIC.name,
      publisher: { "@id": `${SITE_URL}/#clinic` },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
const Home = () => {
  const title = `Physiotherapy & Rehabilitation in ${CITY} | ${CLINIC.name}`;
  const description = `Physiotherapy and rehabilitation centre in ${AREA}, ${CITY}. Treatment for back pain, knee pain, sports injuries and post-surgery recovery under ${CLINIC.doctor}. Rated ${CLINIC.rating} on Google. Book online.`;

  return (
    <>
      <Helmet>
        <html lang="en-IN" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="geo.region" content={CLINIC.regionCode} />
        <meta name="geo.placename" content={CITY} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content={CLINIC.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="overflow-x-hidden">
        {/* Hero banner: prioritised for LCP, descriptive alt */}
        <div className="relative w-full pt-20 sm:pt-24 bg-white">
          <img
            src={banner}
            alt={`${CLINIC.name} physiotherapy and rehabilitation clinic in ${CITY}`}
            fetchpriority="high"
            decoding="async"
            className="w-full h-full sm:min-h-[420px] lg:min-h-screen object-contain"
          />
        </div>

        {/* Intro: only H1 + answer-first definition (GEO) */}
        <section
          aria-labelledby="intro-heading"
          className="bg-gradient-to-b from-white to-gray-100 py-14 sm:py-20 lg:py-24 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <p className="text-[#00C4CD] font-semibold uppercase tracking-widest text-sm">
                Physiotherapy centre in {AREA}, {CITY}
              </p>
              <h1
                id="intro-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003A80] mt-4 leading-tight"
              >
                Physiotherapy and rehabilitation in {CITY}
              </h1>
              <div className="w-24 h-1 bg-[#00C4CD] mt-6 rounded-full" />

              <p className="text-gray-700 text-base sm:text-lg mt-6 sm:mt-8 leading-relaxed">
                <strong>{CLINIC.name}</strong> is a physiotherapy and
                rehabilitation centre at Khandwa Naka, {AREA}, {CITY}, led by{" "}
                {CLINIC.doctor}. We treat back pain, neck pain, knee and
                shoulder problems, sciatica, sports injuries and post-surgery
                recovery with evidence-based care that restores movement and
                reduces pain.
              </p>
              <p className="text-gray-600 text-base sm:text-lg mt-4 leading-relaxed">
                We combine{" "}
                <Link to="/services/physiotherapy" className="text-[#003A80] underline underline-offset-4 hover:text-[#00C4CD]">
                  physiotherapy
                </Link>{" "}
                with{" "}
                <Link to="/services/pilates" className="text-[#003A80] underline underline-offset-4 hover:text-[#00C4CD]">
                  clinical Pilates
                </Link>{" "}
                so treatment relieves symptoms and mindful movement keeps them
                from coming back.
              </p>

              <p className="mt-6 inline-flex items-center gap-2 text-gray-700">
                <span className="flex text-yellow-400" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <FaStar key={n} />
                  ))}
                </span>
                <span>
                  <strong>{CLINIC.rating}</strong> rating from {CLINIC.reviewCount} Google reviews
                </span>
              </p>
            </div>

            <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#003A80] mb-5">
                Clinic at a glance
              </h2>
              <dl className="space-y-4 text-gray-700">
                <div>
                  <dt className="font-semibold">Lead physiotherapist</dt>
                  <dd>{CLINIC.doctor}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Address</dt>
                  <dd>
                    <address className="not-italic">{ADDRESS_LINE}</address>
                    {CLINIC.mapUrl && (
                      <a
                        href={CLINIC.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#003A80] underline underline-offset-4 hover:text-[#00C4CD]"
                      >
                        Get directions
                      </a>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Phone</dt>
                  <dd>
                    <a href={`tel:${CLINIC.phoneTel}`} className="text-[#003A80] hover:text-[#00C4CD]">
                      {CLINIC.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd>{HOURS_TEXT}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Treatments</dt>
                  <dd> ⁠Neurological rehabilitation, Musculoskeletal rehabilitation, post-surgery rehabilitation, Clinical Pilates, Sports rehabilitation and Obesity management </dd>
                </div>
              </dl>
              <div className="mt-8 bg-[#003A80] text-white p-5 rounded-xl">
                <p className="text-base sm:text-lg font-semibold">
                  Compassionate care and effective treatment, built around you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services hub */}
        <section aria-labelledby="services-heading" className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-[#003A80]">
              Physiotherapy services in {CITY}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
              Each programme starts with a full assessment and is adjusted as
              you recover.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {SERVICES.map((s) => (
                <li key={s.to} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-[#003A80]">
                    <Link to={s.to} className="hover:text-[#00C4CD]">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">{s.text}</p>
                  <Link
                    to={s.to}
                    aria-label={`Read more about ${s.title}`}
                    className="inline-flex items-center gap-2 mt-5 text-[#003A80] font-medium hover:text-[#00C4CD]"
                  >
                    Learn more <FaArrowRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Offering />

        {/* Conditions cluster */}
        <section aria-labelledby="conditions-heading" className="py-14 sm:py-20 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 id="conditions-heading" className="text-3xl sm:text-4xl font-bold text-[#003A80]">
              Conditions we treat in {CITY}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-3xl leading-relaxed">
              If you have pain or limited movement that is not settling,
              physiotherapy can help find the cause and treat it.
            </p>
            <ul className="flex flex-wrap gap-3 mt-8">
              {CONDITIONS.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className="inline-block px-5 py-2 rounded-full border border-[#003A80]/20 bg-white text-[#003A80] hover:bg-[#003A80] hover:text-white transition"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process: real sequence, so ordered list */}
        <section aria-labelledby="process-heading" className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-[#003A80]">
              How treatment works at {CLINIC.name}
            </h2>
            <ol className="mt-10 space-y-6 border-l-4 border-[#00C4CD] pl-6">
              {STEPS.map((s) => (
                <li key={s.title}>
                  <h3 className="text-lg font-semibold text-[#003A80]">{s.title}</h3>
                  <p className="text-gray-600 mt-1 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Appointment />

        {/* E-E-A-T */}
        <section aria-labelledby="doctor-heading" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-100">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
            <h2 id="doctor-heading" className="text-3xl sm:text-4xl font-bold text-[#003A80]">
              Meet {CLINIC.doctor}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mt-5 leading-relaxed">
              {CLINIC.doctor} leads every treatment plan at {CLINIC.name},
              delivering advanced physiotherapy and rehabilitation rooted in
              evidence-based practice. The focus is restoring functional
              movement, relieving pain and improving quality of life.
              {/* TODO: add degree, registration number, years of experience */}
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-6 text-[#003A80] font-semibold hover:text-[#00C4CD]"
            >
              Read about our team and qualifications <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* FAQ: native details/summary, crawlable */}
        <section aria-labelledby="faq-heading" className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-[#003A80]">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex justify-between gap-4 text-[#003A80]">
                    <h3 className="text-lg font-semibold">{f.q}</h3>
                    <span aria-hidden="true" className="text-[#00C4CD] text-xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="text-gray-600 mt-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram */}
        <section aria-labelledby="insta-heading" className="relative py-14 sm:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
          <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] sm:w-[600px] sm:h-[600px] bg-[#00C4CD]/10 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00C4CD]/10 text-[#00C4CD] rounded-full text-sm font-semibold mb-6">
                <FaInstagram className="text-lg" aria-hidden="true" />
                Instagram
              </div>
              <h2 id="insta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Rehab tips and recovery stories on{" "}
                <span className="text-[#003A80]">@movement__rehab</span>
              </h2>
              <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
                Exercises, patient progress and physiotherapy advice to help you
                move better and recover stronger.
              </p>
              <a
                href="https://www.instagram.com/movement__rehab?igsh=cWdiMW5wOWxrenQ2"
                target="_blank"
                rel="noopener noreferrer me"
                className="mt-10 inline-flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#003A80] to-[#0059d6] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Follow Movement Rehab on Instagram
                <FaArrowRight aria-hidden="true" />
              </a>
            </div>

            <div className="relative">
              <div className="bg-white/60 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Recovery moments</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {POSTS.map((p) => (
                    <img
                      key={p.src}
                      src={p.src}
                      alt={p.alt}
                      width="320"
                      height="320"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 md:h-40 object-cover rounded-xl"
                    />
                  ))}
                </div>
                <p className="text-center text-gray-500 mt-6 text-sm">
                  Daily rehab tips, real patient progress, expert guidance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="cta-heading" className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-20 bg-gray-50">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 lg:p-12 text-center border border-gray-100">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-semibold text-[#003A80] mb-4">
              Book a physiotherapy consultation in {CITY}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
              Take the first step toward pain-free movement. Book with{" "}
              {CLINIC.name} online or call us. Open Monday to Saturday, 9 am to 1 pm.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/Appointment"
                className="px-5 py-3 sm:px-8 sm:py-4 border border-[#003A80] text-[#003A80] rounded-lg hover:bg-[#003A80] hover:text-white transition"
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${CLINIC.phoneTel}`}
                className="inline-flex items-center gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-[#00C4CD] text-white rounded-lg hover:opacity-90 transition"
              >
                <FaPhoneAlt aria-hidden="true" /> Call {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>
          <Chatbot />
        </section>
      </main>
    </>
  );
};

export default Home;
