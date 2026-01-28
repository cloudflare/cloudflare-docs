/**
 * Demo: Cloudflare Developer Docs with Smart Personalization
 * 
 * This demonstrates how developer.cloudflare.com could benefit from
 * environment-aware documentation personalization.
 */

import { detectOS, detectBrowser } from './utils.js';

export async function handleCloudflareDocs(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const os = detectOS(userAgent);
  const browser = detectBrowser(userAgent);
  const country = request.cf?.country || 'US';
  
  // In production, this would fetch from the actual docs site
  const html = getCloudflareDemoHTML();
  
  const response = new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    }
  });
  
  // Use HTMLRewriter to personalize the Cloudflare docs
  return new HTMLRewriter()
    // Inject detected environment
    .on('meta[name="user-os"]', {
      element(element) {
        element.setAttribute('content', os);
      }
    })
    
    // Hide OS-specific sections not relevant to user
    .on('.os-mac', {
      element(element) {
        if (os !== 'mac' && os !== 'ios') {
          element.setAttribute('style', 'display: none;');
        }
      }
    })
    .on('.os-windows', {
      element(element) {
        if (os !== 'windows') {
          element.setAttribute('style', 'display: none;');
        }
      }
    })
    .on('.os-linux', {
      element(element) {
        if (os !== 'linux' && os !== 'android') {
          element.setAttribute('style', 'display: none;');
        }
      }
    })
    
    // Show only the relevant OS indicator badge
    .on('.os-indicator .os-mac', {
      element(element) {
        if (os !== 'mac' && os !== 'ios') {
          element.remove();
        }
      }
    })
    .on('.os-indicator .os-windows', {
      element(element) {
        if (os !== 'windows') {
          element.remove();
        }
      }
    })
    .on('.os-indicator .os-linux', {
      element(element) {
        if (os !== 'linux' && os !== 'android') {
          element.remove();
        }
      }
    })
    
    .transform(response);
}

function getCloudflareDemoHTML() {
  // In a real implementation, this would:
  // 1. Fetch from developer.cloudflare.com
  // 2. Or serve from Workers KV/R2
  // 3. Or use HTMLRewriter on proxied content
  
  // For demo purposes, we'll read from our example file
  // In production, you'd use: return fetch('https://developer.cloudflare.com/...')
  return `<!-- Demo HTML would be loaded here -->`;
}
