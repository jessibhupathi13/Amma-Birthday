// Global Layer System Architectures
let canvas, ctx;
let elements = [];
let animationFrameId;
let currentAnimationMode = 'standard'; 

const config = {
    colors: ['#ffd6e8', '#fff8f0', '#ffffff', '#e6d6ff', '#ffd700'],
    typingHeroText: "To the most magnificent, brave, and beautiful mother in the absolute continuum... Welcome to your personalized space! ❤️",
    glowingFinalText: "AMMA! Nuvvu mamulu mahilavi kadhu... enno sankataalanu, paristithulanu thadabarani gunde dhairyamtho edurkunna oka absolute STRONG WOMAN vi! Naa life lo nenu pondina sreshtamaina adhurshtam, naa strength, naa key support system nuvve Amma. Happy Birthday to the queen of our family! ❤️ Love You Forever continuum."
};

// Application Entrance Gate Lock Breaker
function unlockExperience() {
    document.getElementById("entrance-lock").style.display = "none";
    
    // Initializing Background Audio
    const audio = document.getElementById("bgMusic");
    audio.play().catch(err => console.log("Audio playback deferred pending interaction."));
    
    // Initialize Systems
    initCanvas();
    startHeroSlideshow();
    initTypingEffect("hero-typing", config.typingHeroText, 55);
    initScrollReveal();
    applyStickyRotationFix();
}

function initCanvas() {
    canvas = document.getElementById('animationCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    loopCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle Class Templates
class Heart {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 14 + 8;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.sin(Math.random() * 2) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() { this.y -= this.speedY; this.x += this.speedX; if (this.y < -20) this.reset(); }
    draw() {
        ctx.save(); ctx.globalAlpha = this.opacity; ctx.fillStyle = '#b54773'; ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size/2, this.y - this.size/2, this.x - this.size, this.y + this.size/3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size/3, this.x + this.size/2, this.y - this.size/2, this.x, this.y);
        ctx.fill(); ctx.restore();
    }
}

class Petal {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
        this.x = Math.random() * canvas.width; this.y = -20;
        this.size = Math.random() * 10 + 6; this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 1.8 - 0.9; this.rotation = Math.random() * 360;
        this.spin = Math.random() * 1.5 - 0.75; this.opacity = Math.random() * 0.4 + 0.3;
    }
    update() { this.y += this.speedY; this.x += this.speedX; this.rotation += this.spin; if (this.y > canvas.height + 20) this.reset(); }
    draw() {
        ctx.save(); ctx.globalAlpha = this.opacity; ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180); ctx.fillStyle = '#ffd6e8'; ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 1.6, 0, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
    }
}

class Sparkle {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2.5 + 1; this.opacity = Math.random(); this.speedOpacity = Math.random() * 0.02 + 0.01; this.direction = Math.random() > 0.5 ? 1 : -1; }
    update() { this.opacity += this.speedOpacity * this.direction; if (this.opacity >= 1) { this.direction = -1; this.opacity = 1; } if (this.opacity <= 0) this.reset(); }
    draw() { ctx.save(); ctx.globalAlpha = this.opacity; ctx.fillStyle = config.colors[4]; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}

class Balloon {
    constructor() { this.reset(); this.y = canvas.height + Math.random() * 400; }
    reset() { this.x = Math.random() * canvas.width; this.y = canvas.height + 100; this.w = Math.random() * 30 + 30; this.h = this.w * 1.25; this.speedY = Math.random() * 2 + 1.5; this.color = config.colors[Math.floor(Math.random() * config.colors.length)]; this.swing = Math.random() * 2; this.swingSpeed = Math.random() * 0.02; this.angle = 0; }
    update() { this.y -= this.speedY; this.angle += this.swingSpeed; this.x += Math.sin(this.angle) * this.swing; if (this.y < -this.h - 50) this.reset(); }
    draw() {
        ctx.save(); ctx.fillStyle = this.color; ctx.beginPath(); ctx.ellipse(this.x, this.y, this.w / 2, this.h / 2, 0, 0, 2 * Math.PI); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.beginPath(); ctx.moveTo(this.x, this.y + this.h / 2); ctx.lineTo(this.x, this.y + this.h / 2 + 40); ctx.stroke(); ctx.restore();
    }
}

