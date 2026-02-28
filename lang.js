document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------
  // Smooth scrolling for anchor links
  // ------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const headerOffset = 100; // Adjust for fixed header height
      if (targetElement) {
        // Check if targetElement exists
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ------------------------------------------
  // Update year in footer
  // ------------------------------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ------------------------------------------
  // Header scroll effect
  // ------------------------------------------
  const header = document.querySelector(".topbar");
  if (header) {
    const headerHeight = header.offsetHeight;
    window.addEventListener("scroll", () => {
      if (window.scrollY > headerHeight) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ------------------------------------------
  // Reveal animations on scroll
  // ------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");

  const handleReveal = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        // Adjust 100px for earlier trigger
        el.classList.add("is-visible");
      } else {
        // Optional: remove is-visible when out of view for re-animation on scroll up
        // el.classList.remove('is-visible');
      }
    });
  };

  // Initial check on load
  handleReveal();

  // Check on scroll
  window.addEventListener("scroll", handleReveal);
  window.addEventListener("resize", handleReveal); // Also check on resize

  // ------------------------------------------
  // Parallax effect (if used for sections)
  // ------------------------------------------
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  const handleParallax = () => {
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.speed);
      // Adjust this calculation based on where the element is relative to the viewport
      // A common approach is to calculate based on its position relative to the center of the viewport
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceToCenter = viewportCenter - elementCenter;

      el.style.transform = `translateY(${distanceToCenter * speed * -1}px)`;
    });
  };

  // Initial check on load
  handleParallax();

  // Check on scroll and resize
  window.addEventListener("scroll", handleParallax);
  window.addEventListener("resize", handleParallax);


  // ------------------------------------------
  // Language Switcher
  // ------------------------------------------
  const langToggleBtn = document.getElementById("lang-toggle");
  const htmlElement = document.documentElement; // The <html> tag

  // Function to apply language
  const setLanguage = (lang) => {
    htmlElement.lang = lang;
    htmlElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("preferredLang", lang);

    // Update texts
    document.querySelectorAll("[data-en], [data-ar]").forEach((el) => {
      // Prioritize `textContent` for general translation
      // If the element has children (like <span> for text inside a btn),
      // we need to find the specific text node or a span wrapping the text.
      if (el.children.length > 0) {
        // If it's a btn, look for a span inside it that holds the main text
        const textSpan = el.querySelector("span:not(.btn__shine)");
        if (textSpan) {
          textSpan.innerHTML = el.dataset[lang] || el.dataset.en; // Use innerHTML to preserve nested tags like <strong>
        } else {
          // For other elements that might have children, but their main text is direct
          // This is a complex case, and often for clean HTML structure, text should be in a span
          // For now, if no textSpan, fallback to el.innerHTML, but be cautious with HTML injection
          el.innerHTML = el.dataset[lang] || el.dataset.en;
        }
      } else {
        el.textContent = el.dataset[lang] || el.dataset.en;
      }

      // Update meta tags dynamically
      if (el.tagName === "META") {
        if (
          el.getAttribute("name") === "description" ||
          el.getAttribute("name") === "title" ||
          el.getAttribute("property") === "og:description" ||
          el.getAttribute("property") === "og:title" ||
          el.getAttribute("property") === "twitter:description" ||
          el.getAttribute("property") === "twitter:title"
        ) {
          el.setAttribute("content", el.dataset[lang] || el.dataset.en);
        }
      }
      if (el.tagName === "TITLE") {
        document.title = el.dataset[lang] || el.dataset.en;
      }
    });

    // Update lang toggle button text
    if (langToggleBtn) {
      langToggleBtn.querySelector(".lang-text").textContent =
        lang === "ar" ? "EN" : "AR";
    }
  };

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const currentLang = htmlElement.lang;
      const newLang = currentLang === "en" ? "ar" : "en";

      localStorage.setItem("preferredLang", newLang);

      location.reload(); // يعمل فريش للصفحة
    });
  }

  // Set initial language based on localStorage or browser default
  const savedLang = localStorage.getItem("preferredLang");
  const browserLang = navigator.language.startsWith("ar") ? "ar" : "en";
  setLanguage(savedLang || browserLang);

  // ------------------------------------------
  // Particle background (if bg canvas is used)
  // ------------------------------------------

});
