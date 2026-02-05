// ========== 粒子背景系統 ==========  
class ParticleBackground {  
    constructor(canvas) {  
        this.canvas = canvas;  
        this.ctx = canvas.getContext('2d');  
        this.particles = [];  
        this.mouse = { x: null, y: null, radius: 150 };  
        this.init();  
        this.setupEventListeners();  
    }  
      
    init() {  
        this.resize();  
        window.addEventListener('resize', () => this.resize());  
          
        const particleCount = window.innerWidth < 768 ? 30 : 60;  
        for (let i = 0; i < particleCount; i++) {  
            this.particles.push(this.createParticle());  
        }  
          
        this.animate();  
    }  
      
    createParticle() {  
        return {  
            x: Math.random() * this.canvas.width,  
            y: Math.random() * this.canvas.height,  
            vx: (Math.random() - 0.5) * 0.5,  
            vy: (Math.random() - 0.5) * 0.5,  
            radius: Math.random() * 2 + 1,  
            originalRadius: Math.random() * 2 + 1  
        };  
    }  
      
    resize() {  
        this.canvas.width = window.innerWidth;  
        this.canvas.height = window.innerHeight;  
    }  
      
    setupEventListeners() {  
        window.addEventListener('mousemove', (e) => {  
            this.mouse.x = e.x;  
            this.mouse.y = e.y;  
        });  
          
        window.addEventListener('mouseleave', () => {  
            this.mouse.x = null;  
            this.mouse.y = null;  
        });  
    }  
      
    animate() {  
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
          
        this.particles.forEach(p => {  
            // 滑鼠互動  
            if (this.mouse.x != null && this.mouse.y != null) {  
                const dx = this.mouse.x - p.x;  
                const dy = this.mouse.y - p.y;  
                const distance = Math.sqrt(dx * dx + dy * dy);  
                  
                if (distance < this.mouse.radius) {  
                    const angle = Math.atan2(dy, dx);  
                    const force = (this.mouse.radius - distance) / this.mouse.radius;  
                    p.vx -= Math.cos(angle) * force * 0.5;  
                    p.vy -= Math.sin(angle) * force * 0.5;  
                    p.radius = p.originalRadius * (1 + force);  
                } else {  
                    p.radius = p.originalRadius;  
                }  
            }  
              
            // 更新位置  
            p.x += p.vx;  
            p.y += p.vy;  
              
            // 邊界反彈  
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;  
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;  
              
            // 繪製粒子  
            this.ctx.beginPath();  
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);  
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';  
            this.ctx.shadowBlur = 10;  
            this.ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';  
            this.ctx.fill();  
            this.ctx.shadowBlur = 0;  
        });  
          
        // 連接粒子  
        this.connectParticles();  
          
        requestAnimationFrame(() => this.animate());  
    }  
      
    connectParticles() {  
        for (let i = 0; i < this.particles.length; i++) {  
            for (let j = i + 1; j < this.particles.length; j++) {  
                const dx = this.particles[i].x - this.particles[j].x;  
                const dy = this.particles[i].y - this.particles[j].y;  
                const distance = Math.sqrt(dx * dx + dy * dy);  
                  
                if (distance < 150) {  
                    this.ctx.beginPath();  
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 150})`;  
                    this.ctx.lineWidth = 0.5;  
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);  
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);  
                    this.ctx.stroke();  
                }  
            }  
        }  
    }  
}  
  
// ========== 視差滾動效果 ==========  
function initParallax() {  
    document.addEventListener('scroll', () => {  
        const scrolled = window.pageYOffset;  
          
        // 主標題視差  
        const heroTitle = document.querySelector('.hero-title');  
        if (heroTitle) {  
            heroTitle.style.transform = `translateY(${scrolled * 0.5}px)`;  
            heroTitle.style.opacity = 1 - scrolled / 600;  
        }  
          
        const heroSubtitle = document.querySelector('.hero-subtitle');  
        if (heroSubtitle) {  
            heroSubtitle.style.transform = `translateY(${scrolled * 0.3}px)`;  
            heroSubtitle.style.opacity = 1 - scrolled / 500;  
        }  
          
        // 背景圖片視差  
        const bgImages = document.querySelectorAll('.patent-bg');  
        bgImages.forEach(img => {  
            const card = img.closest('.patent-card');  
            const cardTop = card.getBoundingClientRect().top;  
            const speed = parseFloat(card.dataset.speed) || 0.3;  
            img.style.transform = `translateY(${cardTop * speed * -0.1}px)`;  
        });  
          
        // 卡片淡入  
        const cards = document.querySelectorAll('.patent-card');  
        cards.forEach(card => {  
            const cardTop = card.getBoundingClientRect().top;  
            const windowHeight = window.innerHeight;  
              
            if (cardTop < windowHeight * 0.8) {  
                card.classList.add('visible');  
            }  
        });  
    });  
}  
  
// ========== 初始化 ==========  
document.addEventListener('DOMContentLoaded', () => {  
    // 啟動粒子背景  
    const canvas = document.getElementById('particle-bg');  
    if (canvas) {  
        new ParticleBackground(canvas);  
    }  
      
    // 啟動視差  
    initParallax();  
      
    // 平滑滾動  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {  
        anchor.addEventListener('click', function (e) {  
            e.preventDefault();  
            const target = document.querySelector(this.getAttribute('href'));  
            if (target) {  
                target.scrollIntoView({ behavior: 'smooth' });  
            }  
        });  
    });  
      
    // 控制台訊息  
    console.log('%c⚡ Lightning Empire Patents', 'color: #00ffff; font-size: 20px; font-weight: bold;');  
    console.log('%c300天免費回饋人類世界 | Wshao777技術主權', 'color: #0080ff; font-size: 14px;');  
});