const commitForm = document.querySelector('#commit-form');
const apiKey = document.querySelector('#api-key');
// 
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

const askIA = async (apiKey, type, prompt) => {
    geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const question = `Generate possible commits messages following the Conventional Commits, based on: ${type}: ${prompt}. Do not include a body or any additional text. (You must respond in the same language as the prompt.)`;
    const contents = [{
        parts: [{
            text: question
        }]
    }];

    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents
        })
    })

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

const mdToHTML = (text) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
}

const formValidation = async (event) => {
    event.preventDefault();
    let apiKeyValue = apiKey.value;
    let inputTypeValue = inputType.value;
    let inputPromptValue = inputPrompt.value;

    generateButton.disabled = true;
    generateButton.textContent = "Creating commit message...";
    generateButton.classList.add('pulse');

    try {
        const response = await askIA(apiKeyValue, inputTypeValue, inputPromptValue);
        aiResponse.innerHTML = mdToHTML(response);

    } catch(error) {
        aiResponse.classList.remove('hidden'); 
        aiResponsePara.innerHTML = error;

    } finally {
        copyButton.classList.remove('hidden'); 
        aiResponse.classList.remove('hidden'); 
        generateButton.disabled = false;
        generateButton.textContent = "Generate new Commit";
        generateButton.classList.remove('pulse');
    }
}
commitForm.addEventListener('submit', formValidation)

copyButton.addEventListener('click', () => {
    let textToCopy = aiResponse.textContent;
    navigator.clipboard.writeText(textToCopy);
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
})