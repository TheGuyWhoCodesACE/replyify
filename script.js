// FAST TYPING EFFECT FOR ALL TEXT
function typeText(element, speed = 5) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

// Scroll fade-in effect
function initScrollFade() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Card tilt effect
function initCardTilt() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width/2) / rect.width * 15;
            const y = (e.clientY - rect.top - rect.height/2) / rect.height * 15;
            card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    });
}

// Mock window typing
function initMockWindow() {
    const typing = document.getElementById('typing');
    const mockWindow = document.getElementById('mock-window');
    mockWindow.addEventListener('mouseenter', () => {
        typing.textContent = '';
        let dots = 0;
        const interval = setInterval(() => {
            typing.textContent = '.'.repeat(dots % 4);
            dots++;
        }, 400);
        setTimeout(() => {
            clearInterval(interval);
            typing.textContent = 'That means a lot! Glad it helped 🙌 More coming soon.';
        }, 4000);
    });
}

// Cursor particle trail
document.addEventListener('mousemove', e => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 500);
});

// INIT ALL
window.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('h1, h2, h3, p, a, strong, span');
    textElements.forEach(el => typeText(el, 5));
    initScrollFade();
    initCardTilt();
    initMockWindow();
});
