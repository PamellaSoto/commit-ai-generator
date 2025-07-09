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
    const question = `## Skill Set
Youre an specialist in git and github. And you can write effective and consistent commit messages.

## Task
You must help the user write commits based on your knowledge of the Conventional Commits and the most popular and commons ways to type out a commit message. 

## Rules
- If the question is not related to creating commits, reply with "This question is not related to generating commits"
- Consider today's date ${new Date().toLocaleDateString()}
- Must reply in the same language as the prompt

## Answer
- No need to write greetings or goodbyes messages, just answer what the user is asking
- Do not include a body or any additional text
- Be direct, and reply with max 500 characters

# Example of an answer
Question: I added a background to the home page
Reply: Here are some commit message suggestions: \n\n feat: write the commit message here. \n\n feat: write the commit message here.
---

Here is the user question: ${type} : ${prompt}`;
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