// REPLACE this with your real team email address before publishing.
// Example: const CONTACT_EMAIL = "yourteam@gmail.com";
const CONTACT_EMAIL = "";

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

// Working roast filter on the three illustrative coffee cards.
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.coffee-card');

filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.roast;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => {
      card.classList.toggle('is-hidden', selected !== 'all' && card.dataset.roast !== selected);
    });
  });
});

// The contact form opens the visitor's email application. It does NOT
// store submissions or silently claim to send data to a backend.
const contactForm = document.getElementById('contact-form');
const status = document.getElementById('form-status');

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  if (!CONTACT_EMAIL || CONTACT_EMAIL.includes('example.com')) {
    status.textContent = 'Demo mode: To activate this contact button, replace CONTACT_EMAIL in script.js with your team’s real email address. Nothing has been sent.';
    return;
  }

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const subject = encodeURIComponent('Kapetan website inquiry');
  const body = encodeURIComponent(`Name: ${name}\nReply-to: ${email}\n\nMessage:\n${message}`);

  status.textContent = 'Your email app will open with a prepared message. Please press Send there to contact us.';
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
