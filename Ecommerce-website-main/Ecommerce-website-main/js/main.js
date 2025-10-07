// This file contains the main JavaScript functionality for the eCommerce website.

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();

    // Event listeners for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('href');
            loadPage(targetPage);
        });
    });

    // Function to initialize the application
    function initApp() {
        console.log('Application initialized');
        // Load the default page (home or profile)
        loadPage('index.html');
    }

    // Function to load a page dynamically
    function loadPage(page) {
        const contentDiv = document.getElementById('content');
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                contentDiv.innerHTML = html;
                console.log(`${page} loaded successfully`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Example function to handle user login
    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate a login process
        if (username === 'user' && password === 'pass') {
            alert('Login successful!');
            loadPage('profile.html');
        } else {
            alert('Invalid credentials, please try again.');
        }
    }

    // Example function to handle adding items to the cart
    function addToCart(productId) {
        console.log(`Product ${productId} added to cart`);
        // Logic to add the product to the cart
    }

    // Example function to handle user logout
    function handleLogout() {
        alert('You have been logged out.');
        loadPage('index.html');
    }
});