// Contact Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Pre-fill form from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const message = urlParams.get('message');
    
    if (subject) {
        const subjectField = document.getElementById('subject');
        if (subjectField) {
            subjectField.value = decodeURIComponent(subject);
            // Trigger the floating label effect
            subjectField.classList.add('has-value');
        }
    }
    
    if (message) {
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.value = decodeURIComponent(message);
            // Trigger the floating label effect
            messageField.classList.add('has-value');
            // Auto-resize textarea to fit content
            messageField.style.height = 'auto';
            messageField.style.height = messageField.scrollHeight + 'px';
        }
    }
    
    // Add visual indicator that form has been pre-filled
    if (subject || message) {
        const form = document.getElementById('contactForm');
        if (form) {
            // Add a subtle highlight animation
            form.style.animation = 'highlightForm 2s ease-out';
            
            // Show a notification
            const notification = document.createElement('div');
            notification.className = 'form-notification success';
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Ihre Anfrage wurde vorbereitet. Bitte ergänzen Sie noch Ihre Kontaktdaten.';
            form.insertBefore(notification, form.firstChild);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formGroups = contactForm.querySelectorAll('.form-group.floating-label');
    
    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            // Validate on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Remove error on input
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    group.classList.remove('error');
                }
            });
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all required fields
        formGroups.forEach(group => {
            const input = group.querySelector('input[required], textarea[required]');
            if (input && !validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Remove all validation classes
            formGroups.forEach(group => {
                group.classList.remove('valid', 'error');
            });
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Validate individual field
    function validateField(input) {
        const group = input.closest('.form-group');
        const value = input.value.trim();
        const errorMessage = group.querySelector('.error-message');
        
        // Reset classes
        group.classList.remove('error', 'valid');
        
        // Check if required and empty
        if (input.hasAttribute('required') && value === '') {
            group.classList.add('error');
            // Set error message for empty field
            if (errorMessage && errorMessage.hasAttribute('data-empty')) {
                errorMessage.textContent = errorMessage.getAttribute('data-empty');
            }
            return false;
        }
        
        // Email validation
        if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                group.classList.add('error');
                // Set error message for invalid email
                if (errorMessage && errorMessage.hasAttribute('data-invalid')) {
                    errorMessage.textContent = errorMessage.getAttribute('data-invalid');
                }
                return false;
            }
        }
        
        // Field is valid
        if (value !== '') {
            group.classList.add('valid');
        }
        
        return true;
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;
            
            if (elementTop < viewportHeight - 100 && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };

    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
}); 