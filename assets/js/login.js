document.addEventListener("DOMContentLoaded", function() {
    function updateNav() {
        const token = localStorage.getItem("token");
        const authLink = document.getElementById("auth-link");

        if (token) {
            authLink.innerHTML = '<a href="#" class="nav__link"><button id="open-overlay">Profile</button></a>';
        } else {
            authLink.innerHTML = '<a href="auth.html" class="nav__link">Login/Register</a>';
        }
    }
    localStorage.setItem("token", "jwt-token");
    updateNav();
});
