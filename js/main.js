const canvas = document.getElementById('canvas-background');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 70;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;

        this.angle = Math.random() * Math.PI * 2;
        this.blinkSpeed = Math.random() * 0.05 + 0.01;
        this.maxAlpha = Math.random() * 0.8 + 0.2;

        const colors = ['0, 255, 255', '255, 0, 255', '255, 255, 0'];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        this.angle += this.blinkSpeed;
    }

    draw() {
        const currentOpacity = Math.abs(Math.sin(this.angle)) * this.maxAlpha;

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = `rgb(${this.colorBase})`;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgb(${this.colorBase})`;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();


const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.menu a');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        menuLinks.classList.remove('active');
    });
});