document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        textInput: document.getElementById('text-input'),
        caseSelector: document.getElementById('case-selector'),
        convertButton: document.getElementById('convert-button'),
        resultTextarea: document.getElementById('result-textarea'),
        preserveAccentsCheckbox: document.getElementById('preserve-accents'),
        copyButton: document.getElementById('copy-button'),
        clearButton: document.getElementById('clear-button')
    };

    function convertCase() {
        const text = elements.textInput.value;
        const cleanText = normalizeText(text);
        const words = cleanText.split(/\s+/);
        const selectedCase = elements.caseSelector.value;
        const convertedText = convertText(words, selectedCase);

        elements.resultTextarea.value = convertedText;
        elements.resultTextarea.focus();
        updateCopyButton();
    }

    function normalizeText(text) {
        const specialCharsRegex = /[çñø]/gi; // Expresión regular para detectar caracteres especiales "ç", "ñ" y "ø"
        const removedCharsRegex = /[^a-z0-9\s-_/*.àáâãäåāèéêëēìíîïīòóôõöōùúûü]/gi; // Expresión regular para detectar caracteres que no son letras, números, espacios, guiones, guiones bajos, barras, asteriscos, puntos o caracteres acentuados
        let normalizedText = text;

        function removeAccents() {
            if (!elements.preserveAccentsCheckbox.checked) {
                // Normaliza el texto utilizando el formulario NFD
                normalizedText = normalizedText.normalize('NFD');

                // Filtra los caracteres diacríticos y los elimina
                normalizedText = normalizedText.replace(/[\u0300-\u036f]/g, '');
            }
        }

        function specialChars() {
            normalizedText = normalizedText.replace(specialCharsRegex, function (match) {
                if (match === 'ç') {
                    return 'c';
                } else if (match === 'ñ') {
                    return 'n';
                } else if (match === 'ø') {
                    return 'o';
                }
            });
        }

        function removedChars() {
            normalizedText = normalizedText.replace(removedCharsRegex, '');
        }

        removeAccents();

        specialChars();

        removedChars();

        return normalizedText;
    }

    function convertText(words, selectedCase) {
        switch (selectedCase) {
            case 'flatcase':
                return words.join('').toLowerCase();
            case 'kebab-case':
                return words.join('-').toLowerCase();
            case 'camelCase':
                return words.map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
            case 'PascalCase':
                return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
            case 'snake_case':
                return words.join('_').toLowerCase();
            case 'CONSTANT_CASE':
                return words.join('_').toUpperCase();
            case 'COBOL-CASE':
                return words.join('-').toUpperCase();
            case 'Title Case':
                return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            case 'Sentence case':
                return words.map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()).join(' ');
            case 'Train-Case':
                return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-');
            default:
                return elements.textInput.value;
        }
    }

    function updateCopyButton() {
        const hasContent = elements.resultTextarea.value.trim().length > 0;
        elements.copyButton.disabled = !hasContent;
    }

    function copyToClipboard() {
        const textToCopy = elements.resultTextarea.value;
        navigator.clipboard.writeText(textToCopy);
    }

    function clearTextInput() {
        elements.textInput.value = '';
    }

    elements.convertButton.addEventListener('click', convertCase);
    elements.resultTextarea.addEventListener('input', updateCopyButton);
    elements.copyButton.addEventListener('click', copyToClipboard);
    elements.clearButton.addEventListener('click', clearTextInput);
});
