/**
 * MSICCA Partials Loader
 * Loads shared header and footer components into pages
 */

(function () {
  "use strict";

  /**
   * Load a partial HTML file and inject it into a target element
   * @param {string} url - URL of the partial HTML file
   * @param {string} targetSelector - CSS selector for the target element
   */
  async function loadPartial(url, targetSelector) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to load partial: ${url}`);
        return;
      }
      const html = await response.text();
      const target = document.querySelector(targetSelector);
      if (target) {
        target.outerHTML = html;
      }
    } catch (error) {
      console.error(`Error loading partial ${url}:`, error);
    }
  }

  /**
   * Normalize path: leading slash, no trailing slash (except "/").
   */
  function normalizePath(pathname) {
    if (!pathname) return "/";
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
    if (path === "/") return path;
    return path.endsWith("/") ? path.slice(0, -1) : path;
  }

  /**
   * Configure language toggle links based on current path.
   */
  function configureLanguage(lang) {
    const selector = document.querySelector(".lang-selector");
    if (!selector) return;

    const links = Array.from(selector.querySelectorAll("a"));
    if (links.length < 2) return;

    const normalizedPath = normalizePath(window.location.pathname);

    const langSwitchMap = {
      es: {
        "/": "/en/",
        "/index.html": "/en/",
        "/nosotros.html": "/en/about.html",
        "/servicios.html": "/en/capabilities.html",
        "/proyectos.html": "/en/deployments.html",
        "/contacto.html": "/en/contact.html",
        "/testimonios.html": "/en/testimonials.html",
      },
      en: {
        "/en/": "/",
        "/en/index.html": "/",
        "/en/about.html": "/nosotros.html",
        "/en/capabilities.html": "/servicios.html",
        "/en/services.html": "/servicios.html",
        "/en/deployments.html": "/proyectos.html",
        "/en/contact.html": "/contacto.html",
        "/en/testimonials.html": "/testimonios.html",
      },
    };

    const map = langSwitchMap[lang];
    const targetHref = map[normalizedPath];

    // Maintain active state on current language link
    const activeIndex = lang === "es" ? 0 : 1;
    links.forEach((link, index) => {
      link.classList.toggle("active", index === activeIndex);
    });

    // Update counterpart link if mapping exists
    if (targetHref) {
      const counterpart = lang === "es" ? links[1] : links[0];
      counterpart.setAttribute("href", targetHref);
    }
  }

  /**
   * Mark current nav item as active based on path.
   */
  function setActiveNav() {
    const normalizedPath = normalizePath(window.location.pathname);

    document.querySelectorAll(".nav-desktop .nav-menu a").forEach((link) => {
      const linkPath = normalizePath(
        new URL(link.getAttribute("href"), window.location.origin).pathname
      );

      const isRootMatch =
        normalizedPath === "/" &&
        (linkPath === "/" || linkPath === "/index.html");
      const isMatch = linkPath === normalizedPath || isRootMatch;

      link.classList.toggle("active", isMatch);
    });
  }

  /**
   * Detect language from page path and load appropriate partials
   */
  function loadPartials() {
    const isEnglish = window.location.pathname.startsWith("/en/");
    const lang = isEnglish ? "en" : "es";

    const tasks = [];

    // Load header
    const headerPlaceholder = document.querySelector("header.header");
    if (headerPlaceholder) {
      tasks.push(
        loadPartial(`/assets/partials/header-${lang}.html`, "header.header")
      );
    }

    // Load footer
    const footerPlaceholder = document.querySelector("footer.footer");
    if (footerPlaceholder) {
      tasks.push(
        loadPartial(`/assets/partials/footer-${lang}.html`, "footer.footer")
      );
    }

    Promise.all(tasks)
      .then(() => {
        configureLanguage(lang);
        setActiveNav();
      })
      .finally(() => {
        document.dispatchEvent(new Event("partials:loaded"));
      });
  }

  // Load partials when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPartials);
  } else {
    loadPartials();
  }
})();
