/**
 * MSICCA Site JavaScript
 * Shared functionality for header, hero slideshow, smooth scrolling, and animations
 *
 * COMPONENT RESPONSIBILITIES:
 * - initHeaderScroll(): Handles header transparency on scroll
 * - initHeroSlideshow(): Auto-advances hero slideshow on home pages (5s interval)
 * - initSmoothScroll(): Smooth scroll for anchor links with header offset
 * - initScrollAnimations(): Fade-in animations for sections using IntersectionObserver
 * - initPageTransitions(): Fade effect on navigation (optional)
 * - initMobileMenu(): Mobile menu toggle (placeholder)
 *
 * ANIMATION CONVENTIONS:
 * - First section is immediately visible (.initial-visible class)
 * - Subsequent sections fade in when scrolled into view (.animate-in class)
 * - No inline styles are injected to avoid layout shifts
 * - All animations use CSS transitions defined in site.css
 */

(function () {
  "use strict";

  // Track readiness so we init after partials replace header/footer
  let domReady = document.readyState !== "loading";
  let partialsReady = false;
  let initialized = false;

  // Header scroll behavior - transparent to opaque
  function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    function updateHeader() {
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Initial check
    updateHeader();

    // Listen to scroll events
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // Hero slideshow functionality with content changes
  function initHeroSlideshow() {
    const heroSlides = document.querySelectorAll(".hero-slide");
    const slideContents = document.querySelectorAll(".slide-content");

    if (heroSlides.length <= 1) return; // No slideshow needed

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    function showSlide(index) {
      // Hide all slides and content
      heroSlides.forEach((slide, i) => {
        slide.classList.remove("active");
      });

      slideContents.forEach((content, i) => {
        content.classList.remove("active");
      });

      // Show current slide and content
      if (heroSlides[index]) {
        heroSlides[index].classList.add("active");
      }

      if (slideContents[index]) {
        slideContents[index].classList.add("active");
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }

    // Show first slide
    showSlide(0);

    // Auto-advance slides
    setInterval(nextSlide, slideInterval);
  }

  // Smooth scroll for anchor links with offset for header
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Intersection Observer for fade-in animations on scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections only (not individual cards to avoid janky animations)
    document.querySelectorAll(".section").forEach((section, index) => {
      // First section should be visible immediately
      if (index === 0) {
        section.classList.add("initial-visible");
      } else if (!section.classList.contains("animate-in")) {
        observer.observe(section);
      }
    });
  }

  // Page transition effect
  function initPageTransitions() {
    // Fade out on link click
    document
      .querySelectorAll('a:not([href^="#"]):not([target="_blank"])')
      .forEach((link) => {
        link.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (
            href &&
            href !== "#" &&
            !href.startsWith("mailto:") &&
            !href.startsWith("tel:")
          ) {
            e.preventDefault();
            document.body.style.opacity = "0";
            document.body.style.transition = "opacity 0.3s ease-out";
            setTimeout(() => {
              window.location.href = href;
            }, 300);
          }
        });
      });
  }

  // Mobile menu toggle (basic implementation)
  function initMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", function () {
        // TODO: Implement full mobile menu with slide-out navigation
        // For now, log to console instead of alert
        console.log("Mobile menu clicked - implementation pending");
        // Temporary: Show desktop nav items in a simple way
        const navDesktop = document.querySelector(".nav-desktop");
        if (navDesktop) {
          navDesktop.style.display =
            navDesktop.style.display === "flex" ? "none" : "flex";
        }
      });
    }
  }

  // Normalize pathnames so /en and /en/ resolve consistently
  function normalizePath(pathname) {
    if (!pathname) return "/";
    let path = pathname.toLowerCase();
    if (path === "/en") path = "/en/";
    if (path !== "/" && !path.endsWith(".html") && !path.endsWith("/")) {
      path = `${path}/`;
    }
    return path;
  }

  // Map ES<->EN equivalents for language switching
  const languageMap = {
    es: {
      "/": "/en/",
      "/index.html": "/en/",
      "/nosotros.html": "/en/about.html",
      "/servicios.html": "/en/capabilities.html",
      "/proyectos.html": "/en/deployments.html",
      "/testimonios.html": "/en/",
      "/contacto.html": "/en/contact.html",
      // CV pages
      "/cv/enrique-marval.html": "/en/cv/enrique-marval.html",
      "/cv/carlos-marval.html": "/en/cv/carlos-marval.html",
      "/cv/maria-urdaneta.html": "/en/cv/maria-urdaneta.html",
    },
    en: {
      "/en/": "/",
      "/en/index.html": "/",
      "/en/about.html": "/nosotros.html",
      "/en/capabilities.html": "/servicios.html",
      "/en/deployments.html": "/proyectos.html",
      "/en/contact.html": "/contacto.html",
      // CV pages
      "/en/cv/enrique-marval.html": "/cv/enrique-marval.html",
      "/en/cv/carlos-marval.html": "/cv/carlos-marval.html",
      "/en/cv/maria-urdaneta.html": "/cv/maria-urdaneta.html",
    },
  };

  // Highlight current nav item and wire language toggles to the paired page
  function initNavState() {
    const currentPath = normalizePath(window.location.pathname);
    const isEnglish = currentPath.startsWith("/en/");

    // Active state on nav menu
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      const hrefPath = normalizePath(
        new URL(link.getAttribute("href"), window.location.origin).pathname
      );
      if (hrefPath === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Language toggle targets
    const englishTarget = isEnglish
      ? currentPath
      : languageMap.es[currentPath] || "/en/";
    const spanishTarget = isEnglish
      ? languageMap.en[currentPath] || "/"
      : currentPath;

    document.querySelectorAll(".lang-selector a").forEach((link) => {
      const label = (link.textContent || "").trim().toUpperCase();
      if (label === "ES") {
        link.href = spanishTarget;
        link.classList.toggle("active", !isEnglish);
      } else if (label === "EN") {
        link.href = englishTarget;
        link.classList.toggle("active", isEnglish);
      }
    });
  }

  function initAll() {
    if (initialized || !domReady || !partialsReady) return;
    initialized = true;
    initNavState();
    initHeaderScroll();
    initHeroSlideshow();
    initSmoothScroll();
    initScrollAnimations();
    initPageTransitions();
    initMobileMenu();
  }

  document.addEventListener("DOMContentLoaded", function () {
    domReady = true;
    initAll();
  });

  document.addEventListener("partials:loaded", function () {
    partialsReady = true;
    initAll();
  });

  // In case partials load instantly and DOM was already ready
  if (domReady) {
    initAll();
  }
})();
