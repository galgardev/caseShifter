document.addEventListener("DOMContentLoaded",(function(){const e={textInput:document.getElementById("text-input"),caseSelector:document.getElementById("case-selector"),convertButton:document.getElementById("convert-button"),resultTextarea:document.getElementById("result-textarea"),preserveAccentsCheckbox:document.getElementById("preserve-accents")};e.convertButton.addEventListener("click",(function(){const t=e.textInput.value,a=t.replace(/[^\w\sáéíóúñç]/gi,""),c=e.preserveAccentsCheckbox.checked,s=a.replace(/[àáâãäåāèéêëēìíîïīòóôõöøōùúûüūñńçćč]/gi,c?"$&":function(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}).split(/\s+/);let o="";switch(e.caseSelector.value){case"flatcase":o=s.join("").toLowerCase();break;case"kebab-case":o=s.join("-").toLowerCase();break;case"camelCase":o=s.map(((e,t)=>0===t?e.toLowerCase():e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join("");break;case"PascalCase":o=s.map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join("");break;case"snake_case":o=s.join("_").toLowerCase();break;case"CONSTANT_CASE":o=s.join("_").toUpperCase();break;case"COBOL-CASE":o=s.join("-").toUpperCase();break;case"Title Case":o=s.map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join(" ");break;case"Sentence case":o=s.map(((e,t)=>0===t?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():e.toLowerCase())).join(" ");break;case"Train-Case":o=s.map((e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())).join("-");break;default:o=t;break}e.resultTextarea.value=o}))}));