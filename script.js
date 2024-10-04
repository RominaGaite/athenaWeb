document.addEventListener('DOMContentLoaded', () => {
    let index = 0;
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const intervalTime = 2000; // 2 segundos
    let autoPlay; // Variable para el intervalo automático

    // Función para mostrar el siguiente slide
    const showNextSlide = () => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length; // Asegura el loop
        slides[index].classList.add('active');
    };

    // Función para mostrar el slide anterior
    const showPrevSlide = () => {
        slides[index].classList.remove('active');
        index = (index - 1 + slides.length) % slides.length; // Asegura el loop
        slides[index].classList.add('active');
    };

    // Mover al siguiente slide manualmente
    nextButton.addEventListener('click', () => {
        showNextSlide();
        resetAutoPlay(); // Reinicia el autoplay al interactuar
    });

    // Mover al slide anterior manualmente
    prevButton.addEventListener('click', () => {
        showPrevSlide();
        resetAutoPlay(); // Reinicia el autoplay al interactuar
    });

    // AutoPlay - Cambia de imagen cada 2 segundos
    const startAutoPlay = () => {
        autoPlay = setInterval(showNextSlide, intervalTime);
    };

    // Función para reiniciar el autoplay cuando se interactúa
    const resetAutoPlay = () => {
        clearInterval(autoPlay); // Detiene el autoplay
        startAutoPlay(); // Lo reinicia
    };

    // Inicializamos el autoplay
    startAutoPlay();
});

//funcion tarjetas servicios

document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    tarjeta.addEventListener('click', function () {
        this.classList.toggle('show-text'); // Cambia la clase para mostrar el texto
    });
});

//funcion formularios 
// Función para mostrar/ocultar el formulario
document.getElementById('toggleForm').addEventListener('click', function () {
    const form = document.getElementById('contactForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
});

// Función para generar dinámicamente los meses
const generarMeses = () => {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const mesSelect = document.getElementById('mes');
    meses.forEach(mes => {
        const option = document.createElement('option');
        option.value = mes;
        option.textContent = mes;
        mesSelect.appendChild(option);
    });
};

// Función para generar dinámicamente las opciones de tema de interés
const generarTemasInteres = () => {
    const temas = [
        'Identidad digital', 'Grooming', 'Estafas virtuales', 'Redes sociales',
        'Ciberbullying', 'Ciberacoso', 'Loveboombing', 'Huella Digital', 'Seguridad en línea', 'Ludopatía en la red', 'Sextorsión','Riesgos en Linea', 'Estafas Piramidales', 'Concientización y capacitación para empresas',

    ];

    const checkboxGroup = document.getElementById('checkboxGroup');
    temas.forEach(tema => {
        const label = document.createElement('label');
        label.classList.add('checkbox-label');  // Añadimos una clase para aplicar el CSS
        label.innerHTML = `<input name="tema" type="checkbox" value="${tema}"> ${tema}`;
        checkboxGroup.appendChild(label);
    });
};


// Llamada a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generarMeses();
    generarTemasInteres();
});

document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtiene los datos del formulario
    const form = event.target;
    const formData = new FormData(form);

    try {
        // Envío de datos a Formspree
        const response = await fetch('https://formspree.io/f/mqazrvwv', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // Si el envío es exitoso
        if (response.ok) {
            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: '¡Mensaje enviado!',
                text: 'Tu mensaje ha sido enviado con éxito.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            form.reset();  // Limpiar el formulario después del envío
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error en el envío. Inténtalo más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});