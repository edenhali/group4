const acceptButton = document.querySelector('button[value="accept"]');
const rejectButton = document.querySelector('button[value="reject"]');
const commentInput = document.getElementById('comment-input');
const sendButton = document.querySelector('button[value="submit"]');
const chatForm = document.getElementById('chat-form');

let lastClickedButton = null;

acceptButton.addEventListener('mousedown', function () {
    if (lastClickedButton !== acceptButton) {
        if (lastClickedButton) {
            lastClickedButton.style.transform = 'none';
            lastClickedButton.disabled = false;
            lastClickedButton.classList.remove('selected');
        }
        lastClickedButton = acceptButton;
        acceptButton.style.transform = 'scale(1.1)';
        acceptButton.classList.add('selected');
        acceptButton.disabled = true;
    }
});

acceptButton.addEventListener('mouseup', function () {
    acceptButton.classList.remove('selected');
});

rejectButton.addEventListener('mousedown', function () {
    if (lastClickedButton !== rejectButton) {
        if (lastClickedButton) {
            lastClickedButton.style.transform = 'none';
            lastClickedButton.disabled = false;
            lastClickedButton.classList.remove('selected');
        }
        lastClickedButton = rejectButton;
        rejectButton.style.transform = 'scale(1.1)';
        rejectButton.classList.add('selected');
        rejectButton.disabled = true;
    }
});

rejectButton.addEventListener('mouseup', function () {
    rejectButton.classList.remove('selected');
});

