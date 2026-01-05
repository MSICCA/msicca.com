/**
 * MSICCA Site JavaScript
 * Shared functionality for header, hero slideshow, smooth scrolling, and animations
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

  // Hero slideshow functionality with content changes
  function initHeroSlideshow() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const slideContents = document.querySelectorAll('.slide-content');
    
    if (heroSlides.length <= 1) return; // No slideshow needed

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    function showSlide(index) {
      // Hide all slides and content
      heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
      });
      
      slideContents.forEach((content, i) => {
        content.classList.remove('active');
      });

      // Show current slide and content
      if (heroSlides[index]) {
        heroSlides[index].classList.add('active');
      }
      
      if (slideContents[index]) {
        slideContents[index].classList.add('active');
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Intersection Observer for fade-in animations on scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections only (not individual cards to avoid janky animations)
    document.querySelectorAll('.section').forEach((section, index) => {
      // First section should be visible immediately
      if (index === 0) {
        section.classList.add('initial-visible');
      } else if (!section.classList.contains('animate-in')) {
        observer.observe(section);
      }
    });
  }

  // Page transition effect
  function initPageTransitions() {
    // Fade out on link click
    document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          e.preventDefault();
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.3s ease-out';
          setTimeout(() => {
            window.location.href = href;
          }, 300);
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
      initScrollAnimations();
      initPageTransitions();
      initMobileMenu();
    });
  } else {
    // DOM already loaded
    initHeaderScroll();
    initHeroSlideshow();
    initSmoothScroll();
    initScrollAnimations();
    initPageTransitions();
    initMobileMenu();
  }
})();
