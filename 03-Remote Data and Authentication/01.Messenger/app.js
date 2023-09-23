const url = `http://localhost:3030/jsonstore/messenger`;
const message = document.getElementById('messages');

function attachEvents() {
    const submitBtn = document.getElementById('submit')
    submitBtn.addEventListener('click', postMessage);
    const refreshBtn = document.getElementById('refresh')
    refreshBtn.addEventListener('click', loadMessage);
}

async function postMessage() {

    const [authorInput, contentInput] = [document.getElementById('author'), document.getElementById('content')];

    if (authorInput.value !== '' && contentInput.value !== '') {
        await request(url, {author: authorInput.value, content: contentInput.value});
        authorInput.value = '';
        contentInput.value = '';
    }

}

async function loadMessage() {
    const res = await fetch(url);
    const data = await res.json();

    message.value = Object.values(data).map(({ author, content }) => `${author}: ${content}`).join('\n');

}

async function request(url, option) {
    if (option) {
        option = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(option)
        }
    }

    const res = await fetch(url, option);
    return res;
}


attachEvents();