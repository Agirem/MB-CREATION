
class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.slider-dot');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        this.slideInterval = null;

        this.init();
    }

    init() {
        // Event listeners pour les boutons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Event listeners pour les dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Démarrer le slider automatique
        this.startAutoSlide();

        // Pause sur hover
        document.querySelector('.hero').addEventListener('mouseenter', () => this.stopAutoSlide());
        document.querySelector('.hero').addEventListener('mouseleave', () => this.startAutoSlide());
    }

    updateSlide() {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlide();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }

    startAutoSlide() {
        if (this.slideInterval) this.stopAutoSlide();
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Initialiser le slider
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});

// Gestion menus sur mobile

document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Gestion des sous-menus sur mobile
document.querySelectorAll('.has-dropdown').forEach(item => {
    item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        }
    });
});

// Fermeture du menu au clic en dehors
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        document.querySelector('nav').classList.remove('active');
    }
});


// carrousel


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carrousel-slide');
    const indicatorsContainer = document.getElementById('indicators');
    let currentIndex = 0;
    let interval;

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }

    function startCarousel() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(interval);
        startCarousel();
    }

    indicatorsContainer.addEventListener('click', resetInterval);
    startCarousel();
});





 // new arrivals




const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');

function openModal(productElement) {
    const productImage = productElement.querySelector('.product-image');
    const productTitle = productElement.querySelector('h3');
    const productPrice = productElement.querySelector('p');

    // Mettre à jour le contenu de la modale
    modalImage.src = productImage.src;
    document.querySelector('.modal-details .product-title').textContent = productTitle.textContent;
    document.querySelector('.modal-details .product-price').textContent = productPrice.textContent;

    modal.classList.add('active');
    // Empêcher le défilement du body
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    // Réactiver le défilement du body
    document.body.style.overflow = 'auto';
}

// Fermer la modale en cliquant en dehors
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Fermer la modale avec la touche Echap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});






  // notation par etoile



document.addEventListener('DOMContentLoaded', function() {
    const ratingContainers = document.querySelectorAll('.rating');

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const currentRatingDisplay = container.parentElement.querySelector('#current-rating');

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                
                // Réinitialiser toutes les étoiles
                stars.forEach(s => s.classList.remove('selected'));
                
                // Sélectionner les étoiles jusqu'à la valeur cliquée
                stars.forEach(s => {
                    if (parseInt(s.getAttribute('data-value')) <= value) {
                        s.classList.add('selected');
                    }
                });

                // Mettre à jour l'affichage de la note
                if (currentRatingDisplay) {
                    currentRatingDisplay.textContent = value;
                }

                // Marquer le conteneur comme cliqué
                container.setAttribute('data-clicked', 'true');

                // Log pour debug et futur envoi au serveur
                console.log('Note donnée:', value);
            });
        });
    });
});
