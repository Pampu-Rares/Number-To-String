import {transformToString} from './number-to-string.js';

const input = document.getElementById("number-input");
const enterBtn = document.getElementById("enter-btn");
const modal = document.getElementById("result-modal");
const closeModalBtn = document.getElementById("close-modal");
const result = document.getElementById("result");
const copyTextBtn = document.getElementById("copy-btn");

let resultString;

function processInput() {
    resultString = transformToString(input.value);
    result.innerHTML = `<p>${resultString}</p>`
    modal.showModal();
}

enterBtn.addEventListener("click", processInput);

closeModalBtn.addEventListener("click", () => {
    modal.close();
});

copyTextBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(resultString);
        window.alert("Text copied to clipboard");
    } catch(err) {
        window.alert("Error: Could not copy text to clipboard.");
    }

});