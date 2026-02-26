//============================================
//---------------- Navbar --------------------
//============================================
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-list a");

  // 1. Abrir y Cerrar menú al tocar las rayitas
  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navList.classList.toggle("active");
      mobileMenu.classList.toggle("is-active");
    });
  }

  // 2. Cerrar el menú automáticamente al tocar cualquier link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("active")) {
        navList.classList.remove("active");
        mobileMenu.classList.remove("is-active");
      }
    });
  });
});

//============================================
//----------- CARRUSEL INICIO ----------------
//============================================
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

//============================================
//--- CARRUSEL CLIENTES y CASOS DE EXITO -----
//============================================
// CARRUSEL CLIENTES
document.addEventListener("DOMContentLoaded", function () {
  function shuffleAndFillMarquee(containerId) {
    const marquee = document.getElementById(containerId);
    if (!container) return;

    // 1. Obtener los logos originales
    let logos = Array.from(marquee.children);

    // 2. Barajar los logos (Fisher-Yates)
    for (let i = logos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [logos[i], logos[j]] = [logos[j], logos[i]];
    }

    // 3. Limpiar y reinsertar los logos barajados
    marquee.innerHTML = "";
    logos.forEach((logo) => marquee.appendChild(logo));

    // 4. TRUCO: Triplicar el contenido para que el ciclo sea mucho más largo
    // Esto evita que veas el mismo logo "perseguirse" a sí mismo tan rápido
    const content = marquee.innerHTML;
    marquee.innerHTML = content + content + content;
  }

  // Ejecutar para clientes y testimonios
  shuffleAndFillMarquee("marquee-content");

  // Para testimonios solo barajamos (sin duplicar)
  const contenedorTestimonios = document.getElementById(
    "contenedor-testimonios",
  );
  if (contenedorTestimonios) {
    let testimonios = Array.from(contenedorTestimonios.children);
    for (let i = testimonios.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [testimonios[i], testimonios[j]] = [testimonios[j], testimonios[i]];
    }
    contenedorTestimonios.innerHTML = "";
    testimonios.forEach((t) => contenedorTestimonios.appendChild(t));
  }
});

// CASOS DE EXTIO
document.addEventListener("DOMContentLoaded", function () {
  // --- FUNCIÓN GENÉRICA PARA BARAJAS ELEMENTOS ---
  function shuffleElements(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Seguridad por si el ID no existe en la página actual

    const elements = Array.from(container.children);

    // Algoritmo Fisher-Yates
    for (let i = elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [elements[i], elements[j]] = [elements[j], elements[i]];
    }

    // Reinsertar en el nuevo orden
    container.innerHTML = "";
    elements.forEach((el) => container.appendChild(el));

    return container;
  }

  // 1. Barajar Logos del Carrusel y Duplicar
  const marquee = shuffleElements("marquee-content");
  if (marquee) {
    const clone = marquee.innerHTML;
    marquee.innerHTML += clone;
  }

  // 2. Barajar Casos de Éxito
  shuffleElements("contenedor-testimonios");
});

//============================================
//--------- FORMULARIO CONTACTENOS -----------
//============================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevenir el envío tradicional

      const formData = new FormData(form);

      // Cambiar el texto del botón mientras envía para mejorar el UX
      const btn = form.querySelector(".btn-enviar");
      const originalBtnText = btn.textContent;
      btn.textContent = "Enviando...";
      btn.disabled = true;

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          responseMessage.style.display = "block";

          if (response.ok) {
            // Éxito: Usamos el azul corporativo o verde para el mensaje
            responseMessage.textContent =
              "¡Gracias! Su mensaje ha sido enviado con éxito. Nos contactaremos pronto.";
            responseMessage.style.color = "#004a99"; // Azul Qplus para mantener sobriedad
            form.reset(); // Limpiar campos
          } else {
            // Error de servidor
            responseMessage.textContent =
              "Lo sentimos, hubo un problema técnico. Por favor, intente de nuevo.";
            responseMessage.style.color = "#d9534f"; // Rojo sutil
          }
        })
        .catch((error) => {
          // Error de conexión
          responseMessage.style.display = "block";
          responseMessage.textContent =
            "Error de conexión. Verifique su internet e intente de nuevo.";
          responseMessage.style.color = "#d9534f";
        })
        .finally(() => {
          // Restaurar el botón
          btn.textContent = originalBtnText;
          btn.disabled = false;

          // Ocultar el mensaje automáticamente después de 5 segundos para limpiar la vista
          setTimeout(() => {
            responseMessage.style.fadeOut = "0.5s";
            setTimeout(() => {
              responseMessage.style.display = "none";
            }, 500);
          }, 5000);
        });
    });
  }
});
