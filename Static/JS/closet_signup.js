const form = document.querySelector('.signupContainer');
const emailInput = document.getElementById('email');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const passwordInput = document.getElementById('password');
const cityInput = document.getElementById('city');
const pictureInput = document.getElementById('picture');
const phoneNumberInput = document.getElementById('phoneNumber');
const dobInput = document.getElementById('dob');
const signupBtn = document.getElementById('signupBtn');
const facebookBtn = document.getElementsByClassName('facebook');
const googleBtn = document.getElementsByClassName('google');
const errorMsg = document.querySelector('.errorMsg');
const userList = document.querySelector('.users');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.submitter === signupBtn) {
        const email = emailInput.value;
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const password = passwordInput.value;
        const city = cityInput.value;
        const picture = pictureInput.value;
        const phoneNumber = phoneNumberInput.value;
        const dob = dobInput.value;
        if (!isValidEmail(email)) {
            errorMsg.textContent = 'Please enter a valid email';
            return;
        }
        if (!isValidName(firstName)) {
            errorMsg.textContent = 'Please enter a valid first name';
            return;
        }
        if (!isValidName(lastName)) {
            errorMsg.textContent = 'Please enter a valid last name';
            return;
        }
        if (!isValidPassword(password)) {
            errorMsg.textContent = 'Password must be at least 8 characters long and not contain spaces';
            return;
        }
        if (!city) {
            errorMsg.textContent = 'Please select a city';
            return;
        }
        if (!picture) {
            errorMsg.textContent = 'Please choose a profile picture';
            return;
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            errorMsg.textContent = 'Please enter a valid phone number';
            return;
        }
        if (!isValidDate(dob)) {
            errorMsg.textContent = 'Please enter a valid birthdate-only 16+ can sign up';
            return;
        } else {
            errorMsg.textContent = ''
            alert('Welcome! The registration was successful');
            window.location.href = "closet_userCloset.html";
        }
    }
    if (e.submitter === facebookBtn) {
        window.location.href = "https://www.facebook.com/";
    }
    if (e.submitter === googleBtn) {
        window.location.href = "https://mail.google.com/mail/u/0/#inbox";
    }
});

function isValidEmail(email) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
}

function isValidName(name) {
    const validFirstName = /^[a-zA-Z\s]+$/;
    return validFirstName.test(name);
}

function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }
    for (let i = 0; i < password.length; i++) {
        if (password[i] === " ") {
            return false;
        }
    }
    return true;
}

function isValidPhoneNumber(phoneNumber) {
    const validPhoneNumber = /^\d{10}$/;
    return validPhoneNumber.test(phoneNumber);
}

function isValidDate(dateString) {
    const validate = new Date(dateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - validate.getFullYear();
    const monthDiff = currentDate.getMonth() - validate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < validate.getDate())) {
        age--
    }
    if (age < 16)
        return false;
    return true;
}


