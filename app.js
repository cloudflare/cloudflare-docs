// ===== 粒子背景系統 =====  
class ParticleBackground {  
  constructor(canvas) {  
    this.canvas = canvas;  
    this.ctx = canvas.getContext('2d');  
    this.particles = [];  
    this.mouseX = 0;  
    this.mouseY = 0;  
    this.init();  
  }  
  
  init() {  
    this.resize();  
    window.addEventListener('resize', () => this.resize());  
    window.addEventListener('mousemove', (e) => {  
      this.mouseX = e.clientX;  
      this.mouseY = e.clientY;  
    });  
  
    // 創建粒子  
    const particleCount = window.innerWidth < 768 ? 30 : 60;  
    for (let i = 0; i < particleCount; i++) {  
      this.particles.push({  
        x: Math.random() * this.canvas.width,  
        y: Math.random() * this.canvas.height,  
        vx: (Math.random() - 0.5) * 0.5,  
        vy: (Math.random() - 0.5) * 0.5,  
        radius: Math.random() * 2 + 1,  
        opacity: Math.random() * 0.5 + 0.3  
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
    this.particles.forEach((p, i) => {  
      // 移動  
      p.x += p.vx;  
      p.y += p.vy;  
  
      // 邊界反彈  
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;  
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;  
  
      // 滑鼠互動  
      const dx = this.mouseX - p.x;  
      const dy = this.mouseY - p.y;  
      const dist = Math.sqrt(dx * dx + dy * dy);  
      if (dist < 150) {  
        p.vx += dx * 0.0001;  
        p.vy += dy * 0.0001;  
      }  
  
      // 繪製粒子  
      this.ctx.beginPath();  
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);  
      this.ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;  
      this.ctx.fill();  
  
      // 連接線  
      for (let j = i + 1; j < this.particles.length; j++) {  
        const dx2 = p# 🎯 完整可用檔案包（含副檔名）  
  
根據您的需求，我提供**三個完整專案包**，用於GitHub專利展示頁面的300天免費貢獻回饋。每個方案都包含完整的HTML、CSS、JavaScript檔案，可直接部署。  
  
---  
  
## 📦 方案A：響應式專利展示（基礎版）  
  
### 檔案結構