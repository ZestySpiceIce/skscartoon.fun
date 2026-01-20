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
                    background: #fffdf7;
                    padding: 24px;
                    flex-direction: column;
                    gap: 12px;
                    border-bottom: 3px solid #1a1a2e;
                    box-shadow: 0 8px 0px rgba(26, 26, 46, 0.1);
                }
                .mobile-menu.active {
                    display: flex;
                }
                .mobile-menu a {
                    color: #4a4a68;
                    font-size: 17px;
                    font-weight: 600;
                    padding: 14px 0;
                    border-bottom: 2px solid rgba(26, 26, 46, 0.1);
                }
                .mobile-menu a:hover {
                    color: #1a1a2e;
                }
                .mobile-menu .btn {
                    margin-top: 12px;
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
        navbar.style.background = '#fffdf7';
        navbar.style.boxShadow = '0 4px 0px rgba(26, 26, 46, 0.1)';
    } else {
        navbar.style.background = '#fffdf7';
        navbar.style.boxShadow = 'none';
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

// Side art is now static in HTML - no JavaScript needed
