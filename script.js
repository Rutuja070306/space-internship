/* NAVBAR SCROLL */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* MOBILE MENU */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

/* SCROLL REVEAL */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
});

reveals.forEach(r => observer.observe(r));

/* FORM VALIDATION */
const form = document.getElementById('regForm');

form.addEventListener('submit', e => {

  e.preventDefault();

  const firstName = document.getElementById('firstName');
  const email = document.getElementById('email');

  let valid = true;

  if (firstName.value.trim() === '') {
    document.getElementById('firstNameErr').style.display = 'block';
    valid = false;
  }

  if (email.value.trim() === '') {
    document.getElementById('emailErr').style.display = 'block';
    valid = false;
  }

  if (valid) {

    const btn = document.getElementById('submitBtn');

    btn.innerText = 'Submitting...';

    setTimeout(() => {

      document.getElementById('successBanner').classList.add('show');

      btn.innerText = 'Submitted';

    }, 1200);
  }
});