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