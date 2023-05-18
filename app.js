document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del DOM
    const textInput = document.getElementById('text-input');
    const caseSelector = document.getElementById('case-selector');
    const convertButton = document.getElementById('convert-button');
    const resultTextarea = document.getElementById('result-textarea');

    // Función de conversión de caso
    function convertCase() {
        const text = textInput.value;

        // Limpiar las palabras de símbolos de puntuación
        const cleanText = text.replace(/[^\w\sáéíóúñç]/gi, '');

        // Reemplazar letras con acentos y caracteres especiales
        const normalizedText = cleanText
            .replace(/[àáâãäåā]/gi, 'a')
            .replace(/[èéêëē]/gi, 'e')
            .replace(/[ìíîïī]/gi, 'i')
            .replace(/[òóôõöøō]/gi, 'o')
            .replace(/[ùúûüū]/gi, 'u')
            .replace(/[ñń]/gi, 'n')
            .replace(/[çćč]/gi, 'c');

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
