// Rental Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rentalCards = document.querySelectorAll('.rental-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Filter cards
            rentalCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Quantity selector functionality
    const qtyButtons = document.querySelectorAll('.qty-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    // Plus/Minus buttons
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const input = document.querySelector(`.quantity-input[data-product="${product}"]`);
            let currentValue = parseInt(input.value) || 0;
            const max = parseInt(input.getAttribute('max'));
            const min = parseInt(input.getAttribute('min'));
            
            if (this.classList.contains('plus')) {
                if (currentValue < max) {
                    input.value = currentValue + 1;
                }
            } else if (this.classList.contains('minus')) {
                if (currentValue > min) {
                    input.value = currentValue - 1;
                }
            }
        });
    });
    
    // Direct input validation
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const max = parseInt(this.getAttribute('max'));
            const min = parseInt(this.getAttribute('min'));
            let value = parseInt(this.value) || 0;
            
            if (value > max) {
                this.value = max;
            } else if (value < min) {
                this.value = min;
            }
        });
    });
    
    // Inquiry button functionality
    const inquiryBtns = document.querySelectorAll('.btn-inquiry');
    
    inquiryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const quantityInput = document.querySelector(`.quantity-input[data-product="${product}"]`);
            const quantity = parseInt(quantityInput.value) || 0;
            let color = '';
            const colorSelect = document.querySelector(`.color-select[data-product="${product}"]`);
            if (colorSelect) {
                color = colorSelect.value;
            }
            // Collect all selected products
            const selectedProducts = [];
            document.querySelectorAll('.quantity-input').forEach(input => {
                const qty = parseInt(input.value) || 0;
                if (qty > 0) {
                    const prod = input.getAttribute('data-product');
                    let col = '';
                    const sel = document.querySelector(`.color-select[data-product="${prod}"]`);
                    if (sel) col = sel.value;
                    selectedProducts.push({
                        product: prod,
                        quantity: qty,
                        color: col
                    });
                }
            });
            if (selectedProducts.length === 0 && quantity > 0) {
                selectedProducts.push({
                    product: product,
                    quantity: quantity,
                    color: color
                });
            } else if (selectedProducts.length === 0) {
                alert('Bitte wählen Sie mindestens eine Anzahl aus.');
                return;
            }
            let message = 'Ich interessiere mich für folgende Mietmöbel:\n\n';
            selectedProducts.forEach(item => {
                message += `- ${item.product}: ${item.quantity} Stück`;
                if(item.color) message += `, Farbe: ${item.color}`;
                message += '\n';
            });
            message += '\nBitte senden Sie mir ein Angebot zu.';
            const encodedMessage = encodeURIComponent(message);
            const subject = encodeURIComponent('Anfrage Möbelvermietung');
            window.location.href = `Contact.html?service=moebelverleih&subject=${subject}&message=${encodedMessage}`;
        });
    });
    
    // Floating Action Button für Sammelanfrage
    const fab = document.createElement('button');
    fab.className = 'fab-sammelanfrage';
    fab.title = 'Sammelanfrage senden';
    fab.innerHTML = '<i class="fas fa-cart-plus"></i><span class="fab-badge" style="display:none"></span>';
    document.body.appendChild(fab);

    // Funktion zum Anzeigen/Verstecken und Badge aktualisieren
    function updateFab() {
        const selected = Array.from(quantityInputs).reduce((sum, input) => sum + (parseInt(input.value) || 0), 0);
        if (selected > 0) {
            fab.classList.add('show');
            const badge = fab.querySelector('.fab-badge');
            badge.style.display = 'flex';
            badge.textContent = selected;
        } else {
            fab.classList.remove('show');
            fab.querySelector('.fab-badge').style.display = 'none';
        }
    }
    quantityInputs.forEach(input => {
        input.addEventListener('input', updateFab);
        input.addEventListener('change', updateFab);
    });
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', () => setTimeout(updateFab, 10));
    });
    // Klick auf FAB = gleiche Funktion wie selectAllBtn
    fab.addEventListener('click', function() {
        const selectedProducts = [];
        document.querySelectorAll('.quantity-input').forEach(input => {
            const qty = parseInt(input.value) || 0;
            if (qty > 0) {
                const product = input.getAttribute('data-product');
                let color = '';
                const colorSelect = document.querySelector(`.color-select[data-product="${product}"]`);
                if (colorSelect) {
                    color = colorSelect.value;
                }
                selectedProducts.push({
                    product,
                    quantity: qty,
                    color
                });
            }
        });
        if (selectedProducts.length === 0) {
            alert('Bitte wählen Sie mindestens einen Artikel mit Anzahl aus.');
            return;
        }
        let message = 'Ich interessiere mich für folgende Mietmöbel:\n\n';
        selectedProducts.forEach(item => {
            message += `- ${item.product}: ${item.quantity} Stück`;
            if(item.color) message += `, Farbe: ${item.color}`;
            message += '\n';
        });
        message += '\nBitte senden Sie mir ein Angebot zu.';
        const encodedMessage = encodeURIComponent(message);
        const subject = encodeURIComponent('Anfrage Möbelvermietung - Mehrere Artikel');
        window.location.href = `Contact.html?service=moebelverleih&subject=${subject}&message=${encodedMessage}`;
    });
    
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
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation when changing filters
    function showLoading() {
        document.querySelector('.rental-grid').classList.add('loading');
        setTimeout(() => {
            document.querySelector('.rental-grid').classList.remove('loading');
        }, 300);
    }
    
    // Call loading animation on filter change
    filterBtns.forEach(btn => {
        btn.addEventListener('click', showLoading);
    });
}); 