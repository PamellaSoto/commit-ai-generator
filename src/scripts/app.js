const commitForm = document.querySelector('#commit-form');
const apiKey = document.querySelector('#api-key');
// apiKey.value
const inputType = document.querySelector('#input-type');
const inputPrompt = document.querySelector('#input-prompt');
const generateButton = document.querySelector('#generate-button');
const aiResponse = document.querySelector('#ai-response');

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
