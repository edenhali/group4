const searchInputs = document.querySelectorAll('.search_input select');
const findButton = document.querySelector('#find');
const form = document.querySelector('.formContainer');
const searchByNameButton = document.querySelector('#searchByNameBtm');
const searchByNameInput = document.querySelector('#searchByName');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter === findButton) {
        let selected = false;
        searchInputs.forEach((input) => {
            if (input.value !== '') {
                selected = true;
            }
        });
        if (!selected) {
            alert('Please select at least one option.');
        } else {
            window.location.href = "search_res.html";
        }
    }
    if (e.submitter === searchByNameButton) {
        if (searchByNameInput.value === '') {
            alert('please write user name ')
        } else {
            window.location.href = "closet_userCloset.html";
        }
    }
});

fetch('toolbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('toolbar-container').innerHTML = html;
    });