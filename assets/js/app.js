let elements;

function onDOMLoaded() {
    elements = {
        textInput: document.getElementById('text-input'),
        caseSelector: document.getElementById('case-selector'),
        convertButton: document.getElementById('convert-button'),
        resultTextarea: document.getElementById('result-textarea'),
        preserveAccentsCheckbox: document.getElementById('preserve-accents'),
        pasteButton: document.getElementById('paste-button'),
        copyButton: document.getElementById('copy-button'),
        clearButton: document.getElementById('clear-button')
    };

    elements.textInput.setAttribute('maxlength', 256);

    function convertCase() {
        let text = elements.textInput.value;
        let cleanText = normalizeText(text);
        let words = cleanText.split(/\s+/);
        let selectedCase = elements.caseSelector.value;
        let convertedText = convertText(words, selectedCase);

        elements.resultTextarea.value = convertedText;
        elements.resultTextarea.focus();

        elements.copyButton.querySelector('i').style.display = 'none';
        elements.copyButton.querySelector('span').textContent = 'Copy';

        updateCopyButton();
    }

    function normalizeText(text) {
        let specialCharsRegex = /[çñø]/gi;
        let removedCharsRegex = /[^a-z0-9\s-_/*.àáâãäåāèéêëēìíîïīòóôõöōùúûü]/gi;
        let normalizedText = text.trim();

        function removeAccents() {
            if (!elements.preserveAccentsCheckbox.checked) {
                normalizedText = normalizedText.normalize('NFD');
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
                return words.map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join('');

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
                return words.map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase())).join(' ');

            case 'Train-Case':
                return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-');

            default:
                return elements.textInput.value;
        }
    }

    function updateCopyButton() {
        let hasContent = elements.resultTextarea.value.trim().length > 0;
        elements.copyButton.disabled = !hasContent;
    }

    function pasteFromClipboard() {
        navigator.clipboard.readText()
            .then(
                function handleClipboardText(clipboardText) {
                    let trimmedText = clipboardText.trim().slice(0, 256);
                    elements.textInput.value = trimmedText;
                    modifyPasteButton('Pasted!');
                    elements.pasteButton.blur();
                    setTimeout(updateConvertButtons, 10);
                    setTimeout(updateConvertButtons, 100);
                    setTimeout(updateConvertButtons, 300);
                    setTimeout(revertPasteButtonChanges, 1500);

                })
            .catch(
                function handleClipboardError(error) {
                    console.error('An error occurred while pasting from the clipboard.', error);
                });
    }

    function modifyPasteButton(text) {
        elements.pasteButton.querySelector('i').style.display = 'inline-flex';
        elements.pasteButton.querySelector('span').textContent = text;
    }

    function revertPasteButtonChanges() {
        elements.pasteButton.querySelector('i').style.display = 'none';
        elements.pasteButton.querySelector('span').textContent = 'Paste';
    }

    function copyToClipboard() {
        let textToCopy = elements.resultTextarea.value;
        navigator.clipboard.writeText(textToCopy);
        modifyCopyButton('Copied!');
        elements.copyButton.blur();
        setTimeout(revertCopyButtonChanges, 1500);
    }

    function modifyCopyButton(text) {
        elements.copyButton.querySelector('i').style.display = 'inline-flex';
        elements.copyButton.querySelector('span').textContent = text;
    }

    function revertCopyButtonChanges() {
        elements.copyButton.querySelector('i').style.display = 'none';
        elements.copyButton.querySelector('span').textContent = 'Copy';
    }

    function clearTextInput() {
        elements.textInput.value = '';
        updateConvertButtons();

        elements.pasteButton.querySelector('i').style.display = 'none';
        elements.pasteButton.querySelector('span').textContent = 'Paste';
    }

    function updateConvertButtons() {
        let inputValue = elements.textInput.value.trim();
        elements.convertButton.disabled = inputValue.length === 0;
        elements.clearButton.disabled = inputValue.length === 0;
    }

    elements.convertButton.addEventListener('click', convertCase);
    elements.resultTextarea.addEventListener('input', updateCopyButton);
    elements.pasteButton.addEventListener('click', pasteFromClipboard);
    elements.copyButton.addEventListener('click', copyToClipboard);
    elements.clearButton.addEventListener('click', clearTextInput);
    elements.textInput.addEventListener('input', updateConvertButtons);
}

document.addEventListener('DOMContentLoaded', onDOMLoaded);