let slideIndex = 1;
let slideTimer;

// Iniciar carrusel
showSlides(slideIndex);
autoSlides();

function moveSlide(n) {
  showSlides((slideIndex += n));
  resetTimer();
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function autoSlides() {
  slideTimer = setInterval(() => {
    moveSlide(1);
  }, 5000); // Cambio cada 5 segundos
}

function resetTimer() {
  clearInterval(slideTimer);
  autoSlides();
}
