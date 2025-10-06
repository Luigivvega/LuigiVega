document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar elementos clave
    const track = document.querySelector('.carrusel-track');
    const slides = Array.from(track.children);
    const navDots = document.querySelector('.carrusel-nav');
    
    // Si no hay slides, salimos
    if (slides.length === 0) {
        return;
    }

    // Configuración: cuántos slides se muestran a cada lado del activo
    const slidesToShowSide = 1; 

    // 2. Función para actualizar la posición y el estilo del carrusel
    const updateSlides = (targetIndex) => {
        // Recalcular el ancho de la diapositiva en cada actualización
        // Esto es crucial para la estabilidad después de que el CSS se ha cargado.
        const slideWidth = slides[0].getBoundingClientRect().width;
        const trackWidth = track.getBoundingClientRect().width;
        
        // Calcular el desplazamiento necesario para centrar el slide
        // El desplazamiento es la posición del slide actual * slideWidth,
        // ajustado por el ancho del contenedor para centrar.
        const offset = (targetIndex * slideWidth) - (trackWidth / 2) + (slideWidth / 2);
        
        // Aplicar la traslación para mover el carrusel
        track.style.transform = `translateX(-${offset}px)`;

        // 3. Aplicar clases de estilo (is-active) para el efecto de escala/blur
        slides.forEach((slide, index) => {
            const distance = Math.abs(index - targetIndex);
            // Si la diapositiva es la activa o está a un lado (slidesToShowSide = 1)
            if (distance <= slidesToShowSide) {
                slide.classList.add('is-active');
            } else {
                slide.classList.remove('is-active');
            }
        });

        // 4. Actualizar puntos de navegación
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
    
    // 5. INICIALIZACIÓN CON RETRASO (CLAVE PARA QUE FUNCIONE)
    // Usamos setTimeout para dar tiempo a que las imágenes carguen y el CSS se aplique.
    setTimeout(() => {
        updateSlides(0);
    }, 100); 


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

    // 6. Manejar el redimensionamiento de la ventana para recalcular posiciones
    window.addEventListener('resize', () => {
        const currentActiveSlide = track.querySelector('.is-active');
        let currentIndex = slides.indexOf(currentActiveSlide);
        // Si no encontramos un slide activo (debería ser el 0 al inicio), usamos el 0
        if (currentIndex === -1) currentIndex = 0; 
        
        // Recalculamos la posición para el slide activo
        updateSlides(currentIndex);
    });
});
