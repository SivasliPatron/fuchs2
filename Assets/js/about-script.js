// About Page Specific Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced error handling and debugging
    console.log('About-script.js loaded successfully');

    // CSS Fallback variables injection for better compatibility
    const injectCSSVariables = () => {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-color: #007AFF;
                --secondary-color: #5AC8FA;
                --text-color: #1D1D1F;
                --bg-color: #F5F5F7;
                --border-color: #D2D2D7;
            }
        `;
        document.head.appendChild(style);
    };
    injectCSSVariables();

    // Animate numbers when they come into view
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const animateCounter = (counter) => {
        try {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(counter), 1);
            } else {
                counter.innerText = target;
            }
        } catch (error) {
            console.error('Error animating counter:', error);
        }
    };    // Enhanced Intersection Observer for counters with error handling
    if (window.IntersectionObserver) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                try {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                } catch (error) {
                    console.error('Error in counter observer:', error);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            if (counter) {
                counterObserver.observe(counter);
            }
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        console.warn('IntersectionObserver not supported, using fallback');
        counters.forEach(counter => {
            if (counter) {
                animateCounter(counter);
            }
        });
    }    // Enhanced animate elements on scroll with better error handling
    const animateOnScroll = () => {
        try {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            elements.forEach(element => {
                if (!element) return;
                
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const viewportHeight = window.innerHeight;
                
                if (elementTop < viewportHeight - 100 && elementBottom > 0) {
                    element.classList.add('animated');
                }
            });
        } catch (error) {
            console.error('Error in animateOnScroll:', error);
        }
    };

    // Initial check
    animateOnScroll();
    
    // Check on scroll with throttling for better performance
    let scrollTicking = false;
    const handleScroll = () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                animateOnScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });    // Enhanced Timeline Animation with comprehensive error handling
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log(`Found ${timelineItems.length} timeline items`);
    
    if (timelineItems.length > 0) {
        // Enhanced Intersection Observer für Timeline Items
        if (window.IntersectionObserver) {
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    try {
                        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                            // Mark as animated to prevent duplicate animations
                            entry.target.setAttribute('data-animated', 'true');
                            
                            // Verzögerte Animation für besseren Effekt
                            setTimeout(() => {
                                if (entry.target) {
                                    entry.target.classList.add('visible');
                                    entry.target.style.opacity = '1';
                                    entry.target.style.transform = 'translateY(0)';
                                    console.log(`Timeline item ${index + 1} animated`);
                                }
                            }, index * 200); // 200ms Verzögerung zwischen Items
                        }
                    } catch (error) {
                        console.error('Error in timeline observer:', error);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            });
            
            // Initialisiere Timeline Items mit besserer Fehlerbehandlung
            timelineItems.forEach((item, index) => {
                try {
                    if (item) {
                        // Setze initiale Stile für Animation
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(50px)';
                        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        
                        // Beobachte jedes Timeline Item
                        timelineObserver.observe(item);
                    }
                } catch (error) {
                    console.error(`Error initializing timeline item ${index}:`, error);
                }
            });
        } else {
            console.warn('IntersectionObserver not supported for timeline');
            // Fallback for older browsers
            timelineItems.forEach((item, index) => {
                if (item) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 300);
                }
            });
        }
    } else {
        console.warn('No timeline items found');
    }
      // Enhanced Timeline Line Animation with comprehensive error handling
    const timelineLine = document.querySelector('.timeline-line');
    const timelineSection = document.querySelector('.timeline-section');
    
    if (timelineLine && timelineSection) {
        console.log('Timeline line and section found, initializing animation');
        
        // Initial styling with fallbacks
        timelineLine.style.transition = 'all 0.3s ease-out';
        timelineLine.style.background = 'rgba(0, 122, 255, 0.2)';
        timelineLine.style.width = '2px';
        timelineLine.style.position = 'absolute';
        timelineLine.style.left = '50%';
        timelineLine.style.top = '0';
        timelineLine.style.bottom = '0';
        timelineLine.style.transform = 'translateX(-50%)';
        
        const animateTimelineLine = () => {
            try {
                const sectionTop = timelineSection.offsetTop;
                const sectionHeight = timelineSection.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollY = window.scrollY;
                
                // Berechne wie weit die Timeline sichtbar ist
                const visibleStart = Math.max(0, scrollY + windowHeight - sectionTop);
                const visiblePercentage = Math.min(Math.max(visibleStart / sectionHeight, 0), 1);
                
                // Animiere die Linie basierend auf Scroll-Position
                if (visiblePercentage > 0) {
                    const primaryColor = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color').trim() || '#007AFF';
                    
                    timelineLine.style.background = `linear-gradient(to bottom, 
                        ${primaryColor} 0%, 
                        ${primaryColor} ${visiblePercentage * 100}%, 
                        rgba(0, 122, 255, 0.2) ${visiblePercentage * 100}%, 
                        rgba(0, 122, 255, 0.2) 100%)`;
                    timelineLine.style.boxShadow = `0 0 15px rgba(0, 122, 255, ${0.3 * visiblePercentage})`;
                }
            } catch (error) {
                console.error('Error in timeline line animation:', error);
            }
        };
        
        // Throttled scroll event für bessere Performance
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    animateTimelineLine();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initiale Animation mit Verzögerung
        setTimeout(() => {
            animateTimelineLine();
            console.log('Timeline line initial animation completed');
        }, 500);
    } else {
        console.warn('Timeline line or section not found:', {
            timelineLine: !!timelineLine,
            timelineSection: !!timelineSection
        });
    }    // Enhanced Timeline Item Interactivity with comprehensive error handling
    if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            try {
                const content = item.querySelector('.timeline-content');
                const icon = item.querySelector('.timeline-icon');
                
                if (content && icon) {
                    // Enhanced hover effects with fallbacks
                    item.addEventListener('mouseenter', () => {
                        try {
                            content.style.transform = 'translateY(-8px)';
                            content.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                            content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                            
                            icon.style.transform = 'translate(-50%, -50%) scale(1.15)';
                            icon.style.backgroundColor = 'var(--primary-color, #007AFF)';
                            icon.style.color = 'white';
                            icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                            icon.style.boxShadow = '0 8px 25px rgba(0, 122, 255, 0.3)';
                        } catch (error) {
                            console.error(`Error in mouseenter for timeline item ${index}:`, error);
                        }
                    });
                    
                    item.addEventListener('mouseleave', () => {
                        try {
                            content.style.transform = 'translateY(0)';
                            content.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                            
                            icon.style.transform = 'translate(-50%, -50%) scale(1)';
                            icon.style.backgroundColor = 'white';
                            icon.style.color = 'var(--primary-color, #007AFF)';
                            icon.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        } catch (error) {
                            console.error(`Error in mouseleave for timeline item ${index}:`, error);
                        }
                    });
                    
                    // Enhanced click animation
                    item.addEventListener('click', () => {
                        try {
                            // Kurze Pulse-Animation mit besserer Sichtbarkeit
                            icon.style.animation = 'timelinePulse 0.6s ease-in-out';
                            content.style.animation = 'timelineContentPulse 0.6s ease-in-out';
                            
                            setTimeout(() => {
                                if (icon) icon.style.animation = '';
                                if (content) content.style.animation = '';
                            }, 600);
                            
                            console.log(`Timeline item ${index + 1} clicked`);
                        } catch (error) {
                            console.error(`Error in click for timeline item ${index}:`, error);
                        }
                    });
                } else {
                    console.warn(`Timeline item ${index} missing content or icon:`, {
                        hasContent: !!content,
                        hasIcon: !!icon
                    });
                }
            } catch (error) {
                console.error(`Error setting up timeline item ${index}:`, error);
            }
        });
    }    // Enhanced CSS animations injection with comprehensive keyframes
    const style = document.createElement('style');
    style.textContent = `
        /* Enhanced Timeline Animations */
        @keyframes timelinePulse {
            0% { 
                transform: translate(-50%, -50%) scale(1); 
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.25); 
                box-shadow: 0 12px 35px rgba(0, 122, 255, 0.4);
                background-color: #007AFF !important;
                color: white !important;
            }
            100% { 
                transform: translate(-50%, -50%) scale(1); 
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
        }
        
        @keyframes timelineContentPulse {
            0% { 
                transform: translateY(0) scale(1); 
            }
            50% { 
                transform: translateY(-10px) scale(1.02); 
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2) !important;
            }
            100% { 
                transform: translateY(0) scale(1); 
            }
        }
        
        /* Smooth transitions for all timeline elements */
        .timeline-item .timeline-content {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            will-change: transform, box-shadow;
        }
        
        .timeline-item .timeline-icon {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            will-change: transform, background-color, box-shadow;
        }
        
        /* Enhanced timeline line styling */
        .timeline-line {
            will-change: background, box-shadow;
            border-radius: 2px;
        }
        
        /* Improved visibility for timeline items */
        .timeline-item {
            will-change: opacity, transform;
        }
        
        .timeline-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Better responsive behavior */
        @media (max-width: 768px) {
            .timeline-item .timeline-content {
                margin-left: 0 !important;
                padding: 1rem !important;
            }
            
            .timeline-item:hover .timeline-content {
                transform: translateY(-5px) !important;
            }
        }
        
        /* Accessibility improvements */
        .timeline-item:focus {
            outline: 2px solid var(--primary-color, #007AFF);
            outline-offset: 4px;
        }
        
        /* Loading state animation */
        @keyframes timelineItemLoad {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .timeline-item.loading {
            animation: timelineItemLoad 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
    `;
    document.head.appendChild(style);
      // Final initialization log
    console.log('About page timeline enhanced successfully with error handling');
    console.log('Timeline features:', {
        itemCount: timelineItems.length,
        hasTimelineLine: !!timelineLine,
        hasTimelineSection: !!timelineSection,
        intersectionObserverSupported: !!window.IntersectionObserver
    });
      // Mark as initialized to prevent duplicate initialization
    window.aboutScriptInitialized = true;
});

// Backup initialization for timeline if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, DOMContentLoaded will fire
    console.log('DOM is loading, waiting for DOMContentLoaded');
} else {
    // DOM is already loaded, run immediately
    console.log('DOM already loaded, running timeline initialization');
    setTimeout(() => {
        const aboutScript = document.querySelector('script[src*="about-script.js"]');
        if (aboutScript && !window.aboutScriptInitialized) {
            console.log('Running backup timeline initialization');
            window.aboutScriptInitialized = true;
            
            // Re-run essential timeline functions
            const timelineItems = document.querySelectorAll('.timeline-item');
            if (timelineItems.length > 0) {
                timelineItems.forEach((item, index) => {
                    if (item) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.classList.add('loading');
                    }
                });
            }
        }
    }, 100);
}

// Enhanced Timeline Features
    
    // Add progress indicator to timeline
    const addTimelineProgressIndicator = () => {
        try {
            const timelineContainer = document.querySelector('.timeline-container');
            if (timelineContainer && timelineItems.length > 0) {
                // Create progress indicator
                const progressIndicator = document.createElement('div');
                progressIndicator.className = 'timeline-progress-indicator';
                progressIndicator.innerHTML = `
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">
                        <span class="current-step">1</span> / <span class="total-steps">${timelineItems.length}</span>
                    </div>
                `;
                
                // Insert before timeline container
                timelineContainer.parentNode.insertBefore(progressIndicator, timelineContainer);
                
                // Add CSS for progress indicator
                const progressStyle = document.createElement('style');
                progressStyle.textContent = `
                    .timeline-progress-indicator {
                        position: fixed;
                        top: 50%;
                        right: 30px;
                        transform: translateY(-50%);
                        background: var(--bg-white);
                        padding: 16px;
                        border-radius: 50px;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                        border: 1px solid var(--border-light);
                        z-index: 100;
                        opacity: 0;
                        transform: translateY(-50%) translateX(100px);
                        transition: all 0.3s ease;
                    }
                    
                    .timeline-progress-indicator.visible {
                        opacity: 1;
                        transform: translateY(-50%) translateX(0);
                    }
                    
                    .progress-bar {
                        width: 4px;
                        height: 120px;
                        background: var(--border-light);
                        border-radius: 2px;
                        margin: 0 auto 12px;
                        overflow: hidden;
                    }
                    
                    .progress-fill {
                        width: 100%;
                        height: 0%;
                        background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
                        border-radius: 2px;
                        transition: height 0.3s ease;
                    }
                    
                    .progress-text {
                        text-align: center;
                        font-size: 0.9rem;
                        font-weight: 600;
                        color: var(--text-secondary);
                    }
                    
                    .current-step {
                        color: var(--primary-color);
                        font-size: 1rem;
                    }
                    
                    @media (max-width: 768px) {
                        .timeline-progress-indicator {
                            right: 15px;
                            padding: 12px;
                        }
                        .progress-bar {
                            height: 80px;
                        }
                    }
                `;
                document.head.appendChild(progressStyle);
                
                console.log('Timeline progress indicator added successfully');
            }
        } catch (error) {
            console.error('Error adding timeline progress indicator:', error);
        }
    };
    
    // Update progress indicator based on scroll position
    const updateTimelineProgress = () => {
        try {
            const progressIndicator = document.querySelector('.timeline-progress-indicator');
            const progressFill = document.querySelector('.progress-fill');
            const currentStepElement = document.querySelector('.current-step');
            
            if (progressIndicator && progressFill && currentStepElement) {
                const timelineSection = document.querySelector('.timeline-section');
                if (timelineSection) {
                    const sectionTop = timelineSection.offsetTop;
                    const sectionBottom = sectionTop + timelineSection.offsetHeight;
                    const scrollY = window.scrollY + window.innerHeight / 2;
                    
                    // Show/hide progress indicator
                    if (scrollY >= sectionTop - 200 && scrollY <= sectionBottom + 200) {
                        progressIndicator.classList.add('visible');
                        
                        // Calculate progress
                        const sectionProgress = Math.max(0, Math.min(1, 
                            (scrollY - sectionTop) / (sectionBottom - sectionTop)
                        ));
                        
                        progressFill.style.height = `${sectionProgress * 100}%`;
                        
                        // Update current step
                        let currentStep = 1;
                        timelineItems.forEach((item, index) => {
                            const itemTop = item.offsetTop + sectionTop;
                            if (scrollY >= itemTop) {
                                currentStep = index + 1;
                            }
                        });
                        
                        currentStepElement.textContent = currentStep;
                    } else {
                        progressIndicator.classList.remove('visible');
                    }
                }
            }
        } catch (error) {
            console.error('Error updating timeline progress:', error);
        }
    };
    
    // Add click to scroll functionality for timeline items
    const addTimelineNavigation = () => {
        try {
            timelineItems.forEach((item, index) => {
                const icon = item.querySelector('.timeline-icon');
                if (icon) {
                    icon.addEventListener('click', () => {
                        try {
                            // Add navigation feedback
                            icon.style.animation = 'timelinePulse 0.6s ease-in-out';
                            
                            // Smooth scroll to next timeline item
                            const nextIndex = (index + 1) % timelineItems.length;
                            const targetItem = timelineItems[nextIndex];
                            
                            if (targetItem) {
                                const targetTop = targetItem.offsetTop + 
                                    document.querySelector('.timeline-section').offsetTop - 100;
                                
                                window.scrollTo({
                                    top: targetTop,
                                    behavior: 'smooth'
                                });
                                
                                // Show notification
                                showTimelineNotification(`Zu ${targetItem.querySelector('.timeline-date').textContent} gesprungen`);
                            }
                            
                            setTimeout(() => {
                                if (icon) icon.style.animation = '';
                            }, 600);
                            
                            console.log(`Timeline navigation: clicked item ${index + 1}, scrolling to ${nextIndex + 1}`);
                        } catch (error) {
                            console.error(`Error in timeline navigation for item ${index}:`, error);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error setting up timeline navigation:', error);
        }
    };
    
    // Show timeline notification
    const showTimelineNotification = (message) => {
        try {
            const notification = document.createElement('div');
            notification.className = 'timeline-notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                background: var(--primary-color);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-weight: 600;
                font-size: 0.9rem;
                box-shadow: 0 8px 25px rgba(0, 122, 255, 0.3);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 250px;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 2.5 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 2500);
        } catch (error) {
            console.error('Error showing timeline notification:', error);
        }
    };
    
    // Enhanced parallax effect for timeline icons
    const addTimelineParallax = () => {
        try {
            const handleParallax = () => {
                timelineItems.forEach((item, index) => {
                    try {
                        const icon = item.querySelector('.timeline-icon');
                        const content = item.querySelector('.timeline-content');
                        
                        if (icon && content) {
                            const rect = item.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            
                            if (rect.top < windowHeight && rect.bottom > 0) {
                                // Calculate parallax offset
                                const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                                const parallaxOffset = (scrollProgress - 0.5) * 20;
                                
                                // Apply subtle parallax to icon
                                icon.style.transform = `translate(-50%, -50%) translateY(${parallaxOffset}px)`;
                                
                                // Add subtle rotation based on scroll
                                const rotation = parallaxOffset * 0.5;
                                content.style.transform = `translateY(${parallaxOffset * 0.3}px) rotate(${rotation * 0.1}deg)`;
                            }
                        }
                    } catch (error) {
                        console.error(`Error in parallax for timeline item ${index}:`, error);
                    }
                });
            };
            
            // Throttled parallax scroll handler
            let parallaxTicking = false;
            const onParallaxScroll = () => {
                if (!parallaxTicking) {
                    requestAnimationFrame(() => {
                        handleParallax();
                        updateTimelineProgress();
                        parallaxTicking = false;
                    });
                    parallaxTicking = true;
                }
            };
            
            window.addEventListener('scroll', onParallaxScroll, { passive: true });
            
            console.log('Timeline parallax effects added');
        } catch (error) {
            console.error('Error adding timeline parallax:', error);
        }
    };
    
    // Dynamic typing animation for timeline content
    const addTypingAnimation = () => {
        try {
            timelineItems.forEach((item, index) => {
                const content = item.querySelector('.timeline-content');
                const title = content.querySelector('h3');
                const paragraph = content.querySelector('p');
                
                if (title && paragraph) {
                    // Store original text
                    const originalTitle = title.textContent;
                    const originalParagraph = paragraph.textContent;
                    
                    // Clear content initially
                    title.textContent = '';
                    paragraph.textContent = '';
                    
                    // Add cursor class for typing effect
                    title.classList.add('typing-cursor');
                    
                    // Enhanced intersection observer for typing animation
                    const typingObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
                                entry.target.setAttribute('data-typed', 'true');
                                
                                // Delay based on item index for staggered effect
                                setTimeout(() => {
                                    startTypingAnimation(title, originalTitle, () => {
                                        title.classList.remove('typing-cursor');
                                        paragraph.classList.add('typing-cursor');
                                        
                                        setTimeout(() => {
                                            startTypingAnimation(paragraph, originalParagraph, () => {
                                                paragraph.classList.remove('typing-cursor');
                                            });
                                        }, 300);
                                    });
                                }, index * 200);
                                
                                typingObserver.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.5,
                        rootMargin: '0px 0px -100px 0px'
                    });
                    
                    typingObserver.observe(item);
                }
            });
            
            // Add CSS for typing cursor
            const typingStyle = document.createElement('style');
            typingStyle.textContent = `
                .typing-cursor::after {
                    content: '|';
                    animation: blink 1s infinite;
                    color: var(--primary-color);
                    font-weight: normal;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                
                .timeline-content.typing {
                    border-left: 4px solid var(--primary-color);
                    background: linear-gradient(135deg, var(--bg-white) 0%, rgba(0, 122, 255, 0.02) 100%);
                }
            `;
            document.head.appendChild(typingStyle);
            
            console.log('Timeline typing animation added');
        } catch (error) {
            console.error('Error adding typing animation:', error);
        }
    };
    
    // Typing animation function
    const startTypingAnimation = (element, text, callback) => {
        try {
            let index = 0;
            element.parentElement.classList.add('typing');
            
            const typeInterval = setInterval(() => {
                element.textContent = text.slice(0, index + 1);
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeInterval);
                    element.parentElement.classList.remove('typing');
                    if (callback) callback();
                }
            }, 50); // Typing speed
        } catch (error) {
            console.error('Error in typing animation:', error);
        }
    };
    
    // Add particle effects for timeline interactions
    const addTimelineParticles = () => {
        try {
            timelineItems.forEach((item, index) => {
                const icon = item.querySelector('.timeline-icon');
                if (icon) {
                    icon.addEventListener('mouseenter', () => {
                        createParticleEffect(icon);
                    });
                }
            });
            
            // CSS for particles
            const particleStyle = document.createElement('style');
            particleStyle.textContent = `
                .timeline-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 5;
                    animation: particleFloat 2s ease-out forwards;
                }
                
                @keyframes particleFloat {
                    0% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0) translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(particleStyle);
            
            console.log('Timeline particle effects added');
        } catch (error) {
            console.error('Error adding timeline particles:', error);
        }
    };
    
    // Create particle effect
    const createParticleEffect = (element) => {
        try {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'timeline-particle';
                
                const angle = (i / 8) * Math.PI * 2;
                const distance = 20 + Math.random() * 20;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                document.body.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }
        } catch (error) {
            console.error('Error creating particle effect:', error);
        }
    };
    
    // Initialize enhanced animations
    if (timelineItems.length > 0) {
        addTypingAnimation();
        addTimelineParticles();
        
        console.log('Advanced timeline animations initialized');
    }
    
    // Timeline Overview/Summary Feature
    const addTimelineOverview = () => {
        try {
            // Create timeline overview button
            const overviewButton = document.createElement('button');
            overviewButton.className = 'timeline-overview-btn';
            overviewButton.innerHTML = '<i class="fas fa-list"></i>';
            overviewButton.title = 'Timeline Übersicht';
            
            // Create timeline overview modal
            const overviewModal = document.createElement('div');
            overviewModal.className = 'timeline-overview-modal';
            overviewModal.innerHTML = `
                <div class="overview-content">
                    <div class="overview-header">
                        <h3>Unsere Geschichte im Überblick</h3>
                        <button class="overview-close">&times;</button>
                    </div>
                    <div class="overview-timeline">
                        ${Array.from(timelineItems).map((item, index) => {
                            const date = item.querySelector('.timeline-date').textContent;
                            const title = item.querySelector('.timeline-content h3').textContent;
                            return `
                                <div class="overview-item" data-index="${index}">
                                    <div class="overview-date">${date}</div>
                                    <div class="overview-title">${title}</div>
                                    <div class="overview-indicator"></div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            // Add CSS for overview
            const overviewStyle = document.createElement('style');
            overviewStyle.textContent = `
                .timeline-overview-btn {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 60px;
                    height: 60px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    cursor: pointer;
                    box-shadow: 0 8px 25px rgba(0, 122, 255, 0.3);
                    transition: all 0.3s ease;
                    z-index: 1000;
                    opacity: 0;
                    transform: scale(0);
                }
                
                .timeline-overview-btn.visible {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .timeline-overview-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 12px 35px rgba(0, 122, 255, 0.4);
                }
                
                .timeline-overview-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 10000;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                }
                
                .timeline-overview-modal.active {
                    display: flex;
                }
                
                .overview-content {
                    background: var(--bg-white);
                    border-radius: var(--radius-xl);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
                    animation: modalSlideIn 0.3s ease;
                }
                
                .overview-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px;
                    border-bottom: 1px solid var(--border-light);
                }
                
                .overview-header h3 {
                    margin: 0;
                    color: var(--text-primary);
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                
                .overview-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .overview-close:hover {
                    background: var(--bg-light);
                    color: var(--text-primary);
                }
                
                .overview-timeline {
                    padding: 24px;
                }
                
                .overview-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    margin-bottom: 12px;
                    background: var(--bg-light);
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .overview-item:last-child {
                    margin-bottom: 0;
                }
                
                .overview-item:hover {
                    background: var(--primary-color);
                    color: white;
                    transform: translateX(8px);
                }
                
                .overview-date {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: var(--primary-color);
                    min-width: 80px;
                    margin-right: 16px;
                }
                
                .overview-item:hover .overview-date {
                    color: white;
                }
                
                .overview-title {
                    flex: 1;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .overview-item:hover .overview-title {
                    color: white;
                }
                
                .overview-indicator {
                    width: 8px;
                    height: 8px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    margin-left: 16px;
                    transition: all 0.3s ease;
                }
                
                .overview-item:hover .overview-indicator {
                    background: white;
                    transform: scale(1.5);
                }
                
                @media (max-width: 768px) {
                    .timeline-overview-btn {
                        bottom: 20px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                        font-size: 1rem;
                    }
                    
                    .overview-content {
                        width: 95%;
                        margin: 20px;
                    }
                    
                    .overview-header {
                        padding: 20px;
                    }
                    
                    .overview-timeline {
                        padding: 20px;
                    }
                    
                    .overview-item {
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                    }
                    
                    .overview-date {
                        margin-bottom: 8px;
                        margin-right: 0;
                    }
                    
                    .overview-indicator {
                        position: absolute;
                        top: 16px;
                        right: 16px;
                        margin: 0;
                    }
                }
            `;
            document.head.appendChild(overviewStyle);
            
            // Add elements to page
            document.body.appendChild(overviewButton);
            document.body.appendChild(overviewModal);
            
            // Show/hide overview button based on timeline section visibility
            const toggleOverviewButton = () => {
                const timelineSection = document.querySelector('.timeline-section');
                if (timelineSection) {
                    const rect = timelineSection.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        overviewButton.classList.add('visible');
                    } else {
                        overviewButton.classList.remove('visible');
                    }
                }
            };
            
            // Event listeners
            overviewButton.addEventListener('click', () => {
                overviewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            overviewModal.querySelector('.overview-close').addEventListener('click', () => {
                overviewModal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            overviewModal.addEventListener('click', (e) => {
                if (e.target === overviewModal) {
                    overviewModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Navigate to timeline item when clicked in overview
            overviewModal.querySelectorAll('.overview-item').forEach((item, index) => {
                item.addEventListener('click', () => {
                    const targetItem = timelineItems[index];
                    if (targetItem) {
                        overviewModal.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        const targetTop = targetItem.offsetTop + 
                            document.querySelector('.timeline-section').offsetTop - 100;
                        
                        window.scrollTo({
                            top: targetTop,
                            behavior: 'smooth'
                        });
                        
                        // Highlight the target item
                        targetItem.style.animation = 'timelineHighlight 2s ease-in-out';
                        setTimeout(() => {
                            targetItem.style.animation = '';
                        }, 2000);
                    }
                });
            });
            
            // Add scroll listener for overview button visibility
            let overviewTicking = false;
            const onOverviewScroll = () => {
                if (!overviewTicking) {
                    requestAnimationFrame(() => {
                        toggleOverviewButton();
                        overviewTicking = false;
                    });
                    overviewTicking = true;
                }
            };
            
            window.addEventListener('scroll', onOverviewScroll, { passive: true });
            
            // Add highlight animation
            const highlightStyle = document.createElement('style');
            highlightStyle.textContent = `
                @keyframes timelineHighlight {
                    0% { transform: scale(1); }
                    25% { transform: scale(1.05); box-shadow: 0 20px 50px rgba(0, 122, 255, 0.2); }
                    50% { transform: scale(1); }
                    75% { transform: scale(1.02); box-shadow: 0 15px 40px rgba(0, 122, 255, 0.15); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(highlightStyle);
            
            console.log('Timeline overview feature added successfully');
        } catch (error) {
            console.error('Error adding timeline overview:', error);
        }
    };
    
    // Initialize timeline overview
    if (timelineItems.length > 0) {
        addTimelineOverview();
        console.log('Timeline overview initialized');
    }
    
    // Enhanced Timeline Features with improved keyboard navigation and accessibility
    
    // Keyboard navigation for timeline with improved accessibility
    const addKeyboardNavigation = () => {
        try {
            let currentTimelineIndex = 0;
            
            const navigateTimeline = (direction) => {
                const timelineSection = document.querySelector('.timeline-section');
                if (timelineSection && timelineItems.length > 0) {
                    if (direction === 'next') {
                        currentTimelineIndex = (currentTimelineIndex + 1) % timelineItems.length;
                    } else if (direction === 'prev') {
                        currentTimelineIndex = (currentTimelineIndex - 1 + timelineItems.length) % timelineItems.length;
                    }
                    
                    const targetItem = timelineItems[currentTimelineIndex];
                    if (targetItem) {
                        const targetTop = targetItem.offsetTop + timelineSection.offsetTop - 100;
                        
                        window.scrollTo({
                            top: targetTop,
                            behavior: 'smooth'
                        });
                        
                        // Add focus indicator
                        targetItem.setAttribute('tabindex', '0');
                        targetItem.focus();
                        targetItem.style.outline = '3px solid var(--primary-color)';
                        targetItem.style.outlineOffset = '4px';
                        
                        setTimeout(() => {
                            targetItem.style.outline = '';
                            targetItem.style.outlineOffset = '';
                        }, 2000);
                        
                        // Show navigation notification
                        const date = targetItem.querySelector('.timeline-date').textContent;
                        const title = targetItem.querySelector('.timeline-content h3').textContent;
                        showTimelineNotification(`${date}: ${title}`);
                    }
                }
            };
            
            // Enhanced keyboard event handler
            document.addEventListener('keydown', (e) => {
                try {
                    const timelineSection = document.querySelector('.timeline-section');
                    if (timelineSection) {
                        const rect = timelineSection.getBoundingClientRect();
                        const isTimelineVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        
                        if (isTimelineVisible) {
                            switch(e.key) {
                                case 'ArrowRight':
                                case 'ArrowDown':
                                    e.preventDefault();
                                    navigateTimeline('next');
                                    break;
                                case 'ArrowLeft':
                                case 'ArrowUp':
                                    e.preventDefault();
                                    navigateTimeline('prev');
                                    break;
                                case 'Home':
                                    e.preventDefault();
                                    currentTimelineIndex = 0;
                                    navigateTimeline(null);
                                    break;
                                case 'End':
                                    e.preventDefault();
                                    currentTimelineIndex = timelineItems.length - 1;
                                    navigateTimeline(null);
                                    break;
                                case 'o':
                                case 'O':
                                    // Open timeline overview with 'O' key
                                    const overviewBtn = document.querySelector('.timeline-overview-btn');
                                    if (overviewBtn && overviewBtn.classList.contains('visible')) {
                                        e.preventDefault();
                                        overviewBtn.click();
                                    }
                                    break;
                                case 'Escape':
                                    // Close overview modal if open
                                    const modal = document.querySelector('.timeline-overview-modal.active');
                                    if (modal) {
                                        e.preventDefault();
                                        modal.classList.remove('active');
                                        document.body.style.overflow = '';
                                    }
                                    break;
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error in keyboard navigation:', error);
                }
            });
            
            console.log('Enhanced keyboard navigation added to timeline');
        } catch (error) {
            console.error('Error adding keyboard navigation:', error);
        }
    };
    
    // Performance monitoring for timeline
    const addPerformanceMonitoring = () => {
        try {
            let animationFrameId;
            let lastScrollTime = 0;
            const scrollThrottle = 16; // ~60fps
            
            const monitoredScroll = () => {
                const now = Date.now();
                if (now - lastScrollTime >= scrollThrottle) {
                    updateTimelineProgress();
                    lastScrollTime = now;
                }
                animationFrameId = requestAnimationFrame(monitoredScroll);
            };
            
            // Start monitoring when timeline section is visible
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animationFrameId = requestAnimationFrame(monitoredScroll);
                    } else {
                        if (animationFrameId) {
                            cancelAnimationFrame(animationFrameId);
                        }
                    }
                });
            });
            
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
                timelineObserver.observe(timelineSection);
            }
            
            console.log('Timeline performance monitoring enabled');
        } catch (error) {
            console.error('Error adding performance monitoring:', error);
        }
    };
    
    // Enhanced accessibility features
    const addAccessibilityFeatures = () => {
        try {
            // Add ARIA labels and roles
            timelineItems.forEach((item, index) => {
                const date = item.querySelector('.timeline-date');
                const content = item.querySelector('.timeline-content');
                const icon = item.querySelector('.timeline-icon');
                
                if (date && content && icon) {
                    const title = content.querySelector('h3')?.textContent || '';
                    const description = content.querySelector('p')?.textContent || '';
                    
                    item.setAttribute('role', 'article');
                    item.setAttribute('aria-label', `Timeline item ${index + 1}: ${date.textContent} - ${title}`);
                    item.setAttribute('tabindex', '0');
                    
                    icon.setAttribute('role', 'button');
                    icon.setAttribute('aria-label', `Navigate to ${title} section`);
                    icon.setAttribute('tabindex', '0');
                    
                    // Add keyboard support for timeline icons
                    icon.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            icon.click();
                        }
                    });
                }
            });
            
            // Add live region for notifications
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'timeline-live-region';
            liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(liveRegion);
            
            // Update live region when timeline changes
            window.timelineLiveRegion = liveRegion;
            
            console.log('Timeline accessibility features added');
        } catch (error) {
            console.error('Error adding accessibility features:', error);
        }
    };
    
    // Initialize all enhanced features
    if (timelineItems.length > 0) {
        addTimelineProgressIndicator();
        addTimelineNavigation();
        addTimelineParallax();
        addTypingAnimation();
        addTimelineParticles();
        addTimelineOverview();
        addKeyboardNavigation();
        addPerformanceMonitoring();
        addAccessibilityFeatures();
        
        console.log('All enhanced timeline features initialized successfully');
    }