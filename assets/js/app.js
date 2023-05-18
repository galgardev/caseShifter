document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        textInput: document.getElementById('text-input'),
        caseSelector: document.getElementById('case-selector'),
        convertButton: document.getElementById('convert-button'),
        resultTextarea: document.getElementById('result-textarea'),
        preserveAccentsCheckbox: document.getElementById('preserve-accents'),
        copyButton: document.getElementById('copy-button')
    };

    function convertCase() {
        const text = elements.textInput.value;
        const cleanText = text.replace(/[^\w\sáéíóúñç]/gi, '');
        const preserveAccents = elements.preserveAccentsCheckbox.checked;
        const normalizedText = cleanText.replace(/[àáâãäåāèéêëēìíîïīòóôõöøōùúûüūñńçćč]/gi, preserveAccents ? '$&' : function (match) {
            return match.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        });
        const words = normalizedText.split(/\s+/);
        const selectedCase = elements.caseSelector.value;

        let convertedText = '';

        switch (selectedCase) {
            case 'flatcase':
                convertedText = words.join('').toLowerCase();
                break;
            case 'kebab-case':
                convertedText = words.join('-').toLowerCase();
                break;
            case 'camelCase':
                convertedText = words.map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
                break;
            case 'PascalCase':
                convertedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
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
                convertedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                break;
            case 'Sentence case':
                convertedText = words.map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()).join(' ');
                break;
            case 'Train-Case':
                convertedText = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-');
                break;
            default:
                convertedText = text;
                break;
        }

        elements.resultTextarea.value = convertedText;
        updateCopyButton();
    }

    function updateCopyButton() {
        const hasContent = elements.resultTextarea.value.trim().length > 0;
        elements.copyButton.disabled = !hasContent;
    }

    function copyToClipboard() {
        elements.resultTextarea.select();
        document.execCommand('copy');
    }

    elements.convertButton.addEventListener('click', convertCase);
    elements.resultTextarea.addEventListener('input', updateCopyButton);
    elements.copyButton.addEventListener('click', copyToClipboard);
});
