document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carrusel-track');
    const slides = Array.from(track.children);
    const navDots = document.querySelector('.carrusel-nav');

    // Número de slides visibles a cada lado del activo
    const slidesToShowSide = 1; 
    // Calcular el índice del slide central (redondeado hacia arriba para impares)
    const centerIndexOffset = Math.floor(slidesToShowSide / 2);


    // Función para actualizar los slides visibles y sus estilos
    const updateSlides = (targetIndex) => {
        // Ajustar el track para que el slide activo esté en el centro visualmente
        const slideWidth = slides[0].getBoundingClientRect().width;
        const trackWidth = track.getBoundingClientRect().width;
        const offset = (targetIndex * slideWidth) - (trackWidth / 2) + (slideWidth / 2);
        track.style.transform = `translateX(-${offset}px)`;

        slides.forEach((slide, index) => {
            const distance = Math.abs(index - targetIndex);
            if (distance <= slidesToShowSide) {
                slide.classList.add('is-active');
            } else {
                slide.classList.remove('is-active');
            }
        });

        // Actualizar puntos de navegación
        navDots.innerHTML = ''; // Limpiar puntos existentes
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carrusel-dot');
            if (index === targetIndex) {
                dot.classList.add('is-active');
            }
            dot.addEventListener('click', () => updateSlides(index));
            navDots.appendChild(dot);
        });
    };

    // Inicializar el carrusel en el primer slide
    updateSlides(0);

    // Opcional: Permitir navegación con flechas del teclado
    document.addEventListener('keydown', (e) => {
        const currentActiveSlide = track.querySelector('.is-active');
        let currentIndex = slides.indexOf(currentActiveSlide);

        if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
            updateSlides(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            updateSlides(currentIndex - 1);
        }
    });
});
