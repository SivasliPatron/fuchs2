document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolioGrid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Modal
    const projectLinks = document.querySelectorAll('.portfolio-link');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalGallery = document.getElementById('modalGallery');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            loadProjectDetails(projectId);
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    projectModal.querySelector('.modal-overlay').addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    function loadProjectDetails(projectId) {
        // Erstelle die Galerie-Struktur
        modalGallery.innerHTML = `
            <div class="project-details">
                <div class="project-gallery">
                    <div class="gallery-main">
                        <img src="Assets/images/portfolio/${projectId}/1.jpg" alt="Projekt Bild 1" class="active">
                    </div>
                    <div class="gallery-thumbnails">
                        <img src="Assets/images/portfolio/${projectId}/1.jpg" alt="Thumbnail 1" class="active" onclick="changeMainImage(this)">
                        <img src="Assets/images/portfolio/${projectId}/2.jpg" alt="Thumbnail 2" onclick="changeMainImage(this)">
                        <img src="Assets/images/portfolio/${projectId}/3.jpg" alt="Thumbnail 3" onclick="changeMainImage(this)">
                    </div>
                </div>
                <div class="project-info">
                    <h2>${getProjectTitle(projectId)}</h2>
                    <p>${getProjectDescription(projectId)}</p>
                </div>
            </div>
        `;

        // Füge die changeMainImage-Funktion zum globalen Scope hinzu
        window.changeMainImage = function(thumbnail) {
            const mainImage = modalGallery.querySelector('.gallery-main img');
            
            // Erstelle ein neues Bild-Element
            const newImage = document.createElement('img');
            newImage.src = thumbnail.src;
            newImage.alt = thumbnail.alt;
            newImage.classList.add('fade-in');
            
            // Füge das neue Bild hinzu und entferne das alte
            mainImage.parentNode.appendChild(newImage);
            mainImage.style.opacity = '0';
            mainImage.style.transform = 'scale(0.95)';
            
            // Entferne active-Klasse von allen Thumbnails
            modalGallery.querySelectorAll('.gallery-thumbnails img').forEach(img => {
                img.classList.remove('active');
            });
            
            // Füge active-Klasse zum geklickten Thumbnail hinzu
            thumbnail.classList.add('active');
            
            // Entferne das alte Bild nach der Animation
            setTimeout(() => {
                mainImage.remove();
                newImage.classList.remove('fade-in');
            }, 500);
        };
    }

    function getProjectTitle(projectId) {
        const titles = {
            'germany-aluminum-expo': 'Deutschland Aluminiummesse',
            'germany-berlin-ifa-expo': 'IFA-Messe Berlin',
            'germany-hannover-messe-expo': 'Hannover Messe',
            'dubai-middle-east-electricity': 'Dubai Middle East Electricity',
            'france-uib-texworld-paris': 'Texworld Paris',
            'germany-münchen-expo': 'München Messe',
            'italia-emo-expo': 'EMO Milano',
            'stuttgart-fastener-expo': 'Fastener Stuttgart',
            'brazil-germany': 'Deutsch-Brasilianische Messe',
            'turkey-win automation': 'WIN Automation Istanbul',
            'us-prime-ministry-development-agency': 'US Development Agency',
            'turkey-hr-itm': 'ITM Istanbul'
        };
        return titles[projectId] || 'Projekt Details';
    }

    function getProjectDescription(projectId) {
        const descriptions = {
            'germany-aluminum-expo': 'Innovativer Messestand für die Aluminium-Industrie mit modernem Design',
            'germany-berlin-ifa-expo': 'Beeindruckender Stand auf der internationalen Funkausstellung',
            'germany-hannover-messe-expo': 'Großflächiger Industriestand mit interaktiven Elementen',
            'dubai-middle-east-electricity': 'Futuristischer Stand für die Energie-Branche in Dubai',
            'france-uib-texworld-paris': 'Eleganter Textilmesse-Stand im Herzen von Paris',
            'germany-münchen-expo': 'Moderner Technologie-Stand mit interaktiven Displays',
            'italia-emo-expo': 'Innovativer Maschinenbau-Stand in Mailand',
            'stuttgart-fastener-expo': 'Kompakter und effizienter Stand für Verbindungstechnik',
            'brazil-germany': 'Kulturverbindender Stand für bilaterale Wirtschaftsbeziehungen',
            'turkey-win automation': 'Zukunftsweisender Automations-Stand in der Türkei',
            'us-prime-ministry-development-agency': 'Repräsentativer Stand für internationale Entwicklungszusammenarbeit',
            'turkey-hr-itm': 'Großflächiger Textilmaschinen-Stand auf der ITM'
        };
        return descriptions[projectId] || 'Hier kommen die detaillierten Informationen zum Projekt.';
    }

    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        scrollObserver.observe(element);
    });
}); 