const signUpButton = document.getElementById("signUpButton");
const form = document.querySelector('.signInContainer')
const emailInput = document.getElementById('Email');
const passwordInput = document.getElementById('password');
const errorMsg = document.querySelector('.errorMsg');
const signInButton = document.getElementById("signInButton");

signUpButton.addEventListener("click", function () {
    window.location.href = "closet_signup.html";
});

class User {
    constructor(email, firstName, lastName, password, city, picture, phoneNumber, dob) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.city = city;
        this.picture = picture;
        this.phoneNumber = phoneNumber;
        this.dob = new Date(dob);
        this.joinDate = new Date();
    }
}

const users = [
    {
        email: 'edenhaliva1910@gmail.com',
        firstName: 'Roni',
        lastName: 'Chen',
        password: '12345678',
        city: 'Nahariya',
        picture: 'photosFolder/profile.jfif',
        phoneNumber: '0527967566',
        dob: new Date('1988-04-03'),
        joinDate: new Date()
    },
    {
        email: 'barEzra@gmail.com',
        firstName: 'Noa',
        lastName: 'Bar',
        password: '12121212',
        city: 'Nesher',
        picture: 'photosFolder/profile.jfif',
        phoneNumber: '0527967586',
        dob: new Date('1988-04-04'),
        joinDate: new Date()
    }
];

signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    const email = emailInput.value;
    const password = passwordInput.value;
    let isUser = false;
    if (!isValidEmail(email)) {
        errorMsg.textContent = 'Please enter a valid email';
        return;
    }
    if (!isValidPassword(password)) {
        errorMsg.textContent = 'Password must be at least 8 characters long and not contain spaces';
        return;
    } else {
        for (let i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                alert('welcome')
                isUser = true;
                window.location.href = "closet_userCloset.html";
                break;
            }
            if (email === users[i].email && password !== users[i].password) {
                alert('Incorrect password !')
                isUser = true;
                break;
            }
        }
        if (!isUser) {
            alert('No user found for the entered details! Check the input or register');
        }
    }
})

function isValidEmail(email) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
}

function isValidPassword(password) {
    const validPassword = /^\S{8,}$/;
    return validPassword.test(password);
}


