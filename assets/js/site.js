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

  // Schedule non-critical work when the main thread is idle
  function scheduleIdle(fn) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(fn, { timeout: 200 });
    } else {
      setTimeout(fn, 0);
    }
  }

  // Lazy-load Google Tag Manager after idle or first interaction (production only)
  function initAnalytics() {
    const host = location.hostname || "";
    const isProd =
      /(^|\.)msicca\.com$/i.test(host) ||
      /(^|\.)msicca-web\.netlify\.app$/i.test(host);
    if (!isProd && !window.__ENABLE_GTM) return;

    let loaded = false;
    function loadGTM() {
      if (loaded) return;
      loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtm.js?id=GTM-P8HPBXR5";
      const ref =
        document.getElementsByTagName("script")[0] || document.head.firstChild;
      (ref?.parentNode || document.head).insertBefore(s, ref || null);
    }

    // Load when idle, or on first user interaction if earlier
    scheduleIdle(loadGTM);
    window.addEventListener("pointerdown", loadGTM, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", loadGTM, { once: true });
  }

  // Header scroll behavior - transparent to opaque
  function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    let lastKnownScrollY = window.scrollY;
    let ticking = false;
    let headerIsScrolled = header.classList.contains("scrolled");

    function applyHeaderState() {
      ticking = false;
      const nextState = lastKnownScrollY > 10;
      if (nextState === headerIsScrolled) return; // Avoid unnecessary DOM writes
      headerIsScrolled = nextState;
      header.classList.toggle("scrolled", headerIsScrolled);
    }

    function onScroll() {
      lastKnownScrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyHeaderState);
      }
    }

    // Initial check on next frame to avoid sync layout
    requestAnimationFrame(applyHeaderState);

    // Listen to scroll events (throttled via rAF to avoid repeated reflows)
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Hero slideshow functionality with content changes
  function initHeroSlideshow() {
    const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
    const slideContents = Array.from(
      document.querySelectorAll(".slide-content")
    );

    if (heroSlides.length <= 1) return; // No slideshow needed

    let currentSlideIndex = 0;
    let activeSlide = heroSlides[0] || null;
    let activeContent = slideContents[0] || null;
    const slideInterval = 5000; // 5 seconds per slide

    // Ensure only the first slide is active on init
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === 0);
    });
    slideContents.forEach((content, i) => {
      content.classList.toggle("active", i === 0);
    });

    function showSlide(nextIndex) {
      const normalizedIndex = nextIndex % heroSlides.length;
      if (normalizedIndex === currentSlideIndex) return; // Skip redundant state changes

      if (activeSlide) activeSlide.classList.remove("active");
      if (activeContent) activeContent.classList.remove("active");

      currentSlideIndex = normalizedIndex;
      activeSlide = heroSlides[currentSlideIndex] || null;
      activeContent = slideContents[currentSlideIndex] || null;

      if (activeSlide) activeSlide.classList.add("active");
      if (activeContent) activeContent.classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlideIndex + 1);
    }

    // Auto-advance slides, schedule updates in rAF to avoid layout thrash
    setInterval(() => {
      requestAnimationFrame(nextSlide);
    }, slideInterval);
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
          target.scrollIntoView({ behavior: "smooth", block: "start" });
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
      "/cv/angel-rojas.html": "/en/cv/angel-rojas.html",
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
      "/en/cv/angel-rojas.html": "/cv/angel-rojas.html",
    },
  };

  // Highlight current nav item and wire language toggles to the paired page
  function initNavState() {
    // Defer DOM writes to the next frame to avoid forcing layout during load
    requestAnimationFrame(() => {
      const currentPath = normalizePath(window.location.pathname);
      const isEnglish = currentPath.startsWith("/en/");

      // Active state on nav menu
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        const hrefPath = normalizePath(
          new URL(link.getAttribute("href"), window.location.origin).pathname
        );
        const isActive = hrefPath === currentPath;
        if (link.classList.contains("active") !== isActive) {
          link.classList.toggle("active", isActive);
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
    });
  }

  function initAll() {
    if (initialized || !domReady || !partialsReady) return;
    initialized = true;
    initNavState();

    // Defer everything else to idle to avoid layout work on load
    scheduleIdle(() => {
      initHeaderScroll();
      initSmoothScroll();
      initMobileMenu();
      initHeroSlideshow();
      initScrollAnimations();
      initPageTransitions();
      initAnalytics();
    });
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
