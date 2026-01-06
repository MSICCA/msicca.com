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

    Promise.all(tasks).finally(() => {
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
