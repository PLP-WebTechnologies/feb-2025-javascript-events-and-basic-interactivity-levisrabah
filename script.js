document.addEventListener('DOMContentLoaded', function() {
 
    // Click Event
    const clickBox = document.getElementById('clickBox');
    clickBox.addEventListener('click', function() {
        this.textContent = 'Clicked!';
        this.style.backgroundColor = '#e74c3c';
        
        // Reset after 1 second
        setTimeout(() => {
            this.textContent = 'Click me!';
            this.style.backgroundColor = '#3498db';
        }, 1000);
    });
    
    // Hover Event
    const hoverBox = document.getElementById('hoverBox');
    hoverBox.addEventListener('mouseenter', function() {
        this.textContent = 'Mouse entered!';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me!';
    });
    
    // Keypress Event
    const keypressBox = document.getElementById('keypressBox');
    keypressBox.setAttribute('tabindex', '0'); // Make it focusable
    
    keypressBox.addEventListener('keydown', function(e) {
        this.textContent = `Key pressed: ${e.key}`;
        this.style.backgroundColor = '#f39c12';
        
        setTimeout(() => {
            this.textContent = 'Press any key while focused';
            this.style.backgroundColor = '#3498db';
        }, 1000);
    });
    
    // Secret Event (Double click or long press)
    const secretBox = document.getElementById('secretBox');
    let pressTimer;
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            activateSecret();
        }, 1000); // 1 second long press
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('dblclick', activateSecret);
    
    function activateSecret() {
        secretBox.classList.add('secret-activated');
        secretBox.textContent = 'Secret activated! 🎉';
        
        setTimeout(() => {
            secretBox.classList.remove('secret-activated');
            secretBox.textContent = 'Double click or long press me!';
        }, 2000);
    }
    
    // ========== Interactive Elements ==========
    
    // Color Changing Button
    const colorChanger = document.getElementById('colorChanger');
    const colors = ['#2ecc71', '#e74c3c', '#3498db', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.add('hidden'));
        galleryImages[index].classList.remove('hidden');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update contents
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            strengthBar.style.width = '0';
            strengthText.textContent = '';
        } else {
            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }
    });
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#2ecc71';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = '';
            emailInput.style.borderColor = '#ddd';
            return true; // Email is optional in this example
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#2ecc71';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            passwordError.textContent = '';
            passwordInput.style.borderColor = '#ddd';
            updatePasswordStrength(0);
            return true; // Password is optional in this example
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.style.borderColor = '#e74c3c';
            updatePasswordStrength(0);
            return false;
        } else {
            passwordError.textContent = '';
            passwordInput.style.borderColor = '#2ecc71';
            
            // Calculate password strength
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            updatePasswordStrength(strength);
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        const strengthLevels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        const colors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71', '#27ae60'];
        
        const width = strength * 25;
        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = colors[strength];
        strengthText.textContent = strength > 0 ? strengthLevels[strength] : '';
    }
});