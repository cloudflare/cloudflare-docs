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