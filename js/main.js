/**
 * Sidera Health - Main JavaScript
 * Handles language switching, mobile menu, scroll animations
 */

// ========================================
// Language Switching
// ========================================
function setLang(lang) {
  // Set body class
  if (lang === 'es') {
    document.body.classList.add('lang-es');
  } else {
    document.body.classList.remove('lang-es');
  }
  
  // Update active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Store preference
  localStorage.setItem('sidera-lang', lang);
}

// Initialize language from localStorage or default
function initLanguage() {
  const savedLang = localStorage.getItem('sidera-lang');
  if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
    setLang(savedLang);
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.toLowerCase().startsWith('es')) {
      setLang('es');
    } else {
      setLang('en');
    }
  }
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navRight = document.querySelector('.nav-right');
  
  if (!menuBtn || !navRight) return;
  
  menuBtn.addEventListener('click', () => {
    navRight.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });
  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navRight.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
}

// ========================================
// Scroll Animations (Fade Up)
// ========================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  fadeElements.forEach(el => observer.observe(el));
}

function prepareAnimations() {
  const sections = document.querySelectorAll('section, .feature-block, .hero, .about-strip');
  sections.forEach((section, index) => {
    section.classList.add('fade-up');
    section.style.transitionDelay = `${index * 0.05}s`;
  });
  
  const cards = document.querySelectorAll('.service-card, .market-card, .insight-card, .testimonial-card');
  cards.forEach((card, index) => {
    card.classList.add('fade-up');
    card.style.transitionDelay = `${(index % 6) * 0.05}s`;
  });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Navbar Background on Scroll
// ========================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(247, 245, 240, 0.98)';
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
    } else {
      navbar.style.background = 'rgba(247, 245, 240, 0.92)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ========================================
// Image Lazy Loading with Fade
// ========================================
function initLazyLoading() {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        imageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    imageObserver.observe(img);
    
    if (img.complete) {
      img.style.opacity = '1';
      imageObserver.unobserve(img);
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
}

// ========================================
// Initialize everything on DOM ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  prepareAnimations();
  initScrollAnimations();
  initLazyLoading();
  
  // Add language toggle event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = btn.getAttribute('data-lang');
      if (lang) setLang(lang);
    });
  });
});