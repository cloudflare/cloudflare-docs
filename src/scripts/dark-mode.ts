import { initDarkModePlugin } from '~/plugins/dark-mode';

let cleanup: (() => void) | undefined;

if (typeof window !== 'undefined') {
  cleanup = initDarkModePlugin();
}

document.addEventListener('astro:page-load', () => {
  if (cleanup) cleanup();
  cleanup = initDarkModePlugin();
});

document.addEventListener('astro:before-swap', () => {
  if (cleanup) cleanup();
});
