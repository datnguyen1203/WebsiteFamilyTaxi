/**
 * TAXI GIA ĐÌNH — script.js
 * Vanilla JavaScript ES6+ — No dependencies
 *
 * Sections:
 *  00. CONFIGURATION
 *  01. DOM READY INIT
 *  02. LUCIDE ICONS INIT
 *  03. MOBILE NAVIGATION
 *  04. STICKY HEADER
 *  05. SMOOTH SCROLLING
 *  06. ACTIVE NAV HIGHLIGHT
 *  07. SCROLL REVEAL ANIMATION
 *  08. IMAGE LIGHTBOX
 *  09. BACK TO TOP BUTTON
 *  10. DYNAMIC YEAR (FOOTER)
 *  11. CALL & ZALO CTAs
 */

/* =================================================================
   00. CONFIGURATION — Edit all brand info here
================================================================= */
const TAXI_CONFIG = {
  brandName:    'Taxi Gia Đình',
  phone:        '0900000000',         // Thay bằng số điện thoại thật
  phoneDisplay: '0900.000.000',       // Định dạng hiển thị
  zaloUrl:      'https://zalo.me/0900000000', // Thay bằng URL Zalo thật
  workingHours: '[Chưa cập nhật – ví dụ: 05:00 – 23:00 hàng ngày]',
  serviceAreas: ['TP.HCM', 'Bình Dương', 'Bà Rịa – Vũng Tàu'],
};

/* =================================================================
   01. DOM READY INIT
================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initMobileNav();
  initStickyHeader();
  initSmoothScrolling();
  initActiveNav();
  initScrollReveal();
  initLightbox();
  initBackToTop();
  initDynamicYear();
  applyConfig();
});

/* =================================================================
   02. LUCIDE ICONS INIT
================================================================= */
function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    // Retry after the deferred script loads
    window.addEventListener('load', () => {
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }
}

/* =================================================================
   03. MOBILE NAVIGATION
================================================================= */
function initMobileNav() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  if (!hamburger || !mobileMenu) return;

  /** Toggle the drawer */
  function toggleMenu(open) {
    const isOpen = (open !== undefined) ? open : mobileMenu.hidden;
    mobileMenu.hidden = !isOpen;
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  // Close when any nav link is tapped
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close when clicking outside the menu
  document.addEventListener('click', (e) => {
    const header = document.getElementById('site-header');
    if (!mobileMenu.hidden && header && !header.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.hidden) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
}

/* =================================================================
   04. STICKY HEADER
================================================================= */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const THRESHOLD = 60;

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on init
}

/* =================================================================
   05. SMOOTH SCROLLING
   (Supplements CSS scroll-behavior with offset for sticky header)
================================================================= */
function initSmoothScrolling() {
  const HEADER_OFFSET = 72; // matches --header-height

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, targetTop);
      } else {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });
}

/* =================================================================
   06. ACTIVE NAV HIGHLIGHT (IntersectionObserver)
================================================================= */
function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-72px 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* =================================================================
   07. SCROLL REVEAL ANIMATION (IntersectionObserver)
================================================================= */
function initScrollReveal() {
  // Skip for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
}

/* =================================================================
   08. IMAGE LIGHTBOX
================================================================= */
function initLightbox() {
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const closeBtn      = document.getElementById('lightbox-close');
  const prevBtn       = document.getElementById('lightbox-prev');
  const nextBtn       = document.getElementById('lightbox-next');
  const galleryItems  = document.querySelectorAll('[data-lightbox]');

  if (!lightbox || !lightboxImg || !galleryItems.length) return;

  // Build image list from gallery items
  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return {
      src: img ? img.src : '',
      alt: img ? img.alt : '',
    };
  });

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    // Return focus to the gallery item that opened it
    const trigger = galleryItems[currentIndex];
    if (trigger) trigger.focus();
  }

  function updateLightboxImage() {
    const { src, alt } = images[currentIndex];
    lightboxImg.src = src;
    lightboxImg.alt = alt;

    // Show/hide prev-next based on count
    prevBtn.style.visibility = images.length > 1 ? 'visible' : 'hidden';
    nextBtn.style.visibility = images.length > 1 ? 'visible' : 'hidden';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  // Open lightbox on gallery item click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.getAttribute('data-lightbox'), 10);
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });
}

/* =================================================================
   09. BACK TO TOP BUTTON
================================================================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const THRESHOLD = 400;

  function onScroll() {
    btn.hidden = window.scrollY < THRESHOLD;
  }

  btn.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =================================================================
   10. DYNAMIC YEAR
================================================================= */
function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* =================================================================
   11. APPLY CONFIG — Synchronize TAXI_CONFIG to DOM
   (Ensures phone/zalo changes in config propagate everywhere)
================================================================= */
function applyConfig() {
  const { phone, phoneDisplay, zaloUrl } = TAXI_CONFIG;
  const telHref  = `tel:${phone}`;

  // Update all tel: links
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.setAttribute('href', telHref);
  });

  // Update all zalo links
  document.querySelectorAll('a[href*="zalo.me"]').forEach(el => {
    el.setAttribute('href', zaloUrl);
  });

  // Update displayed phone number text nodes that contain the placeholder
  const phonePlaceholder = '0900.000.000';
  document.querySelectorAll('.contact-phone-number, .footer-phone a').forEach(el => {
    if (el.textContent.trim() === phonePlaceholder || el.textContent.trim() === phone) {
      el.textContent = phoneDisplay;
    }
  });
}
