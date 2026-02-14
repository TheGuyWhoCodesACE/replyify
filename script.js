// TYPE TEXT LINE BY LINE, STARTS AFTER PAGE LOAD
function typeTextLineByLine(elements, speed = 10) {
    let index = 0;

    function typeNext() {
        if (index >= elements.length) return;

        const el = elements[index];
        el.style.visibility = 'visible'; // show element when typing starts

        const lines = el.innerHTML.split('<br>').map(line => line.trim());
        el.innerHTML = '';

        let lineIndex = 0;

        function typeLine() {
            if (lineIndex >= lines.length) {
                index++;
                typeNext();
                return;
            }

            let text = lines[lineIndex];
            let charIndex = 0;
            const interval = setInterval(() => {
                el.innerHTML = lines.slice(0, lineIndex).join('<br>') + (lineIndex > 0 ? '<br>' : '') + text.slice(0, charIndex);
                charIndex++;
                if (charIndex > text.length) {
                    clearInterval(interval);
                    lineIndex++;
                    setTimeout(typeLine, 30); // short delay between lines
                }
            }, speed);
        }

        typeLine();
    }

    typeNext();
}

// Scroll fade-in
function initScrollFade() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Card tilt
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

// Cursor trail
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
    const textElements = document.querySelectorAll('.type-text');
    textElements.forEach(el => el.style.visibility = 'hidden'); // hide text initially
    typeTextLineByLine(textElements, 10); // 10ms per character, fast
    initScrollFade();
    initCardTilt();
    initMockWindow();
});
