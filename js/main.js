const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const cursor = document.querySelector('.cursor');

function setTheme(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = 'Light';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.textContent = 'Dark';
    localStorage.setItem('theme', 'light');
  }
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      siteNav.classList.remove('open');
    }
  });
}

// Custom cursor animation
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const nameField = contactForm.querySelector('#name');
  const emailField = contactForm.querySelector('#email');
  const subjectField = contactForm.querySelector('#subject');
  const messageField = contactForm.querySelector('#message');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = [
      validateField(nameField, (value) => value.trim().length >= 2, 'Please enter your name.'),
      validateField(emailField, validateEmail, 'Please enter a valid email address.'),
      validateField(subjectField, (value) => value.trim().length >= 5, 'Please enter a subject.'),
      validateField(messageField, (value) => value.trim().length >= 20, 'Message must be at least 20 characters.'),
    ].every(Boolean);

    if (isValid) {
      contactForm.reset();
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.textContent = 'Thanks! Your message is ready to send.';
      contactForm.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove();
      }, 4500);
    }
  });
}

function validateField(field, validator, message) {
  const error = field.nextElementSibling;
  const value = field.value || '';
  const valid = validator(value);

  if (!valid) {
    field.classList.add('input-invalid');
    if (error) error.textContent = message;
    return false;
  }

  field.classList.remove('input-invalid');
  if (error) error.textContent = '';
  return true;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
