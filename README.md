
/* 改進的網格系統 */  
.patent-grid {  
  display: grid;  
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));  
  gap: 2rem;  
  padding: 2rem;  
  max-width: 1400px;  
  margin: 0 auto;  
}  
  
.patent-card {  
  position: relative;  
  border-radius: 12px;  
  overflow: hidden;  
  transition: transform 0.3s ease, box-shadow 0.3s ease;  
  background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%);  
}  
  
.patent-card:hover {  
  transform: translateY(-8px);  
  box-shadow: 0 12px 40px rgba(0, 255, 255, 0.3);  
}  
  
/* 圖片容器 */  
.patent-image {  
  width: 100%;  
  height: 250px;  
  object-fit: cover;  
  opacity: 0.85;  
  transition: opacity 0.3s ease;  
}  
  
.patent-card:hover .patent-image {  
  opacity: 1;  
}  
  
/* 標題覆蓋層 */  
.patent-overlay {  
  position: absolute;  
  bottom: 0;  
  left: 0;  
  right: 0;  
  padding: 1.5rem;  
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);  
}  
  
.patent-title {  
  font-size: 1.5rem;  
  font-weight: bold;  
  color: #00ffff;  
  margin-bottom: 0.5rem;  
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);  
}  
  
.patent-subtitle {  
  font-size: 0.9rem;  
  color: #ffffff;  
  opacity: 0.9;  
}
// 視差滾動效果  
document.addEventListener('scroll', () => {  
  const scrolled = window.pageYOffset;  
    
  // 主標題視差  
  const heroTitle = document.querySelector('.hero-title');  
  if (heroTitle) {  
    heroTitle.style.transform = `translateY(${scrolled * 0.5}px)`;  
  }  
    
  // 背景圖片視差（較慢速度）  
  const bgImages = document.querySelectorAll('.patent-bg');  
  bgImages.forEach(img => {  
    const speed = img.dataset.speed || 0.3;  
    img.style.transform = `translateY(${scrolled * speed}px)`;  
  });  
    
  // 卡片淡入動畫  
  const cards = document.querySelectorAll('.patent-card');  
  cards.forEach(card => {  
    const cardTop = card.getBoundingClientRect().top;  
    const windowHeight = window.innerHeight;  
      
    if (cardTop < windowHeight * 0.8) {  
      card.classList.add('visible');  
    }  
  });  
});  
  
// CSS 配合  
.patent-card {  
  opacity: 0;  
  transform: translateY(50px);  
  transition: opacity 0.6s ease, transform 0.6s ease;  
}  
  
.patent-card.visible {  
  opacity: 1;  
  transform: translateY(0);  
}
/* 發光邊框動畫 */  
.ai-section {  
  position: relative;  
  padding: 3rem;  
  background: rgba(0, 0, 0, 0.85);  
  overflow: hidden;  
}  
  
.ai-section::before {  
  content: '';  
  position: absolute;  
  inset: 0;  
  border-radius: 12px;  
  padding: 2px;  
  background: linear-gradient(  
    45deg,  
    #00ffff,  
    #0080ff,  
    #00ffff,  
    #0080ff  
  );  
  background-size: 300% 300%;  
  animation: gradientRotate 3s ease infinite;  
  -webkit-mask:   
    linear-gradient(#fff 0 0) content-box,   
    linear-gradient(#fff 0 0);  
  -webkit-mask-composite: xor;  
  mask-composite: exclude;  
}  
  
@keyframes gradientRotate {  
  0%, 100% { background-position: 0% 50%; }  
  50% { background-position: 100% 50%; }  
}  
  
/* 指紋掃描效果 */  
.fingerprint-container {  
  position: relative;  
  display: inline-block;  
}  
  
.fingerprint-scan {  
  position: absolute;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 3px;  
  background: linear-gradient(90deg,   
    transparent,  
    #00ffff,  
    transparent  
  );  
  animation: scan 2s ease-in-out infinite;  
  box-shadow: 0 0 20px #00ffff;  
}  
  
@keyframes scan {  
  0%, 100% { top: 0; opacity: 0; }  
  50% { top: 100%; opacity: 1; }  
}  
  
/* 脈衝光環 */  
.pulse-ring {  
  position: absolute;  
  border: 2px solid #00ffff;  
  border-radius: 50%;  
  animation: pulse 2s ease-out infinite;  
}  
  
@keyframes pulse {  
  0% {  
    transform: scale(0.8);  
    opacity: 1;  
  }  
  100% {  
    transform: scale(1.5);  
    opacity: 0;  
  }  
}
// 簡易粒子系統  
class ParticleBackground {  
  constructor(canvas) {  
    this.canvas = canvas;  
    this.ctx = canvas.getContext('2d');  
    this.particles = [];  
    this.init();  
  }  
    
  init() {  
    // 調整畫布大小  
    this.resize();  
    window.addEventListener('resize', () => this.resize());  
      
    // 創建粒子  
    for (let i = 0; i < 50; i++) {  
      this.particles.push({  
        x: Math.random() * this.canvas.width,  
        y: Math.random() * this.canvas.height,  
        vx: (Math.random() - 0.5) * 0.5,  
        vy: (Math.random() - 0.5) * 0.5,  
        radius: Math.random() * 2 + 1  
      });  
    }  
      
    this.animate();  
  }  
    
  resize() {  
    this.canvas.width = window.innerWidth;  
    this.canvas.height = window.innerHeight;  
  }  
    
  animate() {  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  
      
    // 更新粒子  
    this.particles.forEach(p => {  
      p.x += p.vx;  
      p.y += p.vy;  
        
      // 邊界反彈  
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;  
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;  
        
      // 繪製粒子  
      this.ctx.beginPath();  
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);  
      this.ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';  
      this.ctx.fill();  
    });  
      
    // 連接近距離粒子  
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
      
    requestAnimationFrame(() => this.animate());  
  }  
}  
  
// 使用方式  
const canvas = document.getElementById('particle-bg');  
new ParticleBackground(canvas);

# Cloudflare Developer Documentation

Welcome to the open-source repository for all [Cloudflare Developer Documentation](https://developers.cloudflare.com/).

To learn how to contribute, visit the [contribution page](https://developers.cloudflare.com/style-guide/contributions/) of the Cloudflare Style Guide.

## License and Legal Notices

Except as otherwise noted, Cloudflare and any contributors grant you a license to the Cloudflare Developer Documentation and other content in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode), see the [LICENSE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE), and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the [LICENSE-CODE file](https://github.com/cloudflare/cloudflare-docs/blob/production/LICENSE-CODE).

Cloudflare products and services referenced in the documentation may be either trademarks or registered trademarks of Cloudflare in the United States and/or other countries. The licenses for this project do not grant you rights to use any Cloudflare names, logos, or trademarks. Cloudflare's general trademark guidelines can be found at [https://www.cloudflare.com/trademark/](https://www.cloudflare.com/trademark/).
Cloudflare and any contributors reserve all other rights, whether under their respective copyrights, patents, or trademarks, whether by implication, estoppel, or otherwise.

Please note that we may use AI tools to help us review technical documentation, pull requests and other issues submitted to our public GitHub page in order to identify and correct mistakes and other inconsistencies in our developer documentation. Please refrain from sharing any personal information in your submissions.
