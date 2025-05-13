// DOM Elements
const loginBtn = document.querySelector('.btn-login');
const registerBtn = document.querySelector('.btn-register');
const loginModal = document.getElementById('loginModal');
const closeButton = document.querySelector('.close-button');
const loginLink = document.getElementById('loginLink');
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Form validation for registration
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAgree = document.getElementById('termsAgree').checked;
    
    // Simple validation
    if (fullName === '') {
        showError('Please enter your full name');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!termsAgree) {
        showError('You must agree to the Terms and Conditions');
        return;
    }
    
    // If all validations pass
    showSuccess('Account created successfully! Redirecting to login...');
    
    // Simulate account creation and redirection
    setTimeout(() => {
        registrationForm.reset();
        loginModal.style.display = 'block';
    }, 2000);
});

// Login form handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address', true);
        return;
    }
    
    if (password === '') {
        showError('Please enter your password', true);
        return;
    }
    
    // Simulate login success
    showSuccess('Login successful! Redirecting...', true);
    
    // In a real application, you would send the credentials to a server
    setTimeout(() => {
        loginForm.reset();
        loginModal.style.display = 'none';
        // Redirect to dashboard or home page
    }, 2000);
});

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message, isLoginForm = false) {
    // Remove any existing messages
    removeMessages();
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#ff3860';
    errorElement.style.backgroundColor = '#feecf0';
    errorElement.style.padding = '10px';
    errorElement.style.borderRadius = '4px';
    errorElement.style.marginBottom = '20px';
    errorElement.textContent = message;
    
    const targetForm = isLoginForm ? loginForm : registrationForm;
    targetForm.insertBefore(errorElement, targetForm.firstChild);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function showSuccess(message, isLoginForm = false) {
    // Remove any existing messages
    removeMessages();
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.style.color = '#257953';
    successElement.style.backgroundColor = '#effaf5';
    successElement.style.padding = '10px';
    successElement.style.borderRadius = '4px';
    successElement.style.marginBottom = '20px';
    successElement.textContent = message;
    
    const targetForm = isLoginForm ? loginForm : registrationForm;
    targetForm.insertBefore(successElement, targetForm.firstChild);
}

function removeMessages() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(message => message.remove());
}

// Responsive Navigation for mobile devices
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.header');
        
        // Check if mobile menu button already exists
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                display: none;
                position: absolute;
                top: 16px;
                right: 20px;
            `;
            
            header.appendChild(mobileMenuBtn);
            
            mobileMenuBtn.addEventListener('click', () => {
                const nav = document.querySelector('.navigation');
                const authButtons = document.querySelector('.auth-buttons');
                
                nav.classList.toggle('active');
                authButtons.classList.toggle('active');
            });
        }
    }
};

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
});

// Update on window resize
window.addEventListener('resize', createMobileMenu);