const commitForm = document.querySelector('#commit-form');
const apiKey = document.querySelector('#api-key');
// apiKey.value
const inputType = document.querySelector('#input-type');
const inputPrompt = document.querySelector('#input-prompt');
const generateButton = document.querySelector('#generate-button');
const aiResponse = document.querySelector('#ai-response');
const copyButton = document.querySelector('#copy-button');
const inputPlaceholders = [
    'Briefly describe what was done...',
    'Write your commit message here...',
    'Add a clear summary of the change',
    'What does this commit do?',
    'Enter your custom commit message...',
    'Ex: Fixes login bug when password is empty'
]

document.addEventListener('DOMContentLoaded', () => {
    const promptRandomNumber = Math.floor(Math.random() * inputPlaceholders.length)
    inputPrompt.placeholder = inputPlaceholders[promptRandomNumber];
})

commitForm.addEventListener('submit', (event) => {
    event.preventDefault();

})

copyButton.addEventListener('click', () => {
    const textToCopy = aiResponse.querySelector('p').textContent;
    navigator.clipboard.writeText(textToCopy);
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);

})