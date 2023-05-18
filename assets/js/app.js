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
        const cleanText = text.replace(/[^\w\sáéíóúñç]/gi, '');
        const preserveAccents = elements.preserveAccentsCheckbox.checked;
        const normalizedText = normalizeText(cleanText, preserveAccents);
        const words = normalizedText.split(/\s+/);
        const selectedCase = elements.caseSelector.value;

        const convertedText = convertText(words, selectedCase);

        elements.resultTextarea.value = convertedText;
        updateCopyButton();
    }

    function normalizeText(text, preserveAccents) {
        return text.replace(/[àáâãäåāèéêëēìíîïīòóôõöøōùúûüūñńçćč]/gi, preserveAccents ? '$&' : function (match) {
            return match.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        });
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
        elements.resultTextarea.select();
        document.execCommand('copy');
    }

    function clearTextInput() {
        elements.textInput.value = '';
    }

    elements.convertButton.addEventListener('click', convertCase);
    elements.resultTextarea.addEventListener('input', updateCopyButton);
    elements.copyButton.addEventListener('click', copyToClipboard);
    elements.clearButton.addEventListener('click', clearTextInput);
});
