/* ============================================================
   AVE MARIA (The Second Wind) — front-end
   Restrained motion: reveal-on-scroll, nav state, world tint.
   ============================================================ */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* nav: solid on scroll */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  const burger = $("#burger");
  const links = $("#navLinks");
  burger.addEventListener("click", () => links.classList.toggle("is-open"));
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => links.classList.remove("is-open")));

  /* year */
  $("#year").textContent = new Date().getFullYear();

  /* reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* world tint: as a [data-world] section dominates the viewport,
     mirror its world onto <body> so global accents (ember) shift subtly */
  const worldSections = $$("[data-world]").filter((el) => el !== document.body);
  if (worldSections.length) {
    const wio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.5) {
          document.body.setAttribute("data-world", e.target.getAttribute("data-world"));
        }
      });
    }, { threshold: [0.5, 0.75] });
    worldSections.forEach((s) => wio.observe(s));
  }

  /* very subtle parallax on scene/quote backgrounds (desktop, motion-ok) */
  if (!reduce && window.matchMedia("(pointer:fine)").matches) {
    const layers = $$(".scene__bg, .quote__bg");
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        layers.forEach((l) => {
          const r = l.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const offset = ((r.top + r.height / 2) - vh / 2) / vh; // -1..1
          l.style.setProperty("--py", (offset * 14).toFixed(1) + "px");
          l.style.translate = "0 var(--py)";
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* contact form: Netlify handles POST in production. Locally (file:// or
     plain server) there's no handler, so we intercept, show a thank-you,
     and offer the mailto fallback so nothing feels broken. */
  const form = $(".form");
  if (form) {
    const isNetlify = /netlify\.app$/.test(location.hostname) || location.hostname.endsWith(".netlify.app");
    form.addEventListener("submit", (e) => {
      // Let Netlify-hosted submissions go through natively.
      if (isNetlify) return;
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString();
      const subject = encodeURIComponent("AVE MARIA — deck request" + (name ? ` (${name})` : ""));
      const body = encodeURIComponent(
        `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\nCompany/role: ${data.get("company") || ""}\n\n${data.get("message") || ""}`
      );
      const note = document.createElement("p");
      note.className = "form__alt";
      note.style.color = "var(--ember-2)";
      note.textContent = "Thank you — opening your email to send the request…";
      form.appendChild(note);
      window.location.href = `mailto:loumcastro@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
