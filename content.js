/* =====================================================================
   EDIT ME — this is the only file on this website you need to touch.

   Everything you see on the page — name, jobs, dates, skills, languages,
   contact details — lives here as plain text. Change it here, save, and
   refresh the page in your browser to see it update. Nothing else on the
   site needs to change.


   HOW TO EDIT
   -----------
   1. Open this file in any plain text editor (TextEdit, Notepad, VS Code,
      Notepad++ — anything that edits plain text works).
   2. Find the line you want to change. The text you see on the website is
      always between a pair of "double quotes".
   3. Type your new text between the quotes. Leave the quotes themselves
      in place.
   4. Save the file, then open (or refresh) index.html in a web browser to
      see the change.


   A FEW RULES SO THE PAGE DOESN'T BREAK
   --------------------------------------
   - Every piece of text must stay wrapped in "double quotes", like this.
   - Every line inside a { ... } or [ ... ] group needs a comma , at the
     end — except the very last line in that group.
   - Never delete a { } or [ ] symbol. Only change what's INSIDE the quotes.
   - Lines starting with // (like this one) are just notes for humans —
     the website ignores them completely. Feel free to read them, but
     don't worry if you leave them exactly as they are.
   - If the page ever goes blank or looks broken after an edit: undo your
     last change (Cmd/Ctrl+Z, or just retype it back to how it was) and
     save again. That almost always means a quote or comma went missing.
   - In a few text fields (marked below) you can wrap a word in <em>word</em>
     to italicize it, <strong>word</strong> to bold it, or use <br> to force
     a line break. You don't have to use these — plain text works too.
===================================================================== */

