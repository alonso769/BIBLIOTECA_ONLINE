// Funciones para ver y descargar PDF
function verPDF(ruta) {
    const visor = document.getElementById("visor");
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.src = ruta;
    visor.style.display = "flex"; // Usa flex para centrar el modal
}

function descargarPDF(ruta) {
    window.open(ruta, '_blank');
}

function ocultarPDF() {
    const visor = document.getElementById("visor");
    const pdfViewer = document.getElementById("pdfViewer");
    visor.style.display = "none";
    pdfViewer.src = ""; // Opcional: limpia el src del iframe para detener el consumo de recursos
}

// --- Filtros ---
const searchName = document.getElementById("searchName");
const searchDate = document.getElementById("searchDate");
const searchEspecialidad = document.getElementById("searchEspecialidad");
const allCards = document.querySelectorAll(".pdf-card");
const allGroups = document.querySelectorAll(".pdf-group");

function filtrar() {
    const nombre = searchName.value.toLowerCase();
    const fecha = searchDate.value;
    const especialidad = searchEspecialidad.value;

    allGroups.forEach(group => {
        let groupHasVisibleCards = false;
        const cardsInGroup = group.querySelectorAll('.pdf-card');
        
        cardsInGroup.forEach(card => {
            const nombreCard = card.dataset.nombre.toLowerCase();
            const fechaCard = card.dataset.fecha;
            const especialidadCard = card.dataset.especialidad;

            const coincideNombre = nombreCard.includes(nombre);
            const coincideFecha = fecha === "" || fechaCard === fecha;
            const coincideEspecialidad = especialidad === "" || especialidadCard === especialidad;

            if (coincideNombre && coincideFecha && coincideEspecialidad) {
                card.style.display = "block";
                groupHasVisibleCards = true;
            } else {
                card.style.display = "none";
            }
        });

        if (groupHasVisibleCards || especialidad === "") {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });
}

searchName.addEventListener("input", filtrar);
searchDate.addEventListener("input", filtrar);
searchEspecialidad.addEventListener("change", filtrar);

// --- Lógica del Carrusel de Imágenes ---
let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("image-slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active-slide');
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }

  slides[slideIndex-1].classList.add('active-slide');
  dots[slideIndex-1].classList.add('active');
}

// Carrusel automático
setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);