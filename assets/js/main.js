const body = document.body;
const button = document.getElementById('theme-toggle');

// Verificar si el tema preferido del dispositivo es oscuro
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Asignar la clase correspondiente al body
body.classList.add(isDarkMode ? 'dark' : 'light');

button.addEventListener('click', function () {
    // Alternar la clase del body
    body.classList.toggle('dark');
    body.classList.toggle('light');
});