class Confetti {
    constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * -canvas.height; this.size = Math.random() * 7 + 4; this.color = config.colors[Math.floor(Math.random() * config.colors.length)]; this.speedY = Math.random() * 3.5 + 2.5; this.speedX = Math.random() * 2 - 1; this.rotation = Math.random() * 360; this.spin = Math.random() * 4 + 2; }
    update() { this.y += this.speedY; this.x += this.speedX; this.rotation += this.spin; }
    draw() { ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation * Math.PI / 180); ctx.fillStyle = this.color; ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size); ctx.restore(); }
}

class Firework {
    constructor() { this.x = Math.random() * canvas.width; this.targetY = Math.random() * (canvas.height * 0.45) + 40; this.y = canvas.height; this.speedY = Math.random() * 4 + 8; this.particles = []; this.exploded = false; this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; }
    update() {
        if (!this.exploded) { this.y -= this.speedY; if (this.y <= this.targetY) { this.exploded = true; this.explode(); } }
        else { this.particles.forEach((p, idx) => { p.update(); if (p.alpha <= 0) this.particles.splice(idx, 1); }); }
    }
    explode() {
        const pCount = 75;
        for (let i = 0; i < pCount; i++) {
            const angle = (Math.PI * 2 / pCount) * i; const velocity = Math.random() * 5 + 2.5;
            this.particles.push({ x: this.x, y: this.y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, alpha: 1, decay: Math.random() * 0.012 + 0.012, update() { this.x += this.vx; this.y += this.vy; this.vy += 0.04; this.alpha -= this.decay; } });
        }
    }
    draw() {
        if (!this.exploded) { ctx.save(); ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
        else { this.particles.forEach(p => { ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }); }
    }
}

function injectElements(Type, count) { for (let i = 0; i < count; i++) { elements.push(new Type()); } }

function loopCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentAnimationMode === 'standard') {
        if (elements.filter(e => e instanceof Heart).length < 12) injectElements(Heart, 1);
        if (elements.filter(e => e instanceof Petal).length < 15) injectElements(Petal, 1);
        if (elements.filter(e => e instanceof Sparkle).length < 25) injectElements(Sparkle, 1);
    } else if (currentAnimationMode === 'fireworks') {
        if (elements.filter(e => e instanceof Firework).length < 6 && Math.random() < 0.08) elements.push(new Firework());
    }
    elements.forEach((el, idx) => { el.update(); el.draw(); if (el instanceof Confetti && el.y > canvas.height + 20) elements.splice(idx, 1); if (el instanceof Firework && el.exploded && el.particles.length === 0) elements.splice(idx, 1); });
    animationFrameId = requestAnimationFrame(loopCanvas);
}

// SECTION 1: Slideshow
function startHeroSlideshow() {
    const slides = document.querySelectorAll(".slide"); let idx = 0;
    setInterval(() => { slides[idx].classList.remove("active"); idx = (idx + 1) % slides.length; slides[idx].classList.add("active"); }, 4500);
}

// SECTION 2: Mystery Box Openers
function openMysteryBox(cardElement, header, text, stickers) {
    if (cardElement.classList.contains('opened')) return;
    cardElement.classList.add('opened');
    const interior = cardElement.querySelector('.box-reveal-interior');
    interior.innerHTML = `<h4>${header}</h4><p>${text}</p><div class="sticker-node">${stickers}</div>`;
    injectElements(Confetti, 15);
}

// SECTION 3: Gallery Spectrum Modal Actions
function expandSpectrum(card, title, src) { openLightbox(src, title); }
function openLightbox(src, title = "") {
    const lb = document.getElementById("lightbox"); document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox-title").innerText = title; lb.classList.add("active");
}
function closeLightbox() { document.getElementById("lightbox").classList.remove("active"); }

