/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i % 4) * 0.08 + 's';
      e.target.classList.add('in-view');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => ro.observe(r));

/* ── FORM VALIDATION ── */
const rules = {
  firstName:  { el: 'firstName',  err: 'firstNameErr',  test: v => v.trim().length >= 2 },
  lastName:   { el: 'lastName',   err: 'lastNameErr',   test: v => v.trim().length >= 2 },
  email:      { el: 'email',      err: 'emailErr',      test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
  phone:      { el: 'phone',      err: 'phoneErr',      test: v => /^[\d\s\+\-\(\)]{10,15}$/.test(v.trim()) },
  college:    { el: 'college',    err: 'collegeErr',    test: v => v.trim().length >= 3 },
  degree:     { el: 'degree',     err: 'degreeErr',     test: v => v.trim().length >= 3 },
  year:       { el: 'year',       err: 'yearErr',       test: v => v !== '' },
  track:      { el: 'track',      err: 'trackErr',      test: v => v !== '' },
  portfolio:  { el: 'portfolio',  err: 'portfolioErr',  test: v => v === '' || /^https?:\/\/.+/.test(v.trim()), optional: true },
  motivation: { el: 'motivation', err: 'motivationErr', test: v => v.trim().length >= 30 },
};

function setFieldState(id, errId, valid, show) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  if (!show) { el.classList.remove('error','valid'); err.classList.remove('show'); return; }
  el.classList.toggle('error', !valid);
  el.classList.toggle('valid', valid);
  err.classList.toggle('show', !valid);
}

// Live validation on blur
Object.values(rules).forEach(r => {
  const el = document.getElementById(r.el);
  el.addEventListener('blur', () => {
    if (r.optional && el.value.trim() === '') { setFieldState(r.el, r.err, true, false); return; }
    setFieldState(r.el, r.err, r.test(el.value), true);
  });
  el.addEventListener('input', () => {
    if (el.classList.contains('error')) {
      setFieldState(r.el, r.err, r.test(el.value), true);
    }
  });
});

document.getElementById('regForm').addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  Object.values(rules).forEach(r => {
    const el = document.getElementById(r.el);
    if (r.optional && el.value.trim() === '') { setFieldState(r.el, r.err, true, false); return; }
    const ok = r.test(el.value);
    setFieldState(r.el, r.err, ok, true);
    if (!ok) valid = false;
  });

  // Terms check
  const terms = document.getElementById('terms');
  const termsErr = document.getElementById('termsErr');
  if (!terms.checked) { termsErr.classList.add('show'); valid = false; }
  else { termsErr.classList.remove('show'); }

  if (!valid) {
    // Scroll to first error
    const firstErr = document.querySelector('.error, .field-error.show');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Simulate submission
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Submitting…';

  setTimeout(() => {
    document.getElementById('successBanner').classList.add('show');
    document.getElementById('regForm').style.opacity = '.4';
    document.getElementById('regForm').style.pointerEvents = 'none';
    document.getElementById('successBanner').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});