// Variables globales
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

// Función para verificar y asignar el tema al cuerpo del documento
function setTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.className = isDarkMode ? 'dark' : 'light';
}

// Función para alternar el tema al hacer clic en el botón
function toggleTheme() {
    body.classList.toggle('dark');
    body.classList.toggle('light');
}

// Asignar tema inicial al cargar la página
setTheme(); // Se llama a la función setTheme() al cargar la página

// Agregar evento de clic al botón para alternar el tema
themeToggle.addEventListener('click', toggleTheme); // Se llama a la función toggleTheme() al hacer clic en el botón