// SECTION 4: Envelope Letter System
function openLetter() { document.querySelector(".envelope").classList.toggle("open"); }

// CAKE SLICING LOGIC ARCHITECTURES
function executeCakeCutSlice() {
    const cake = document.getElementById("cake-body-sliceable");
    if(cake.classList.contains('sliced')) return;
    cake.classList.add('sliced');
    document.getElementById("candle-flame-element").style.display = "none";
    document.getElementById("knife-interaction-element").innerText = "🎂 Cut Completed!";
    document.getElementById("knife-interaction-element").disabled = true;
    injectElements(Confetti, 60);
}

// UNWRAP PRESENT ARCHITECTURES
function unwrapDreamGifts() {
    const box = document.getElementById("main-mystery-gift-package");
    if(box.classList.contains('unwrapped')) return;
    box.classList.add('unwrapped');
    injectElements(Confetti, 80);
    setTimeout(() => {
        document.getElementById("manifest-grid-results-container").style.display = "grid";
        document.getElementById("manifest-grid-results-container").scrollIntoView({behavior: 'smooth'});
    }, 600);
}

// SECTION 6: Timeline Story Framework Modals
function openStoryModal(title, imageSrc, description, dateStamp) {
    const modal = document.getElementById("story-modal");
    document.getElementById("story-modal-img").src = imageSrc;
    document.getElementById("story-modal-title").innerText = title;
    document.getElementById("story-modal-date").innerText = dateStamp;
    document.getElementById("story-modal-desc").innerText = description;
    modal.classList.add("active");
}
function closeStoryModal() { document.getElementById("story-modal").classList.remove("active"); }

// VOICE PLAYER SYSTEM ARCHITECTURE
function toggleVoiceNote(button) {
    const voice = document.getElementById("personalVoiceMemo");
    const bgMusic = document.getElementById("bgMusic");
    if(voice.paused) {
        bgMusic.volume = 0.15; 
        voice.play();
        button.innerText = "⏸️ Pause Voice Note";
    } else {
        voice.pause();
        bgMusic.volume = 1.0;
        button.innerText = "▶️ Play My Voice";
    }
    voice.onended = () => { bgMusic.volume = 1.0; button.innerText = "▶️ Play My Voice"; };
}

// SECTION 7: Blast Matrix
function triggerFinalMessage() {
    currentAnimationMode = 'fireworks'; elements = [];
    injectElements(Balloon, 10);
    document.getElementById("glowing-message-container").classList.add("active");
    document.getElementById("glowing-text").innerHTML = "";
    initTypingEffect("glowing-text", config.glowingFinalText, 45);
}
function closeFinalMessage() { document.getElementById("glowing-message-container").classList.remove("active"); currentAnimationMode = 'standard'; elements = []; }

// Helper Core Utilities
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }
function initTypingEffect(elementId, text, speed) {
    let i = 0; const target = document.getElementById(elementId); if (!target) return;
    function type() { if (i < text.length) { target.innerHTML += text.charAt(i); i++; setTimeout(type, speed); } }
    type();
}
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); } }); }, { threshold: 0.12 });
    document.querySelectorAll(".reveal, .transition-item").forEach(el => observer.observe(el));
}
function applyStickyRotationFix() {
    document.querySelectorAll('.note-1').forEach(e => e.style.setProperty('--rot', '2deg'));
    document.querySelectorAll('.note-2').forEach(e => e.style.setProperty('--rot', '-3deg'));
    document.querySelectorAll('.note-3').forEach(e => e.style.setProperty('--rot', '3deg'));
    document.querySelectorAll('.note-4').forEach(e => e.style.setProperty('--rot', '-1deg'));
    document.querySelectorAll('.note-5').forEach(e => e.style.setProperty('--rot', '4deg'));
}