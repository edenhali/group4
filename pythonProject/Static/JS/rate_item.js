const ratingContainers = document.querySelectorAll('.rating');
const submitButton = document.querySelector('button[type="submit"]');
const ratingDisplayContainer = document.createElement('div');
const checkbox = document.getElementById('Checkbox');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    let isAllFieldsFilled = true;

    ratingContainers.forEach(function (ratingContainer) {
        if (!ratingContainer.querySelector('input:checked')) {
            isAllFieldsFilled = false;
        }
    });

    if (!checkbox.checked || !isAllFieldsFilled) {
        alert('Please fill all fields before submitting.');
    } else {
        alert('Thank you.');
        ratingContainers.forEach(function (ratingContainer) {
            const ratingValue = ratingContainer.querySelector('input:checked').value;
            const ratingText = ratingContainer.querySelector('label[for="' + ratingContainer.querySelector('input:checked').id + '"]').textContent;
            const ratingDisplay = document.createElement('p');
            ratingDisplayContainer.appendChild(ratingDisplay);
            ratingContainer.classList.add('readonly');
            ratingContainer.querySelectorAll('input').forEach(function (input) {
                input.disabled = true;
            });
            ratingContainer.querySelectorAll('label').forEach(function (label) {
                label.style.pointerEvents = 'none';
            });
        });

        checkbox.disabled = true;
        checkbox.parentNode.classList.add('readonly');

        const currentChat = document.querySelector('.current-chat');
        currentChat.insertBefore(ratingDisplayContainer, currentChat.lastElementChild);

        submitButton.style.display = 'none';
    }
});

