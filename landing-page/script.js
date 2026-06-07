'use strict';

// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== BURGER =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');

// Trigger reveals already in viewport immediately (fixes headless/no-JS-scroll)
requestAnimationFrame(() => {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
      el.querySelectorAll('.transform__card, .offer__card, .review__card, .faq__item').forEach((child, i) => {
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'none';
          child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, i * 80);
      });
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger children if parent is a grid container
      const children = entry.target.querySelectorAll(
        '.transform__card, .offer__card, .review__card, .faq__item, .stat'
      );

      if (children.length > 0) {
        children.forEach((child, i) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'none';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          }, i * 80);
        });
      }

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => {
  // Pre-hide direct grid children for stagger
  el.querySelectorAll(
    '.transform__card, .offer__card, .review__card, .faq__item'
  ).forEach(child => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(20px)';
  });

  revealObserver.observe(el);
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq__question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.style.maxHeight = '0';
    });

    // Open clicked if it was closed
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn__text');
const btnLoader = submitBtn.querySelector('.btn__loader');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Loading state
  btnText.hidden = true;
  btnLoader.hidden = false;
  submitBtn.disabled = true;

  // Simulate async send (replace with real fetch)
  await new Promise(resolve => setTimeout(resolve, 1600));

  submitBtn.hidden = true;
  formSuccess.hidden = false;
  form.reset();
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? '#ffffff'
          : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
