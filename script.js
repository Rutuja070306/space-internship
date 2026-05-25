/* NAVBAR SCROLL */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if(window.scrollY > 40){
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* MOBILE MENU */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

/* FORM VALIDATION */

const form = document.getElementById("regForm");

form.addEventListener("submit", function(e){

  e.preventDefault();

  let valid = true;

  const firstName = document.getElementById("firstName");
  const email = document.getElementById("email");
  const motivation = document.getElementById("motivation");

  /* First Name */
  if(firstName.value.trim() === ""){
    document.getElementById("firstNameErr").classList.add("show");
    valid = false;
  } else {
    document.getElementById("firstNameErr").classList.remove("show");
  }

  /* Email */
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(!email.value.match(emailPattern)){
    document.getElementById("emailErr").classList.add("show");
    valid = false;
  } else {
    document.getElementById("emailErr").classList.remove("show");
  }

  /* Motivation */
  if(motivation.value.trim().length < 30){
    document.getElementById("motivationErr").classList.add("show");
    valid = false;
  } else {
    document.getElementById("motivationErr").classList.remove("show");
  }

  /* SUCCESS */
  if(valid){

    document.getElementById("successBanner")
      .classList.add("show");

    form.reset();

  }

});