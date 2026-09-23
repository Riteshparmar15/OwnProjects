/* ============================================================
   XIANGRAS — store layout scripts
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.XIANGRAS_CONFIG || {};
  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Year */
  var yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Config links */
  function waLink(text) {
    var num = String(CFG.whatsapp || "91XXXXXXXXXX").replace(/\D/g, "");
    return "https://wa.me/" + num + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    if (key === "swiggy" && CFG.swiggy && CFG.swiggy !== "#") el.href = CFG.swiggy;
    if (key === "zomato" && CFG.zomato && CFG.zomato !== "#") el.href = CFG.zomato;
    if (key === "instagram" && CFG.instagram) el.href = CFG.instagram;
    if (key === "googleReviews" && CFG.googleReviews) el.href = CFG.googleReviews;
    if (key === "menuPdf" && CFG.menuPdf) el.href = CFG.menuPdf;
    if (key === "whatsapp") el.href = waLink();
    if (key === "phone" && CFG.phone) {
      el.href = "tel:" + CFG.phone;
      if ((el.textContent || "").indexOf("X") !== -1) el.textContent = CFG.phone;
    }
  });

  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    if (!a.getAttribute("data-wa-custom")) a.href = waLink();
  });

  /* Mobile cat nav toggle */
  var navToggle = document.getElementById("nav-toggle");
  var catNav = document.getElementById("cat-nav");
  function setNav(open) {
    if (!navToggle) return;
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  }
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
  }
  if (catNav) {
    catNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
  }

  /* Live open status IST 11–23 */
  function indiaNow() {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  }
  function pad(n) { return String(n).padStart(2, "0"); }

  function updateLive() {
    var now = indiaNow();
    var open = now.getHours() >= 11 && now.getHours() < 23;
    var clock = document.getElementById("live-clock");
    var status = document.getElementById("open-status-text");
    var loc = document.getElementById("location-open-label");
    if (clock) clock.textContent = pad(now.getHours()) + ":" + pad(now.getMinutes()) + " IST";
    if (status) status.textContent = open ? "OPEN NOW" : "CLOSED NOW";
    if (loc) {
      loc.textContent = open
        ? "● Kitchen open — order delivery or pickup"
        : "● Closed — opens daily at 11:00 AM";
      loc.style.color = open ? "#1f7a62" : "#ff5a3c";
    }
  }
  updateLive();
  setInterval(updateLive, 30000);

  /* Countdown to midnight IST */
  function updateCd() {
    var now = indiaNow();
    var end = new Date(now);
    end.setHours(23, 59, 59, 999);
    var diff = Math.max(0, end - now);
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var eh = document.getElementById("cd-h");
    var em = document.getElementById("cd-m");
    var es = document.getElementById("cd-s");
    if (eh) eh.textContent = pad(h);
    if (em) em.textContent = pad(m);
    if (es) es.textContent = pad(s);
  }
  updateCd();
  setInterval(updateCd, 1000);

  /* Hero carousel */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".carousel-slide"));
  var dotsWrap = document.getElementById("hero-dots");
  var heroIndex = 0;
  var heroTimer;

  function showSlide(i) {
    if (!slides.length) return;
    heroIndex = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) {
      var on = idx === heroIndex;
      s.classList.toggle("is-active", on);
      var content = s.querySelector(".slide-content");
      if (content) {
        content.classList.remove("is-in");
        if (on) {
          void content.offsetWidth;
          content.classList.add("is-in");
        }
      }
    });
    if (dotsWrap) {
      Array.prototype.forEach.call(dotsWrap.children, function (d, idx) {
        d.classList.toggle("is-active", idx === heroIndex);
      });
    }
    syncHeroFood(slides[heroIndex] && slides[heroIndex].getAttribute("data-food"));
  }

  function syncHeroFood(foodKey) {
    var cards = document.querySelectorAll(".food-card");
    if (!cards.length) return;
    cards.forEach(function (card) {
      var match = card.getAttribute("data-food") === foodKey;
      if (match) {
        card.classList.remove("is-exit");
        card.classList.add("is-active");
      } else if (card.classList.contains("is-active")) {
        card.classList.remove("is-active");
        card.classList.add("is-exit");
        setTimeout(function () { card.classList.remove("is-exit"); }, 700);
      } else {
        card.classList.remove("is-active", "is-exit");
      }
    });
    burstFoodSparks();
  }

  function burstFoodSparks() {
    if (prefersReduced) return;
    var wrap = document.getElementById("food-sparks");
    if (!wrap) return;
    for (var n = 0; n < 10; n++) {
      (function (i) {
        var spark = document.createElement("span");
        spark.className = "food-spark";
        var angle = (Math.PI * 2 * i) / 10;
        var dist = 48 + Math.random() * 70;
        spark.style.setProperty("--sx", Math.cos(angle) * dist + "px");
        spark.style.setProperty("--sy", Math.sin(angle) * dist + "px");
        spark.style.background = i % 2 ? "var(--color-accent)" : "var(--color-accent-hot)";
        wrap.appendChild(spark);
        setTimeout(function () {
          if (spark.parentNode) spark.parentNode.removeChild(spark);
        }, 950);
      })(n);
    }
  }

  if (dotsWrap && slides.length) {
    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Slide " + (i + 1));
      if (i === 0) b.className = "is-active";
      b.addEventListener("click", function () {
        showSlide(i);
        restartHero();
      });
      dotsWrap.appendChild(b);
    });
  }

  function restartHero() {
    if (prefersReduced) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(function () { showSlide(heroIndex + 1); }, 5500);
  }

  var prev = document.getElementById("hero-prev");
  var next = document.getElementById("hero-next");
  if (prev) prev.addEventListener("click", function () { showSlide(heroIndex - 1); restartHero(); });
  if (next) next.addEventListener("click", function () { showSlide(heroIndex + 1); restartHero(); });
  showSlide(0);
  restartHero();

  /* Scroll reveals */
  var revealNodes = document.querySelectorAll(
    ".section-head, .cat-card, .product-card, .promo-card, .promo-banner-inner, .delivery-box, .trust-item, .review-grid blockquote, .contact-grid > *"
  );
  revealNodes.forEach(function (el, i) {
    el.classList.add("reveal");
    if (i % 4 === 1) el.classList.add("reveal-delay-1");
    if (i % 4 === 2) el.classList.add("reveal-delay-2");
    if (i % 4 === 3) el.classList.add("reveal-delay-3");
  });
  if (!prefersReduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealNodes.forEach(function (el) { io.observe(el); });
  } else {
    revealNodes.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Product rail scroll */
  document.querySelectorAll(".rail-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = "rail-" + btn.getAttribute("data-rail");
      var track = document.getElementById(id);
      var dir = Number(btn.getAttribute("data-dir") || 1);
      if (track) track.scrollBy({ left: dir * 260, behavior: "smooth" });
    });
  });

  /* Category filter on bestsellers */
  var cards = document.querySelectorAll(".product-card");
  document.querySelectorAll(".pf").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".pf").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-pf") || "all";
      cards.forEach(function (c) {
        var cat = c.getAttribute("data-cat");
        c.classList.toggle("is-hidden", !(f === "all" || cat === f));
      });
      var empty = document.getElementById("search-empty");
      if (empty) empty.hidden = true;
    });
  });

  /* Header search */
  var searchForm = document.getElementById("header-search");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (document.getElementById("search-input").value || "").trim().toLowerCase();
      var visible = 0;
      cards.forEach(function (c) {
        var name = (c.getAttribute("data-name") || "").toLowerCase();
        var cat = (c.getAttribute("data-cat") || "").toLowerCase();
        var show = !q || name.indexOf(q) !== -1 || cat.indexOf(q) !== -1;
        c.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });
      document.querySelectorAll(".pf").forEach(function (b) { b.classList.remove("is-active"); });
      var allBtn = document.querySelector('.pf[data-pf="all"]');
      if (allBtn && !q) allBtn.classList.add("is-active");
      var empty = document.getElementById("search-empty");
      if (empty) empty.hidden = visible > 0;
      var rail = document.getElementById("bestsellers");
      if (rail) rail.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* Area check */
  var AREAS = ["gorwa", "fulwadi", "subhanpura", "akota", "alkapuri", "race course", "ellora", "fatehgunj", "nizampura", "sama", "vasna", "vadodara", "gotri"];
  var areaForm = document.getElementById("area-check");
  if (areaForm) {
    areaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("area-input");
      var result = document.getElementById("area-result");
      var q = (input.value || "").trim().toLowerCase();
      if (!q) {
        result.textContent = "Enter your area.";
        result.className = "area-result is-no";
        return;
      }
      var hit = AREAS.some(function (a) { return q.indexOf(a) !== -1 || a.indexOf(q) !== -1; });
      result.textContent = hit
        ? "Yes — we usually deliver to " + input.value.trim() + "."
        : "Not listed — WhatsApp your pin and we’ll confirm.";
      result.className = "area-result " + (hit ? "is-yes" : "is-no");
    });
  }

  /* Copy coupon */
  var copyBtn = document.getElementById("copy-coupon");
  var copied = document.getElementById("coupon-copied");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var code = copyBtn.getAttribute("data-code") || "XIANG10";
      function done() {
        if (copied) {
          copied.hidden = false;
          setTimeout(function () { copied.hidden = true; }, 2000);
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(done).catch(function () {
          window.prompt("Copy:", code);
          done();
        });
      } else {
        window.prompt("Copy:", code);
        done();
      }
    });
  }

  /* Contact form */
  function validPhone(v) {
    return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(String(v).replace(/[\s\-()]/g, ""));
  }
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name");
      var phone = document.getElementById("phone");
      var message = document.getElementById("message");
      var ok = true;
      ["name", "phone", "message"].forEach(function (id) {
        var err = document.getElementById(id + "-error");
        if (err) err.textContent = "";
      });
      if (!name.value.trim()) { document.getElementById("name-error").textContent = "Required"; ok = false; }
      if (!validPhone(phone.value)) { document.getElementById("phone-error").textContent = "Valid mobile"; ok = false; }
      if (!message.value.trim() || message.value.trim().length < 8) {
        document.getElementById("message-error").textContent = "Write a short message";
        ok = false;
      }
      if (!ok) return;
      document.getElementById("form-success").hidden = false;
      contactForm.reset();
    });
  }

  /* Lightbox */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-caption");
  var triggers = Array.prototype.slice.call(document.querySelectorAll(".lightbox-trigger"));
  var lbIndex = 0;

  function openLb(i) {
    if (!lightbox || !triggers.length) return;
    lbIndex = (i + triggers.length) % triggers.length;
    var t = triggers[lbIndex];
    lbImg.src = t.getAttribute("data-full") || t.querySelector("img").src;
    lbImg.alt = (t.querySelector("img") && t.querySelector("img").alt) || "";
    lbCap.textContent = t.getAttribute("data-caption") || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  }
  function closeLb() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    lbImg.src = "";
  }
  triggers.forEach(function (t, i) {
    t.addEventListener("click", function (e) { e.preventDefault(); openLb(i); });
  });
  var lbClose = document.getElementById("lightbox-close");
  var lbPrev = document.getElementById("lightbox-prev");
  var lbNext = document.getElementById("lightbox-next");
  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lbPrev) lbPrev.addEventListener("click", function () { openLb(lbIndex - 1); });
  if (lbNext) lbNext.addEventListener("click", function () { openLb(lbIndex + 1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openLb(lbIndex - 1);
    if (e.key === "ArrowRight") openLb(lbIndex + 1);
  });

  /* Order dock */
  var dock = document.getElementById("order-dock");
  function updateDock() {
    if (!dock) return;
    dock.classList.toggle("is-on", window.scrollY > 320);
  }
  updateDock();
  window.addEventListener("scroll", updateDock, { passive: true });

  /* Cookie */
  var banner = document.getElementById("cookie-banner");
  function consent(v) {
    try { localStorage.setItem("xiangras-cookie", v); } catch (e) {}
    if (banner) banner.hidden = true;
  }
  try {
    if (!localStorage.getItem("xiangras-cookie") && banner) banner.hidden = false;
  } catch (e) {}
  var acc = document.getElementById("cookie-accept");
  var dec = document.getElementById("cookie-decline");
  if (acc) acc.addEventListener("click", function () { consent("accepted"); });
  if (dec) dec.addEventListener("click", function () { consent("declined"); });

  /* Simple lang (nav labels in top bar only for now — keep EN default content) */
  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".lang-btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
    });
  });

  /* Theme color engine (script-driven CSS variables) */
  var THEME_ORDER = ["cinnabar", "jade", "saffron", "night"];
  var THEMES = {
    cinnabar: {
      bg: "#e7f1ec",
      "bg-elevated": "#fffdf8",
      "bg-soft": "#dceae3",
      surface: "#fffdf8",
      header: "#7a1024",
      footer: "#2a0b14",
      text: "#2a1418",
      "text-muted": "#5c3a40",
      "text-dim": "#7a5a58",
      ink: "#7a1024",
      cream: "#fff6e8",
      accent: "#f4c14a",
      "accent-hot": "#ff5a3c",
      "accent-deep": "#c98912",
      jade: "#1f7a62",
      lacquer: "#9b1b32",
      border: "rgba(122, 16, 36, 0.12)",
      "border-strong": "rgba(244, 193, 74, 0.55)",
      "hero-overlay-a": "rgba(42, 11, 20, 0.88)",
      "hero-overlay-b": "rgba(122, 16, 36, 0.45)",
      "hero-overlay-c": "rgba(31, 122, 98, 0.18)",
      "hero-overlay-d": "rgba(42, 11, 20, 0.85)",
      meta: "#7a1024"
    },
    jade: {
      bg: "#e8f5f1",
      "bg-elevated": "#f7fffc",
      "bg-soft": "#d5ebe4",
      surface: "#f7fffc",
      header: "#0f5c4c",
      footer: "#062821",
      text: "#12332c",
      "text-muted": "#3d5f56",
      "text-dim": "#5f7f76",
      ink: "#0f5c4c",
      cream: "#effff8",
      accent: "#f0c75e",
      "accent-hot": "#e4572e",
      "accent-deep": "#c9a227",
      jade: "#1f7a62",
      lacquer: "#147a66",
      border: "rgba(15, 92, 76, 0.14)",
      "border-strong": "rgba(240, 199, 94, 0.55)",
      "hero-overlay-a": "rgba(6, 40, 33, 0.9)",
      "hero-overlay-b": "rgba(15, 92, 76, 0.5)",
      "hero-overlay-c": "rgba(240, 199, 94, 0.2)",
      "hero-overlay-d": "rgba(6, 40, 33, 0.86)",
      meta: "#0f5c4c"
    },
    saffron: {
      bg: "#fff4e8",
      "bg-elevated": "#fffaf3",
      "bg-soft": "#ffe8cc",
      surface: "#fffaf3",
      header: "#b33b0d",
      footer: "#4a1808",
      text: "#3a1a0c",
      "text-muted": "#7a4a2e",
      "text-dim": "#9a6a48",
      ink: "#b33b0d",
      cream: "#fff7eb",
      accent: "#ffc14a",
      "accent-hot": "#ff5a2a",
      "accent-deep": "#d98a10",
      jade: "#2a7a58",
      lacquer: "#d35400",
      border: "rgba(179, 59, 13, 0.14)",
      "border-strong": "rgba(255, 193, 74, 0.55)",
      "hero-overlay-a": "rgba(74, 24, 8, 0.9)",
      "hero-overlay-b": "rgba(179, 59, 13, 0.5)",
      "hero-overlay-c": "rgba(255, 193, 74, 0.22)",
      "hero-overlay-d": "rgba(74, 24, 8, 0.86)",
      meta: "#b33b0d"
    },
    night: {
      bg: "#121820",
      "bg-elevated": "#1a2330",
      "bg-soft": "#222c3a",
      surface: "#1a2330",
      header: "#0d1218",
      footer: "#080b10",
      text: "#e8eef6",
      "text-muted": "#a7b4c6",
      "text-dim": "#7e8ea3",
      ink: "#7dd3c0",
      cream: "#eef6ff",
      accent: "#f4c14a",
      "accent-hot": "#ff6b57",
      "accent-deep": "#e0b03a",
      jade: "#7dd3c0",
      lacquer: "#3d6b8c",
      border: "rgba(125, 211, 192, 0.16)",
      "border-strong": "rgba(244, 193, 74, 0.45)",
      "hero-overlay-a": "rgba(8, 11, 16, 0.92)",
      "hero-overlay-b": "rgba(26, 35, 48, 0.55)",
      "hero-overlay-c": "rgba(125, 211, 192, 0.18)",
      "hero-overlay-d": "rgba(8, 11, 16, 0.88)",
      meta: "#0d1218"
    }
  };

  var themeTimer = null;
  var currentTheme = "cinnabar";

  function applyTheme(name, opts) {
    opts = opts || {};
    if (!THEMES[name]) name = "cinnabar";
    currentTheme = name;
    var theme = THEMES[name];
    var root = document.documentElement;
    root.setAttribute("data-theme", name);
    Object.keys(theme).forEach(function (key) {
      if (key === "meta") return;
      if (key.indexOf("hero-") === 0) {
        root.style.setProperty("--" + key, theme[key]);
      } else {
        root.style.setProperty("--color-" + key, theme[key]);
      }
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme.meta);
    document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-theme-pick") === name);
    });
    if (!opts.skipStore) {
      try { localStorage.setItem("xiangras-theme", name); } catch (e) {}
    }
  }

  function setThemeCycle(on) {
    document.querySelectorAll("[data-theme-cycle], #theme-cycle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(!!on));
    });
    clearInterval(themeTimer);
    themeTimer = null;
    try { localStorage.setItem("xiangras-theme-cycle", on ? "1" : "0"); } catch (e) {}
    if (!on || prefersReduced) return;
    themeTimer = setInterval(function () {
      var idx = THEME_ORDER.indexOf(currentTheme);
      applyTheme(THEME_ORDER[(idx + 1) % THEME_ORDER.length]);
    }, 7000);
  }

  document.querySelectorAll("[data-theme-pick]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-theme-pick"));
      setThemeCycle(false);
    });
  });
  document.querySelectorAll("[data-theme-cycle], #theme-cycle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("aria-pressed") !== "true";
      setThemeCycle(next);
    });
  });

  try {
    applyTheme(localStorage.getItem("xiangras-theme") || "cinnabar", { skipStore: true });
    if (localStorage.getItem("xiangras-theme-cycle") === "1") setThemeCycle(true);
  } catch (e) {
    applyTheme("cinnabar", { skipStore: true });
  }

  /* PWA */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function () {});
    });
  }
})();
