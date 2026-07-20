(function () {
  "use strict";

  /* Mobile navigation toggle */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* Adapt ENTWURF watermark contrast over dark sections */
  var darkSections = document.querySelectorAll('[data-theme="dark"]');
  if ("IntersectionObserver" in window && darkSections.length) {
    var activeDarkCount = 0;
    var themeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activeDarkCount++;
          } else {
            activeDarkCount = Math.max(0, activeDarkCount - 1);
          }
        });
        document.body.classList.toggle("theme-dark-watermark", activeDarkCount > 0);
      },
      { threshold: 0.35 }
    );
    darkSections.forEach(function (el) { themeObserver.observe(el); });
  }

  /* Contact form — no backend on GitHub Pages, confirm locally */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var nameField = document.getElementById("name");
      var firstName = nameField && nameField.value ? nameField.value.trim().split(" ")[0] : "";
      note.textContent = firstName
        ? "Danke, " + firstName + "! Dies ist ein Designentwurf — im finalen Auftritt geht Ihre Nachricht hier direkt an uns."
        : "Danke für Ihre Nachricht! Dies ist ein Designentwurf — im finalen Auftritt geht sie hier direkt an uns.";
      form.reset();
    });
  }
})();
