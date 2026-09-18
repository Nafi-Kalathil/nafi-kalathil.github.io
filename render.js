/* ─────────────────────────────────────────────────────────────
   Turns content.js into the actual page. This is "plumbing" —
   there should be nothing here that needs editing to update the
   site's text. To change what the page says, edit content.js instead.
   ───────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  var DATA = window.SITE_CONTENT;
  if (!DATA) {
    console.error("content.js did not load (or window.SITE_CONTENT is missing) — the page is showing its built-in fallback text.");
    return;
  }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Escapes everything, then re-enables a small safe set of formatting
  // tags (<em>, <strong>, <br>) so a stray "<" typed by hand can never
  // break the layout, while intentional simple formatting still works.
  function richText(value) {
    return esc(value).replace(/&lt;(\/?(?:em|strong|br))\s*\/?&gt;/gi, function (_, tag) {
      return "<" + tag + ">";
    });
  }

  function byId(id) { return document.getElementById(id); }

  function setText(id, value) {
    var node = byId(id);
    if (node && value != null) node.textContent = value;
  }

  // Runs fn, and if content.js has a typo that breaks this one section
  // (a missing quote, comma, or bracket), logs it and leaves the rest
  // of the page working instead of taking the whole site down.
  function section(label, fn) {
    try { fn(); } catch (err) {
      console.error('content.js: could not display the "' + label + '" section — check it for a missing quote, comma, or bracket.', err);
    }
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // "2023-03" -> { year: 2023, month: 2 (0-based), decimal: 2023.1666... }
  function parseMonth(value) {
    var m = /^\s*(\d{4})-(\d{1,2})\s*$/.exec(String(value));
    if (!m) return null;
    var year = parseInt(m[1], 10);
    var month = parseInt(m[2], 10) - 1;
    if (month < 0 || month > 11) return null;
    return { year: year, month: month, decimal: year + month / 12 };
  }

  function isPresent(value) {
    return /^\s*(present|now|ongoing|current)\s*$/i.test(String(value));
  }

  function formatMonth(value) {
    var p = parseMonth(value);
    return p ? MONTHS[p.month] + " " + p.year : esc(value);
  }

  /* ---------------------------------------------------------- */
  section("page title & meta tags", function () {
    var meta = DATA.meta || {};
    if (meta.pageTitle) document.title = meta.pageTitle;

    var descTag = document.querySelector('meta[name="description"]');
    if (descTag && meta.description) descTag.setAttribute("content", meta.description);

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && meta.pageTitle) ogTitle.setAttribute("content", meta.pageTitle);

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && meta.description) ogDesc.setAttribute("content", meta.description);

    var authorTag = document.querySelector('meta[name="author"]');
    if (authorTag && DATA.footer && DATA.footer.name) authorTag.setAttribute("content", DATA.footer.name);
  });

  /* ---------------------------------------------------------- */
  section("masthead", function () {
    var m = DATA.masthead || {};
    setText("monogramMark", m.initials);
    setText("monogramName", m.fullName);
  });

  section("nav labels", function () {
    setText("navLabelProfile", (DATA.profile || {}).navLabel);
    setText("navLabelExperience", (DATA.experience || {}).navLabel);
    setText("navLabelEducation", (DATA.education || {}).navLabel);
    setText("navLabelCapabilities", (DATA.capabilities || {}).navLabel);
    setText("navLabelLanguages", (DATA.languages || {}).navLabel);
    setText("navLabelContact", (DATA.contact || {}).navLabel);
  });

  /* ---------------------------------------------------------- */
  section("hero", function () {
    var h = DATA.hero || {};

    var eyebrowNode = byId("heroEyebrow");
    if (eyebrowNode && h.eyebrow) {
      var parts = String(h.eyebrow).split(" · ");
      eyebrowNode.innerHTML = parts.length === 2
        ? esc(parts[0]) + " <i>·</i> " + esc(parts[1])
        : esc(h.eyebrow);
    }

    setText("heroFirstName", h.firstName);
    setText("heroLastName", h.lastName);

    var lede = byId("heroLede");
    if (lede && h.intro) lede.innerHTML = richText(h.intro);

    if (h.email) {
      var heroEmail = byId("heroEmailLink");
      if (heroEmail) heroEmail.href = "mailto:" + h.email;
      setText("heroEmailText", h.email);

      var contactMail = byId("contactMailLink");
      if (contactMail) {
        contactMail.href = "mailto:" + h.email;
        contactMail.textContent = h.email;
      }
    }

    if (h.resumeFile) {
      var href = encodeURI(h.resumeFile);
      ["heroDownloadLink", "contactDownloadLink"].forEach(function (id) {
        var a = byId(id);
        if (a) a.href = href;
      });
    }

    var factsBox = byId("dossierFacts");
    if (factsBox && Array.isArray(h.facts)) {
      var photoHTML = "";
      if (h.photo && h.photo.src) {
        photoHTML = '<div class="dossier-photo"><img src="' + esc(h.photo.src) + '" alt="' + esc(h.photo.alt || "") + '" loading="lazy"></div>';
      }
      factsBox.innerHTML = photoHTML + h.facts.map(function (f) {
        return '<div class="dossier-row"><span>' + esc(f.label) + "</span><b>" + esc(f.value) + "</b></div>";
      }).join("");
    }

    var stamp = h.stamp || {};
    setText("stampTop", stamp.top);
    setText("stampMid", String(stamp.middle || "").replace(/ /g, " "));
    setText("stampBot", stamp.bottom);

    var clockBox = byId("clocksContainer");
    if (clockBox && Array.isArray(h.clocks)) {
      clockBox.innerHTML = h.clocks.map(function (c) {
        return '<div class="clock"><span>' + esc(c.city) + '</span><b data-clock-tz="' + esc(c.timezone) + '">—</b></div>';
      }).join("");
    }
  });

  /* ---------------------------------------------------------- */
  section("ticker", function () {
    var items = DATA.ticker;
    var track = byId("tickerTrack");
    if (!track || !Array.isArray(items) || !items.length) return;
    var html = items.map(function (t) { return "<span>" + esc(t) + "</span><em>✦</em>"; }).join("");
    track.innerHTML = html + html; // doubled so the CSS marquee loops seamlessly
  });

  /* ---------------------------------------------------------- */
  section("profile", function () {
    var p = DATA.profile || {};
    setText("profileTitle", p.navLabel);
    setText("profileTag", p.sectionTag);

    var statsBox = byId("profileStats");
    if (statsBox && Array.isArray(p.stats)) {
      statsBox.innerHTML = p.stats.map(function (s) {
        return '<div class="stat"><b>' + esc(s.number) + "</b><span>" + esc(s.label) + "</span></div>";
      }).join("");
    }

    var proseBox = byId("profileProse");
    if (proseBox) {
      var html = (p.paragraphs || []).map(function (t) { return "<p>" + richText(t) + "</p>"; }).join("");
      if (p.quote) html += "<blockquote>" + richText(p.quote) + "</blockquote>";
      proseBox.innerHTML = html;
    }
  });

  /* ---------------------------------------------------------- */
  section("experience", function () {
    var e = DATA.experience || {};
    setText("experienceTitle", e.navLabel);
    setText("experienceTag", e.sectionTag);

    var box = byId("experienceRoles");
    if (!box || !Array.isArray(e.roles)) return;

    box.innerHTML = e.roles.map(function (role, i) {
      var duties = (role.duties || []).map(function (d, j) {
        return '<li class="duty rv" style="--d:' + (j + 1) + '">' +
          '<span class="duty-num">' + String(j + 1).padStart(2, "0") + "</span>" +
          "<h4>" + esc(d.heading) + "</h4>" +
          "<p>" + richText(d.text) + "</p>" +
          "</li>";
      }).join("");

      return '<article class="role rv" style="--d:' + i + '">' +
        '<div class="role-head">' +
        "<div>" +
        '<h3 class="role-title">' + esc(role.title) + "</h3>" +
        '<p class="role-org">' + esc(role.company) + " <i>·</i> " + esc(role.location) + "</p>" +
        "</div>" +
        '<p class="role-dates">' + esc(role.startDate) + "<br><span>" + esc(role.endDate) + "</span></p>" +
        "</div>" +
        '<ol class="duties">' + duties + "</ol>" +
        "</article>";
    }).join("");
  });

  /* ---------------------------------------------------------- */
  section("chronology chart", function () {
    var c = DATA.chronology || {};
    setText("chronoSubtitle", c.subtitle);

    var plot = byId("chronoPlot");
    if (!plot || !Array.isArray(c.entries) || !c.entries.length) return;

    var today = new Date();
    var todayDecimal = today.getFullYear() + today.getMonth() / 12;

    var parsed = c.entries.map(function (entry) {
      var start = parseMonth(entry.start);
      var ongoing = isPresent(entry.end);
      var end = ongoing ? { decimal: todayDecimal } : parseMonth(entry.end);
      return start && end ? { raw: entry, start: start, end: end, ongoing: ongoing } : null;
    }).filter(Boolean);

    if (!parsed.length) return;

    var startYear = Math.floor(Math.min.apply(null, parsed.map(function (p) { return p.start.decimal; })));
    var latestDecimal = Math.max.apply(null, parsed.map(function (p) { return p.end.decimal; }));
    var latestYear = Math.floor(latestDecimal);
    var endYear = latestYear + 1;
    var span = Math.max(endYear - startYear, 1);

    plot.style.setProperty("--year-w", (100 / span) + "%");

    function pct(decimal) { return ((decimal - startYear) / span) * 100; }

    var rowsHTML = parsed.map(function (p) {
      var x = pct(p.start.decimal);
      var w = Math.max(pct(p.end.decimal) - x, 0.6);
      var whenText = formatMonth(p.raw.start) + " — " + (p.ongoing ? "Present" : formatMonth(p.raw.end));
      var barClass = "bar bar--" + (p.raw.type === "work" ? "work" : "study") + (p.ongoing ? " bar--now" : "");
      return '<div class="chrono-row">' +
        '<p class="chrono-label">' + esc(p.raw.label) + "<span>" + esc(p.raw.place) + "</span></p>" +
        '<div class="chrono-track"><span class="' + barClass + '" style="--x:' + x.toFixed(1) + "%;--w:" + w.toFixed(1) + '%"></span></div>' +
        '<p class="chrono-when">' + whenText + "</p>" +
        "</div>";
    }).join("");

    var axisHTML = "";
    for (var y = startYear + 1; y <= latestYear; y++) {
      axisHTML += '<i style="--x:' + pct(y).toFixed(1) + '%">' + y + "</i>";
    }

    plot.innerHTML = rowsHTML + '<div class="chrono-axis" aria-hidden="true">' + axisHTML + "</div>";
  });

  /* ---------------------------------------------------------- */
  section("education", function () {
    var ed = DATA.education || {};
    setText("educationTitle", ed.navLabel);
    setText("educationTag", ed.sectionTag);

    var entriesBox = byId("educationEntries");
    if (entriesBox && Array.isArray(ed.entries)) {
      entriesBox.innerHTML = ed.entries.map(function (item, i) {
        return '<article class="entry rv" style="--d:' + i + '">' +
          '<p class="entry-when">' + esc(item.dateRange) + "</p>" +
          '<div class="entry-body">' +
          "<h3>" + esc(item.degree) + "</h3>" +
          '<p class="entry-org">' + esc(item.school) + " <i>·</i> " + esc(item.country) + "</p>" +
          "</div>" +
          '<p class="entry-flag">' + esc(item.flag) + "</p>" +
          "</article>";
      }).join("");
    }

    setText("credsLabel", ed.credentialsLabel);
    var credsBox = byId("credsGrid");
    if (credsBox && Array.isArray(ed.credentials)) {
      credsBox.innerHTML = ed.credentials.map(function (cr) {
        return '<div class="cred"><span class="seal" aria-hidden="true">✦</span>' +
          "<h4>" + esc(cr.name) + "</h4><p>" + esc(cr.detail) + "</p></div>";
      }).join("");
    }
  });

  /* ---------------------------------------------------------- */
  section("capabilities", function () {
    var cap = DATA.capabilities || {};
    setText("capabilitiesTitle", cap.navLabel);
    setText("capabilitiesTag", cap.sectionTag);
    setText("skillsLabel", cap.skillsLabel);
    setText("toolsLabel", cap.toolsLabel);

    var skillsBox = byId("skillsList");
    if (skillsBox && Array.isArray(cap.skills)) {
      skillsBox.innerHTML = cap.skills.map(function (s, i) {
        return "<li><b>" + String(i + 1).padStart(2, "0") + "</b><span>" + esc(s) + "</span></li>";
      }).join("");
    }

    var toolsBox = byId("toolsList");
    if (toolsBox && Array.isArray(cap.tools)) {
      toolsBox.innerHTML = cap.tools.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    }
  });

  /* ---------------------------------------------------------- */
  section("languages", function () {
    var lang = DATA.languages || {};
    setText("languagesTitle", lang.navLabel);
    setText("languagesTag", lang.sectionTag);

    var box = byId("languagesList");
    if (box && Array.isArray(lang.entries)) {
      box.innerHTML = lang.entries.map(function (item, i) {
        var score = Math.max(0, Math.min(5, Math.round(item.score)));
        var dots = "";
        for (var d = 0; d < 5; d++) dots += "<i" + (d < score ? ' class="on"' : "") + "></i>";
        var label = esc(item.name) + ": " + esc(item.level) + ", " + score + " of 5";
        return '<li class="lang rv" style="--d:' + i + '">' +
          "<h3>" + esc(item.name) + "</h3>" +
          '<p class="lang-level">' + esc(item.level) + "</p>" +
          '<div class="meter" role="img" aria-label="' + label + '">' + dots + "</div>" +
          "</li>";
      }).join("");
    }
  });

  /* ---------------------------------------------------------- */
  section("contact", function () {
    var c = DATA.contact || {};
    setText("contactTitle", c.navLabel);
    setText("contactTag", c.sectionTag);
    setText("contactKicker", c.kicker);

    var metaBox = byId("contactMeta");
    if (metaBox && Array.isArray(c.meta)) {
      metaBox.innerHTML = c.meta.map(function (m) {
        return "<div><dt>" + esc(m.label) + "</dt><dd>" + esc(m.value) + "</dd></div>";
      }).join("");
    }
  });

  /* ---------------------------------------------------------- */
  section("footer", function () {
    setText("footerName", (DATA.footer || {}).name);
  });
})();
