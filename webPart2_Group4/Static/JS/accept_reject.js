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
            lastClickedButton.style.color = 'white';
        }
        lastClickedButton = acceptButton;
        acceptButton.style.transform = 'scale(1.1)';
        acceptButton.style.color = 'black';
        acceptButton.disabled = true;
    }
});

acceptButton.addEventListener('mouseup', function () {
    acceptButton.style.color = 'white';
});

rejectButton.addEventListener('mousedown', function () {
    if (lastClickedButton !== rejectButton) {
        if (lastClickedButton) {
            lastClickedButton.style.transform = 'none';
            lastClickedButton.disabled = false;
            lastClickedButton.style.color = 'white';
        }
        lastClickedButton = rejectButton;
        rejectButton.style.transform = 'scale(1.1)';
        rejectButton.style.color = 'black';
        rejectButton.disabled = true;
    }
});

rejectButton.addEventListener('mouseup', function () {
    rejectButton.style.color = 'white';
});

sendButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (lastClickedButton === null) {
        alert("Please select either Accept or Reject before sending the message.");
    } else {
        alert("Message sent successfully!");
        acceptButton.disabled = true;
        rejectButton.disabled = true;
        commentInput.disabled = true;
        sendButton.style.display = 'none';
        const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();
        // Create a paragraph element to display the date and time
        const dateTimeDisplay = document.createElement('p');
        dateTimeDisplay.textContent = 'Sent on: ' + dateTime;
        // Append the date and time display to the current chat
        const currentChat = document.querySelector('.current-chat');
        currentChat.appendChild(dateTimeDisplay);
    }
});

fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });