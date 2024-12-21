

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  // Si la altura está en 0, expandimos; si no, la colapsamos
  if (navLinks.style.height === '' || navLinks.style.height === '0px') {
    navLinks.style.height = '200px';
  } else {
    navLinks.style.height = '0px';
  }
});