window.SITE_CONTENT = {

  // Shows in the browser tab and in search engine results — not on the
  // page itself.
  meta: {
    pageTitle: "Nafi Majeed — HR & International Management",
    description: "Portfolio of Nafi Majeed — HR coordinator with two years in Dubai, now reading International Management in Dresden. CIPD Level 5 Associate Member.",
  },

  // ------------------------------------------------------------------
  // TOP BAR — the little badge in the top-left corner
  // ------------------------------------------------------------------
  masthead: {
    initials: "NM",          // the small solid badge
    fullName: "Nafi Majeed", // next to it (hidden automatically on narrow phone screens)
  },

  // ------------------------------------------------------------------
  // HERO — the big introduction at the very top of the page
  // ------------------------------------------------------------------
  hero: {
    // small line above the big name. Keep the " · " (space, dot, space)
    // in the middle if you want it to show as a coloured separator.
    eyebrow: "Human Resources · International Management",

    firstName: "Nafi",
    lastName: "Majeed",

    // the small ID-style photo pinned above the fact table. Drop a new
    // image into the "assets" folder and point this at it — any normal
    // photo works, it gets cropped to fit the frame automatically. Keep
    // "alt" as a plain description of the photo, for accessibility.
    photo: {
      src: "assets/nafi.png",
      alt: "Nafi Majeed",
    },

    // the paragraph under the name. <em>...</em> is allowed here.
    intro: "Two years running HR operations out of Dubai — visas, records, government liaison — now reading <em>International Management</em> in Germany. I like the unglamorous part: the systems underneath that let people get on with their work.",

    // used for the email button, the copy-to-clipboard button, and the
    // contact section — change it once here and it updates everywhere.
    email: "Nafi.kalathil@gmail.com",

    // where the CV file lives, inside the "assets" folder — must exactly
    // match the actual file name (including capital letters and spaces).
    resumeFile: "assets/NAFEEA NAFEEA_Resume.pdf",

    // the small table of facts, top-left of the hero. Add or remove rows
    // freely — the layout adjusts automatically.
    facts: [
      { label: "Ref.",        value: "NM / 2026" },
      { label: "Status",      value: "Master's student" },
      { label: "Based",       value: "Sharjah, UAE" },
      { label: "Reading",     value: "Dresden, DE" },
      { label: "Nationality", value: "Indian" },
    ],

    // the red rotated stamp, top-right of the hero
    stamp: {
      top: "Chartered Institute of Personnel & Development",
      middle: "Level 5",
      bottom: "Associate Member",
    },

    // the two live clocks near the bottom of the hero. "timezone" must be
    // a real time zone name — e.g. "Asia/Dubai", "Europe/Berlin",
    // "Europe/London", "Asia/Kolkata", "America/New_York".
    clocks: [
      { city: "Dubai",   timezone: "Asia/Dubai" },
      { city: "Dresden", timezone: "Europe/Berlin" },
    ],
  },

  // ------------------------------------------------------------------
  // SCROLLING TICKER — the strip of scrolling keywords under the hero
  // ------------------------------------------------------------------
  ticker: [
    "Employee mobility",
    "UAE labour compliance",
    "MOHRE",
    "Visa & immigration",
    "Employee records",
    "CIPD Level 5",
    "Erasmus+",
    "Data governance",
  ],

  // ------------------------------------------------------------------
  // SECTION 01 — PROFILE
  // ------------------------------------------------------------------
  profile: {
    navLabel: "Profile",              // shows in the top menu and the section heading
    sectionTag: "Who is filing this", // small label, top-right of the section

    // the four big numbers at the top of the section — add/remove freely
    stats: [
      { number: "02", label: "Years of HR experience, Dubai" },
      { number: "05", label: "Languages spoken" },
      { number: "02", label: "Degrees — BA held, MA in progress" },
      { number: "L5", label: "CIPD Associate Membership" },
    ],

    // the "about me" paragraphs — add or remove lines freely.
    // <em>...</em> and <strong>...</strong> are allowed here.
    paragraphs: [
      "International Management Master's student based in the UAE, bringing two years of hands-on HR experience from Dubai. Experienced in turning data, processes and people insights into structured onboarding and HR support in fast-paced, multicultural environments.",
      "CIPD Associate Member with a strong curiosity for global talent management, learning initiatives and digital platforms.",
    ],

    // the highlighted quote line at the bottom of the section
    quote: "Motivated by building systems that help people grow and organizations scale.",
  },

  // ------------------------------------------------------------------
  // SECTION 02 — EXPERIENCE
  // ------------------------------------------------------------------
  experience: {
    navLabel: "Experience",
    sectionTag: "Mar 2023 — Feb 2025", // small label, top-right — update this when you add a newer job

    // one { ... } block per job. Put the most recent job first. Copy a
    // whole block (from the opening { to the closing },) to add a new job.
    roles: [
      {
        title: "HR Coordinator",
        company: "Al Madina Group",
        location: "Dubai, United Arab Emirates",
        startDate: "March 2023",
        endDate: "February 2025",

        // each one of these becomes a numbered card. Add, remove, or
        // reorder freely — the numbers update automatically.
        duties: [
          { heading: "Mobility & immigration", text: "Managed employee mobility and immigration end to end — work and business visas, renewals and cancellations — in line with UAE labour and immigration regulations." },
          { heading: "Government liaison", text: "Acted as the key point of contact with government authorities, handling official submissions and following each one through to resolution." },
          { heading: "Records & systems", text: "Maintained accurate employee records across HR systems including MOHRE, keeping documentation consistent and audit-ready." },
          { heading: "Employee support", text: "Supported employees through residency permits, Emirates IDs and the related paperwork that surrounds a move." },
          { heading: "Data governance", text: "Held the line on data accuracy and confidentiality, keeping HR operations smooth across the full employee life cycle." },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  // CHRONOLOGY CHART — the timeline bars between Experience and Education
  // ------------------------------------------------------------------
  // Dates use "YYYY-MM" (four-digit year, dash, two-digit month), for
  // example "2023-03" means March 2023. For something still ongoing,
  // set "end" to "present". The chart bars and the year labels below
  // them resize and line up automatically — you never need to work out
  // percentages by hand, just enter real dates.
  //
  // "type" must be either "study" or "work" (this picks the bar colour).
  chronology: {
    subtitle: "Study and work, 2020 to present", // small caption under "Chronology"

    entries: [
      { label: "BA (Hons) Business Administration", place: "Liverpool John Moores University", type: "study", start: "2020-09", end: "2023-08" },
      { label: "HR Coordinator", place: "Al Madina Group, Dubai", type: "work", start: "2023-03", end: "2025-02" },
      { label: "MA International Management", place: "Dresden University of Applied Sciences", type: "study", start: "2025-04", end: "present" },
    ],
  },

  // ------------------------------------------------------------------
  // SECTION 03 — EDUCATION
  // ------------------------------------------------------------------
  education: {
    navLabel: "Education",
    sectionTag: "United Kingdom & Germany",

    // most recent first. "flag" is just a short 2-3 letter country code
    // shown as a small tag (e.g. "UK", "DE", "US").
    entries: [
      { dateRange: "April 2025 — Present", degree: "Masters in International Management", school: "Dresden University of Applied Sciences", country: "Germany", flag: "DE" },
      { dateRange: "September 2020 — August 2023", degree: "BA (Hons) Business Administration", school: "Liverpool John Moores University", country: "United Kingdom", flag: "UK" },
    ],

    credentialsLabel: "Awards & certifications",
    credentials: [
      { name: "CIPD Level 5", detail: "Associate Membership" },
      { name: "Erasmus+", detail: "Scholarship" },
    ],
  },

  // ------------------------------------------------------------------
  // SECTION 04 — CAPABILITIES
  // ------------------------------------------------------------------
  capabilities: {
    navLabel: "Capabilities",
    sectionTag: "Tools & technical skills",

    // left column — shown as a numbered list, numbers update automatically
    skillsLabel: "HR & operations",
    skills: [
      "Employee Records Management",
      "HR Documentation & Compliance",
      "Stakeholder Coordination",
      "Data Governance & Confidentiality",
    ],

    // right column — shown as small pill-shaped tags
    toolsLabel: "Office & productivity",
    tools: [
      "Microsoft Excel",
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Canva",
    ],
  },

  // ------------------------------------------------------------------
  // SECTION 05 — LANGUAGES
  // ------------------------------------------------------------------
  languages: {
    navLabel: "Languages",
    sectionTag: "Five, across three scripts",

    // "score" is a number from 1 to 5 and fills the little bar meter
    // automatically — you don't need to draw the dots yourself.
    entries: [
      { name: "Malayalam", level: "Native",   score: 5 },
      { name: "Hindi",     level: "Fluent",   score: 4 },
      { name: "English",   level: "C1",       score: 4 },
      { name: "Arabic",    level: "Beginner", score: 1 },
      { name: "German",    level: "Beginner", score: 1 },
    ],
  },

  // ------------------------------------------------------------------
  // SECTION 06 — CONTACT
  // ------------------------------------------------------------------
  contact: {
    navLabel: "Contact",
    sectionTag: "End of file",
    kicker: "Say hello —", // small italic line above the email address

    meta: [
      { label: "Based",       value: "Sharjah, United Arab Emirates" },
      { label: "Studying",    value: "Dresden, Germany" },
      { label: "Nationality", value: "Indian" },
    ],
  },

  // ------------------------------------------------------------------
  // FOOTER — the very bottom of the page
  // ------------------------------------------------------------------
  footer: {
    name: "Nafi Majeed",
  },
};
