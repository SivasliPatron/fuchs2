// Custom Instagram Profile with Lightbox
document.addEventListener('DOMContentLoaded', function() {
    
    // Instagram post data
    const instagramPosts = {
        1: {
            image: 'Assets/images/portfolio/germany-hannover-messe-expo/1.jpg',
            caption: '🔥 Unser neuester Messestand auf der Hannover Messe 2024! Moderne Technik trifft auf elegantes Design. Ein echter Hingucker, der Besucher aus aller Welt begeistert hat. 💪\n\n#MessebauExcellence #HannoverMesse #Innovation #Deutschland #Messebau #Design',
            likes: 127,
            comments: 23,
            date: '2 Stunden',
            location: 'Hannover Messe, Deutschland'
        },
        2: {
            image: 'Assets/images/portfolio/dubai-middle-east-electricity/1.jpg',
            caption: '✨ Live aus Dubai! 🇦🇪 Unser futuristischer Stand auf der Middle East Electricity Messe beeindruckt mit innovativem Design und modernster Technik. Die Zukunft der Energiebranche erleben!\n\n#Dubai #MiddleEastElectricity #Messebau #Innovation #Energy #Future',
            likes: 89,
            comments: 15,
            date: '1 Tag',
            location: 'Dubai, UAE'
        },
        3: {
            image: 'Assets/images/portfolio/germany-berlin-ifa-expo/1.jpg',
            caption: '🚀 IFA Berlin 2024 - Unser Tech-Stand war ein voller Erfolg! Danke an alle Besucher für das großartige Feedback und die spannenden Gespräche. Technologie, die begeistert! 🔥\n\n#IFABerlin #Technologie #Innovation #Berlin #TechExpo #Success',
            likes: 156,
            comments: 31,
            date: '3 Tage',
            location: 'IFA Berlin, Deutschland'
        },
        4: {
            image: 'Assets/images/portfolio/stuttgart-fastener-expo/1.jpg',
            caption: '🔩 Fastener Stuttgart 2024! Kompakter und effizienter Stand für Verbindungstechnik. Qualität und Präzision in jedem Detail - genau wie unsere Kunden es verdienen. 💯\n\n#FastenerStuttgart #Verbindungstechnik #Qualität #Stuttgart #Messebau #Precision',
            likes: 73,
            comments: 12,
            date: '5 Tage',
            location: 'Stuttgart, Deutschland'
        },
        5: {
            image: 'Assets/images/portfolio/france-uib-texworld-paris/1.jpg',
            caption: '🇫🇷 Bonjour Paris! Eleganter Textilmesse-Stand im Herzen der Mode-Hauptstadt. Französische Eleganz trifft deutsche Ingenieurskunst. Magnifique! ✨\n\n#TexworldParis #Fashion #Paris #Textile #Elegance #France #Messebau',
            likes: 94,
            comments: 18,
            date: '1 Woche',
            location: 'Paris, Frankreich'
        },
        6: {
            image: 'Assets/images/portfolio/italia-emo-expo/1.jpg',
            caption: '🇮🇹 Ciao Milano! EMO Milano 2024 - Innovativer Maschinenbau-Stand in der Design-Metropole Italiens. Italienisches Flair mit deutscher Technik vereint! 🏗️\n\n#EMOMilano #Maschinenbau #Milano #Italy #Engineering #Design #Innovation',
            likes: 112,
            comments: 25,
            date: '1 Woche',
            location: 'Milano, Italien'
        },
        7: {
            image: 'Assets/images/portfolio/germany-münchen-expo/1.jpg',
            caption: '🍺 Servus München! Moderner Technologie-Stand mit interaktiven Displays und bayerischem Charme. Innovation meets Gemütlichkeit! 🥨\n\n#MünchenExpo #Bayern #Technologie #Innovation #München #Bavaria #Messebau',
            likes: 87,
            comments: 16,
            date: '2 Wochen',
            location: 'München, Deutschland'
        },
        8: {
            image: 'Assets/images/portfolio/turkey-win automation/1.jpg',
            caption: '🇹🇷 Merhaba İstanbul! WIN Automation - Zukunftsweisender Automations-Stand in der Brücke zwischen Europa und Asien. Automation at its finest! 🤖\n\n#WINAutomation #Istanbul #Turkey #Automation #Technology #Future #Bridge',
            likes: 134,
            comments: 29,
            date: '2 Wochen',
            location: 'Istanbul, Türkei'
        },
        9: {
            image: 'Assets/images/portfolio/brazil-germany/1.jpg',
            caption: '🇧🇷🇩🇪 Kulturverbindender Stand für deutsch-brasilianische Wirtschaftsbeziehungen. Dois países, uma visão! Zwei Länder, eine Vision! 🤝\n\n#BrazilGermany #International #Partnership #Culture #Business #Global #Connection',
            likes: 76,
            comments: 14,
            date: '3 Wochen',
            location: 'São Paulo, Brasilien'
        }
    };
    
    // Create enhanced lightbox HTML
    const lightboxHTML = `
        <div class="instagram-lightbox" id="instagramLightbox">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" id="lightboxClose">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="lightbox-media-container" id="lightboxMediaContainer">
                    <img src="" alt="Instagram Post" id="lightboxImage" class="lightbox-media">
                </div>
                
                <div class="lightbox-info">
                    <!-- Instagram Post Header -->
                    <div class="lightbox-post-header">
                        <div class="post-user">
                            <img src="Assets/images/logo.jpg" alt="Fuchs Messebau" class="user-avatar">
                            <div class="user-info">
                                <span class="username">@fuchsmessebau</span>
                                <span class="location" id="lightboxLocation">Deutschland</span>
                            </div>
                        </div>
                        <button class="post-menu-btn">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                    
                    <!-- Post Caption -->
                    <div class="lightbox-caption" id="lightboxCaption">
                        Schauen Sie sich unsere neuesten Messebau-Projekte an!
                    </div>
                    
                    <!-- Post Actions -->
                    <div class="lightbox-actions">
                        <div class="action-buttons">
                            <button class="action-btn like-btn" id="lightboxLike">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="action-btn comment-btn">
                                <i class="far fa-comment"></i>
                            </button>
                            <button class="action-btn share-btn">
                                <i class="far fa-paper-plane"></i>
                            </button>
                        </div>
                        <button class="action-btn bookmark-btn">
                            <i class="far fa-bookmark"></i>
                        </button>
                    </div>
                    
                    <!-- Post Stats -->
                    <div class="lightbox-stats">
                        <span class="likes-count" id="lightboxLikesCount">127 Gefällt mir</span>
                        <span class="comments-count" id="lightboxCommentsCount">23 Kommentare</span>
                    </div>
                    
                    <!-- Post Time -->
                    <div class="lightbox-meta">
                        <span class="lightbox-date" id="lightboxDate">2 Stunden</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add lightbox to body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Get lightbox elements
    const lightbox = document.getElementById('instagramLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxDate = document.getElementById('lightboxDate');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxLikesCount = document.getElementById('lightboxLikesCount');
    const lightboxCommentsCount = document.getElementById('lightboxCommentsCount');
    const lightboxLike = document.getElementById('lightboxLike');
    
    let currentPost = null;
    let isLiked = false;
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentPost = null;
    }
    
    // Open lightbox function
    function openLightbox(postId) {
        const post = instagramPosts[postId];
        if (!post) return;
        
        currentPost = post;
        isLiked = false;
        
        // Update lightbox content
        lightboxImage.src = post.image;
        lightboxCaption.textContent = post.caption;
        lightboxDate.textContent = post.date;
        lightboxLocation.textContent = post.location;
        lightboxLikesCount.textContent = `${post.likes} Gefällt mir`;
        lightboxCommentsCount.textContent = `${post.comments} Kommentare`;
        
        // Reset like button
        lightboxLike.querySelector('i').className = 'far fa-heart';
        lightboxLike.classList.remove('liked');
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Like functionality
    lightboxLike.addEventListener('click', function() {
        isLiked = !isLiked;
        const heartIcon = lightboxLike.querySelector('i');
        
        if (isLiked) {
            heartIcon.className = 'fas fa-heart';
            lightboxLike.classList.add('liked');
            currentPost.likes++;
            
            // Animate heart
            lightboxLike.style.transform = 'scale(1.3)';
            setTimeout(() => {
                lightboxLike.style.transform = 'scale(1)';
            }, 200);
        } else {
            heartIcon.className = 'far fa-heart';
            lightboxLike.classList.remove('liked');
            currentPost.likes--;
        }
        
        lightboxLikesCount.textContent = `${currentPost.likes} Gefällt mir`;
    });
    
    // Event listeners for closing
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Add click events to Instagram posts
    const postItems = document.querySelectorAll('.instagram-post-item');
    postItems.forEach(item => {
        item.addEventListener('click', function() {
            const postId = this.dataset.post;
            openLightbox(postId);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            // You can implement prev/next post navigation here
        }
    });
    
    console.log('✅ Custom Instagram Profile loaded - Click on posts to view them!');
});
