/**
 * MSICCA Site JavaScript
 * Shared functionality for header, hero slideshow, and smooth scrolling
 */

(function() {
  'use strict';

  // Header scroll behavior - transparent to opaque
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    function updateHeader() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Initial check
    updateHeader();

    // Listen to scroll events
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // Hero slideshow functionality
  function initHeroSlideshow() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length <= 1) return; // No slideshow needed

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    function showSlide(index) {
      heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
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

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Mobile menu toggle (basic implementation)
  function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        // TODO: Implement full mobile menu
        alert('Menú móvil: implementación pendiente para producción');
      });
    }
  }

  // Initialize all functions when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initHeaderScroll();
      initHeroSlideshow();
      initSmoothScroll();
      initMobileMenu();
    });
  } else {
    // DOM already loaded
    initHeaderScroll();
    initHeroSlideshow();
    initSmoothScroll();
    initMobileMenu();
  }
})();
