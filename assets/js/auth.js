function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.classList.toggle('show-register');
}

// Password visibility toggle for login form
const loginPasswordToggle = document.getElementById('loginPasswordToggle');
const loginPassword = document.getElementById('loginPassword');

loginPasswordToggle.addEventListener('click', function () {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Password visibility toggle for register form
const registerPasswordToggles = [document.getElementById('registerPasswordToggle'), document.getElementById('confirmPasswordToggle')];
const registerPasswords = [document.getElementById('registerPassword'), document.getElementById('confirmPassword')];

registerPasswordToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', function () {
        const type = registerPasswords[index].getAttribute('type') === 'password' ? 'text' : 'password';
        registerPasswords[index].setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Form submissions
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple frontend validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Frontend validation
    if (!username || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Mock successful registration
    alert('Registration successful! Please login.');
    toggleForm(); // Switch back to login form
});


//sending info to php

function register() {
    $.ajax({
        type: 'POST',
        url: '../register.php',
        data: {
            name: $('#username').val(),
            email: $('#registerEmail').val(),
            pass: $('#registerPassword').val(),
        },
        success: function(res) {
            const user = JSON.parse(res);
            console.log(user);
            user[0] = document.getElementById("username");
            user[1] = document.getElementById("email");
        }
    });
}

function login() {
    $.ajax({
        type: 'POST',
        url: '../login.php',
        data: {
            email: $('#loginEmail').val(),
            pass: $('#loginPassword').val(),
        },
        success: function(res) {
            console.log(res);
            if (res.trim() == "true") {
                alert("successfully logged-in");
                window.location.href = 'iindex.html';
            } else if (res.trim() == "false") {
                alert("check your credentials");
            }
            else{
                alert ("email not found please register");
            }
        }
    });
}