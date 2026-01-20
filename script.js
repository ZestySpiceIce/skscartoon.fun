// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');

        // Create mobile menu if doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <a href="#about">About</a>
                <a href="#how-to-buy">How to Buy</a>
                <a href="#tokenomics">Tokenomics</a>
                <a href="#artist">Artist</a>
                <a href="#community">Community</a>
                <a href="https://dexscreener.com/solana/bpdwdoakgcha6sprwzaeif8guzcs9noqjhzvfv2eqdvu" target="_blank" class="btn btn-primary">Buy $SKS</a>
            `;
            document.querySelector('.navbar').appendChild(mobileMenu);

            // Add styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 11, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 24px;
                    flex-direction: column;
                    gap: 16px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .mobile-menu.active {
                    display: flex;
                }
                .mobile-menu a {
                    color: #a1a1aa;
                    font-size: 16px;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .mobile-menu a:hover {
                    color: #fff;
                }
                .mobile-menu .btn {
                    margin-top: 8px;
                }
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }
            `;
            document.head.appendChild(style);
        }

        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu on link click
document.addEventListener('click', (e) => {
    if (e.target.closest('.mobile-menu a')) {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Copy Contract Address =====
function copyContract() {
    const contract = document.getElementById('contract').textContent;
    navigator.clipboard.writeText(contract).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Copied!</span>
        `;
        btn.style.borderColor = '#fbbf24';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.borderColor = '';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = contract;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>Copied!</span>
        `;

        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.8)';
    }

    lastScroll = currentScroll;
});

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.about-card, .step, .token-card, .community-card, .artist-quote').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Staggered Animation for Cards =====
document.querySelectorAll('.about-grid, .token-grid, .community-links').forEach(grid => {
    const cards = grid.querySelectorAll('.about-card, .token-card, .community-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#ffffff';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// ===== Stats Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target >= 1000 ? `$${(target/1000).toFixed(0)}K+` : target.toString();
            clearInterval(timer);
        } else {
            element.textContent = target >= 1000 ? `$${Math.floor(start/1000)}K+` : Math.floor(start).toString();
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('$26K')) {
                    animateCounter(stat, 26000);
                } else if (text.includes('500')) {
                    stat.textContent = '0+';
                    let count = 0;
                    const timer = setInterval(() => {
                        count += 10;
                        if (count >= 500) {
                            stat.textContent = '500+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = count + '+';
                        }
                    }, 30);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Prevent Flash of Unstyled Content =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// ===== Floating Art Background =====
const floatingArtConfig = {
    // Add your image filenames here (place images in /images folder)
    images: [
        'images/art1.jfif',
        'images/art2.jfif',
        'images/art3.jfif',
        'images/art4.jfif',
        'images/art5.jfif',
        'images/art6.jfif',
        'images/art7.jfif',
        'images/art8.jfif',
        'images/art9.jfif',
        'images/art10.jfif',
        'images/art11.jfif',
        'images/art12.jfif',
        'images/art13.jfif',
        'images/art14.jfif',
        'images/art15.jfif'
    ],
    maxVisible: 5,          // Max images visible at once
    displayDuration: 5000,  // How long each image stays visible (ms)
    fadeDuration: 2000,     // Fade in/out duration (ms)
    spawnInterval: 2000     // Time between spawning new images (ms)
};

class FloatingArt {
    constructor() {
        this.container = document.getElementById('floatingArt');
        this.activeImages = [];
        this.imageQueue = [...floatingArtConfig.images];
        // Grid-based zone system to prevent overlapping
        this.gridCols = 3;
        this.gridRows = 2;
        this.occupiedZones = new Set();
        this.init();
    }

    init() {
        // Check if images exist before starting
        if (floatingArtConfig.images.length === 0) {
            console.log('No floating art images configured. Add images to the images array in script.js');
            return;
        }

        // Preload images and filter out missing ones
        this.preloadImages().then(validImages => {
            if (validImages.length === 0) {
                console.log('No valid images found in /images folder');
                return;
            }
            floatingArtConfig.images = validImages;
            this.imageQueue = [...validImages];
            this.startAnimation();
        });
    }

    preloadImages() {
        return Promise.all(
            floatingArtConfig.images.map(src => {
                return new Promise(resolve => {
                    const img = new Image();
                    img.onload = () => resolve(src);
                    img.onerror = () => resolve(null);
                    img.src = src;
                });
            })
        ).then(results => results.filter(src => src !== null));
    }

    startAnimation() {
        // Spawn initial images with staggered delays
        for (let i = 0; i < Math.min(3, floatingArtConfig.maxVisible); i++) {
            setTimeout(() => this.spawnImage(), 1000 + (i * 1500));
        }

        // Continue spawning
        setInterval(() => {
            if (this.activeImages.length < floatingArtConfig.maxVisible && this.occupiedZones.size < (this.gridCols * this.gridRows)) {
                this.spawnImage();
            }
        }, floatingArtConfig.spawnInterval);
    }

    getAvailableZone() {
        const totalZones = this.gridCols * this.gridRows;
        const availableZones = [];

        for (let i = 0; i < totalZones; i++) {
            if (!this.occupiedZones.has(i)) {
                availableZones.push(i);
            }
        }

        if (availableZones.length === 0) return null;

        // Pick a random available zone
        return availableZones[Math.floor(Math.random() * availableZones.length)];
    }

    getPositionForZone(zoneIndex) {
        const col = zoneIndex % this.gridCols;
        const row = Math.floor(zoneIndex / this.gridCols);

        const zoneWidth = window.innerWidth / this.gridCols;
        const zoneHeight = window.innerHeight / this.gridRows;

        const padding = 50;
        const imgSize = 300;

        // Calculate position within the zone with some randomness
        const minX = col * zoneWidth + padding;
        const maxX = (col + 1) * zoneWidth - imgSize - padding;
        const minY = row * zoneHeight + padding;
        const maxY = (row + 1) * zoneHeight - imgSize - padding;

        return {
            x: minX + Math.random() * Math.max(0, maxX - minX),
            y: minY + Math.random() * Math.max(0, maxY - minY)
        };
    }

    getNextImage() {
        if (this.imageQueue.length === 0) {
            this.imageQueue = [...floatingArtConfig.images];
            // Shuffle
            for (let i = this.imageQueue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.imageQueue[i], this.imageQueue[j]] = [this.imageQueue[j], this.imageQueue[i]];
            }
        }
        return this.imageQueue.pop();
    }

    spawnImage() {
        const zone = this.getAvailableZone();
        if (zone === null) return;

        const imgSrc = this.getNextImage();
        const pos = this.getPositionForZone(zone);

        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = 'floating-art';
        img.style.left = `${pos.x}px`;
        img.style.top = `${pos.y}px`;
        img.dataset.zone = zone;

        // Random size variation
        const size = 250 + Math.random() * 150;
        img.style.width = `${size}px`;
        img.style.height = 'auto';

        // Random rotation
        const rotation = -10 + Math.random() * 20;
        img.style.transform = `rotate(${rotation}deg)`;

        this.container.appendChild(img);
        this.activeImages.push(img);
        this.occupiedZones.add(zone);

        // Fade in
        requestAnimationFrame(() => {
            img.classList.add('visible');
        });

        // Schedule fade out and removal
        setTimeout(() => {
            img.classList.remove('visible');
            img.classList.add('fade-out');

            setTimeout(() => {
                if (img.parentNode) {
                    img.parentNode.removeChild(img);
                }
                this.activeImages = this.activeImages.filter(i => i !== img);
                this.occupiedZones.delete(zone);
            }, floatingArtConfig.fadeDuration);
        }, floatingArtConfig.displayDuration);
    }
}

// Initialize floating art when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to let page load first
    setTimeout(() => {
        new FloatingArt();
    }, 2000);
});
