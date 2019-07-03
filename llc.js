let links = document.querySelectorAll('nav ul li a');
let cards = document.querySelectorAll('.content .card');

window.addEventListener('scroll', event => {
  links.forEach(link => {
    let card = document.querySelector(link.hash);

    let offset = window.scrollY + 65; // scroll padding

    if (card.offsetTop <= offset &&
        card.offsetTop + card.offsetHeight > offset) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
