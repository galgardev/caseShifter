document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del DOM
    const textInput = document.getElementById('text-input');
    const caseSelector = document.getElementById('case-selector');
    const convertButton = document.getElementById('convert-button');
    const resultTextarea = document.getElementById('result-textarea');
    const preserveAccentsCheckbox = document.getElementById('preserve-accents');

    // Función de conversión de caso
    function convertCase() {
        const text = textInput.value;

        // Limpiar las palabras de símbolos de puntuación
        const cleanText = text.replace(/[^\w\sáéíóúñç]/gi, '');

        // Obtener el estado del checkbox de conservar acentos
        const preserveAccents = preserveAccentsCheckbox.checked;

        // Reemplazar letras con acentos y caracteres especiales
        const normalizedText = cleanText
            .replace(/[àáâãäåā]/gi, preserveAccents ? '$&' : 'a')
            .replace(/[èéêëē]/gi, preserveAccents ? '$&' : 'e')
            .replace(/[ìíîïī]/gi, preserveAccents ? '$&' : 'i')
            .replace(/[òóôõöøō]/gi, preserveAccents ? '$&' : 'o')
            .replace(/[ùúûüū]/gi, preserveAccents ? '$&' : 'u')
            .replace(/[ñń]/gi, preserveAccents ? '$&' : 'n')
            .replace(/[çćč]/gi, preserveAccents ? '$&' : 'c');

        // Obtener las palabras resultantes
        const words = normalizedText.split(/\s+/);

        // Obtener el tipo de case seleccionado
        const selectedCase = caseSelector.value;

        // Convertir a case correspondiente
        let convertedText = '';

        switch (selectedCase) {
            case 'flatcase':
                convertedText = words.join('').toLowerCase();
                break;
            case 'kebab-case':
                convertedText = words.join('-').toLowerCase();
                break;
            case 'camelCase':
                convertedText = words
                    .map((word, index) => {
                        if (index === 0) {
                            return word.toLowerCase();
                        } else {
                            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                        }
                    })
                    .join('');
                break;
            case 'PascalCase':
                convertedText = words
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join('');
                break;
            case 'snake_case':
                convertedText = words.join('_').toLowerCase();
                break;
            case 'CONSTANT_CASE':
                convertedText = words.join('_').toUpperCase();
                break;
            case 'COBOL-CASE':
                convertedText = words.join('-').toUpperCase();
                break;
            case 'Title Case':
                convertedText = words
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');
                break;
            case 'Sentence case':
                convertedText = words
                    .map((word, index) => {
                        if (index === 0) {
                            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                        } else {
                            return word.toLowerCase();
                        }
                    })
                    .join(' ');
                break;
            case 'Train-Case':
                convertedText = words
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join('-');
                break;
            default:
                convertedText = text;
                break;
        }

        // Actualizar el valor del resultado
        resultTextarea.value = convertedText;
    }

    // Asociar evento al botón de conversión
    convertButton.addEventListener('click', convertCase);
});
