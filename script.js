/* ─────────────────────────────────────────────────────────────
   Nafeea Nafeea — portfolio behaviour
   No dependencies. Everything degrades gracefully without JS.
   ───────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. Theme: paper ⇄ film ─────────────────────────────── */
  var STORE = "nn-theme";
  var toggle = document.getElementById("themeToggle");

  function applyTheme(name) {
    root.setAttribute("data-theme", name);
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(name === "film"));
      toggle.setAttribute("aria-label", name === "film" ? "Switch to paper theme" : "Switch to film theme");
    }
  }

  var saved = null;
  try { saved = localStorage.getItem(STORE); } catch (e) { /* private mode */ }
  applyTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "film" : "paper"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "film" ? "paper" : "film";
      applyTheme(next);
      try { localStorage.setItem(STORE, next); } catch (e) { /* ignore */ }
    });
  }

  /* ── 2. Clocks: cities & time zones come from content.js, rendered
     into [data-clock-tz] elements by render.js ─────────────────── */
  var clocks = Array.prototype.map.call(document.querySelectorAll("[data-clock-tz]"), function (node) {
    return { el: node, tz: node.getAttribute("data-clock-tz") };
  });

  function tick() {
    var now = new Date();
    clocks.forEach(function (c) {
      try {
        c.el.textContent = new Intl.DateTimeFormat("en-GB", {
          timeZone: c.tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        }).format(now);
      } catch (e) {
        c.el.textContent = "--:--:--";
      }
    });
  }
  if (clocks.length) { tick(); setInterval(tick, 1000); }

  /* ── 3. Stagger indices for the chart marks ─────────────── */
  document.querySelectorAll(".chrono-row .bar").forEach(function (bar, i) {
    bar.style.setProperty("--i", i);
  });
  document.querySelectorAll(".meter").forEach(function (meter) {
    Array.prototype.forEach.call(meter.children, function (seg, i) {
      seg.style.setProperty("--s", i);
    });
  });

  /* ── 4. Scroll reveals ──────────────────────────────────── */
  var reveals = document.querySelectorAll("main .rv, .band .rv");

  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

    reveals.forEach(function (el) { revealer.observe(el); });
  }

  /* ── 5. Scroll progress + section highlighting ──────────── */
  var progress = document.getElementById("progress");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      }

      var line = window.innerHeight * 0.35;
      var current = -1;
      sections.forEach(function (sec, i) {
        if (sec.getBoundingClientRect().top <= line) current = i;
      });
      links.forEach(function (a, i) { a.classList.toggle("active", i === current); });

      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ── 6. Copy email — address comes from content.js ───────── */
  var ADDRESS = (window.SITE_CONTENT && window.SITE_CONTENT.hero && window.SITE_CONTENT.hero.email) || "";
  var copyBtn = document.getElementById("copyMail");
  var copyLabel = document.getElementById("copyLabel");

  function flash(text) {
    if (!copyLabel) return;
    copyLabel.textContent = text;
    setTimeout(function () { copyLabel.textContent = "Copy address"; }, 1800);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ADDRESS)
          .then(function () { flash("Copied ✓"); })
          .catch(function () { flash(ADDRESS); });
      } else {
        flash(ADDRESS);
      }
    });
  }

  /* ── 7. Colophon year ───────────────────────────────────── */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
