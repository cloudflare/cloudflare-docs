// 偵測裝置效能 → 自動調整特效
const isLowEndDevice =
  navigator.hardwareConcurrency <= 4 ||
  /Android|iPhone/.test(navigator.userAgent);

if (isLowEndDevice) {
  document.documentElement.classList.add('low-performance');
}