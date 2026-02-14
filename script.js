// 1. Scroll-triggered fade-in
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
    });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 2. Cards tilt toward mouse
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) / rect.width * 15;
        const y = (e.clientY - rect.top - rect.height/2) / rect.height * 15;
        card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
});

// 3. Mock window AI typing on hover
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

// 4. Glow color and parallax scroll effect
const glow1 = document.querySelector('.glow1');
const glow2 = document.querySelector('.glow2');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // subtle vertical parallax
    glow1.style.transform = `translateY(${scrollY * 0.2}px)`;
    glow2.style.transform = `translateY(${scrollY * -0.2}px)`;

    // subtle color shift
    const hue = 240 + scrollY / 10;
    glow1.style.background = `hsl(${hue}, 90%, 50%)`;
    glow2.style.background = `hsl(${hue + 60}, 80%, 50%)`;
});

// 5. Cursor particle trail
document.addEventListener('mousemove', e => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 500);
});
