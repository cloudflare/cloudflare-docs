/**
 * Smart Documentation Worker
 * Personalizes technical documentation based on user's environment
 * 
 * Features:
 * - OS detection (Mac, Windows, Linux)
 * - Browser detection
 * - Geolocation-based customization
 * - Real-time content adaptation using HTMLRewriter
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve the demo documentation page at root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return handleDocumentationRequest(request);
    }
    
    // Serve the Cloudflare docs demo
    if (url.pathname === '/cloudflare-demo' || url.pathname === '/demo') {
      return handleCloudflareDemo(request);
    }
    
    // API endpoint to get user environment info
    if (url.pathname === '/api/environment') {
      return getUserEnvironment(request);
    }
    
    return new Response('Not Found', { status: 404 });
  }
};

/**
 * Detect user's operating system from User-Agent
 */
function detectOS(userAgent) {
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('mac os x') || ua.includes('macintosh')) {
    return 'mac';
  } else if (ua.includes('windows')) {
    return 'windows';
  } else if (ua.includes('linux')) {
    return 'linux';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    return 'ios';
  } else if (ua.includes('android')) {
    return 'android';
  }
  
  return 'unknown';
}

/**
 * Detect browser from User-Agent
 */
function detectBrowser(userAgent) {
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('chrome') && !ua.includes('edg')) {
    return 'chrome';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    return 'safari';
  } else if (ua.includes('firefox')) {
    return 'firefox';
  } else if (ua.includes('edg')) {
    return 'edge';
  }
  
  return 'unknown';
}

/**
 * Get user environment information
 */
function getUserEnvironment(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const os = detectOS(userAgent);
  const browser = detectBrowser(userAgent);
  const country = request.cf?.country || 'unknown';
  const city = request.cf?.city || 'unknown';
  
  return new Response(JSON.stringify({
    os,
    browser,
    country,
    city,
    userAgent
  }, null, 2), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-cache'
    }
  });
}

/**
 * Handle documentation page requests with personalization
 */
function handleDocumentationRequest(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const os = detectOS(userAgent);
  const browser = detectBrowser(userAgent);
  const country = request.cf?.country || 'US';
  
  // Get the base HTML
  const html = getDocumentationHTML();
  
  // Create a response that we'll transform
  const response = new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    }
  });
  
  // Use HTMLRewriter to personalize the content
  return new HTMLRewriter()
    // Inject user environment data
    .on('meta[name="user-os"]', {
      element(element) {
        element.setAttribute('content', os);
      }
    })
    .on('meta[name="user-browser"]', {
      element(element) {
        element.setAttribute('content', browser);
      }
    })
    .on('meta[name="user-country"]', {
      element(element) {
        element.setAttribute('content', country);
      }
    })
    // Personalize keyboard shortcuts based on OS
    .on('.os-mac', {
      element(element) {
        if (os !== 'mac') {
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
        if (os !== 'linux') {
          element.setAttribute('style', 'display: none;');
        }
      }
    })
    // Highlight the user's detected OS
    .on('.os-badge', {
      element(element) {
        const badgeOs = element.getAttribute('data-os');
        if (badgeOs === os) {
          element.setAttribute('class', 'os-badge active');
        }
      }
    })
    .transform(response);
}

/**
 * Handle Cloudflare developer docs demo
 */
async function handleCloudflareDemo(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const os = detectOS(userAgent);
  
  // Read the demo HTML file
  const demoHTML = await readCloudflareDemo();
  
  const response = new Response(demoHTML, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    }
  });
  
  // Personalize the Cloudflare docs demo
  return new HTMLRewriter()
    .on('meta[name="user-os"]', {
      element(element) {
        element.setAttribute('content', os);
      }
    })
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

/**
 * Read Cloudflare demo HTML
 * In production, this could fetch from KV, R2, or external URL
 */
async function readCloudflareDemo() {
  // For this demo, we'll fetch from the examples directory
  // In production, you'd store this in Workers KV or R2
  try {
    const response = await fetch('https://raw.githubusercontent.com/kcwilliamson/smart-docs-worker/main/examples/cloudflare-docs-demo.html');
    return await response.text();
  } catch (error) {
    // Fallback if file not found
    return `<!DOCTYPE html>
<html>
<head><title>Demo Not Found</title></head>
<body>
  <h1>Cloudflare Demo</h1>
  <p>The demo file is available at <code>/examples/cloudflare-docs-demo.html</code></p>
  <p>Run <code>wrangler dev</code> locally to see the full demo.</p>
</body>
</html>`;
  }
}

/**
 * Sample documentation HTML with environment-specific content
 */
function getDocumentationHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="user-os" content="unknown">
    <meta name="user-browser" content="unknown">
    <meta name="user-country" content="unknown">
    <title>Smart Documentation Demo - Personalized Technical Docs</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        header p {
            font-size: 1.1rem;
            opacity: 0.95;
        }
        
        .content {
            padding: 40px;
        }
        
        .env-detection {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 4px;
        }
        
        .env-detection h2 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .env-badges {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        
        .os-badge {
            padding: 8px 16px;
            background: #e9ecef;
            border-radius: 20px;
            font-size: 0.9rem;
            color: #666;
            transition: all 0.3s ease;
        }
        
        .os-badge.active {
            background: #667eea;
            color: white;
            font-weight: 600;
            transform: scale(1.05);
        }
        
        .doc-section {
            margin: 30px 0;
        }
        
        .doc-section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.8rem;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        
        .doc-section h3 {
            color: #34495e;
            margin: 20px 0 10px 0;
            font-size: 1.3rem;
        }
        
        .shortcut-group {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .shortcut {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            margin: 8px 0;
            background: white;
            border-radius: 6px;
            border: 1px solid #dee2e6;
        }
        
        .shortcut-desc {
            font-weight: 500;
            color: #495057;
        }
        
        .keys {
            display: flex;
            gap: 5px;
        }
        
        .key {
            background: linear-gradient(180deg, #ffffff 0%, #e9ecef 100%);
            border: 1px solid #adb5bd;
            border-radius: 4px;
            padding: 4px 12px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            color: #495057;
        }
        
        .highlight {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        .code-block {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
        }
        
        .code-block code {
            display: block;
            white-space: pre;
        }
        
        .info-box {
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        footer {
            background: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        footer a {
            color: #667eea;
            text-decoration: none;
        }
        
        footer a:hover {
            text-decoration: underline;
        }
        
        .demo-note {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .demo-note strong {
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎯 Smart Documentation</h1>
            <p>Technical docs that adapt to YOUR environment</p>
        </header>
        
        <div class="content">
            <div class="demo-note">
                <strong>✨ This page is being personalized for you right now!</strong>
                The Cloudflare Worker detected your operating system and is showing you relevant keyboard shortcuts automatically.
            </div>
            
            <div class="env-detection">
                <h2>🔍 We Detected Your Environment</h2>
                <p>Based on your User-Agent and request metadata, this documentation is personalized for:</p>
                <div class="env-badges">
                    <span class="os-badge" data-os="mac">🍎 macOS</span>
                    <span class="os-badge" data-os="windows">🪟 Windows</span>
                    <span class="os-badge" data-os="linux">🐧 Linux</span>
                </div>
                <div class="info-box" style="margin-top: 15px;">
                    <strong>How it works:</strong> The Cloudflare Worker uses HTMLRewriter to hide irrelevant content and highlight what matters to you - no JavaScript required!
                </div>
            </div>
            
            <div class="doc-section">
                <h2>📚 Getting Started</h2>
                <p>Install the CLI tool on your system:</p>
                
                <div class="os-mac">
                    <div class="highlight">
                        <strong>📦 For macOS users (that's you!):</strong>
                    </div>
                    <div class="code-block"><code>brew install smart-cli
# or
curl -fsSL https://install.smart-cli.com | bash</code></div>
                </div>
                
                <div class="os-windows">
                    <div class="highlight">
                        <strong>📦 For Windows users (that's you!):</strong>
                    </div>
                    <div class="code-block"><code>winget install smart-cli
# or
iwr https://install.smart-cli.com/windows.ps1 | iex</code></div>
                </div>
                
                <div class="os-linux">
                    <div class="highlight">
                        <strong>📦 For Linux users (that's you!):</strong>
                    </div>
                    <div class="code-block"><code>curl -fsSL https://install.smart-cli.com | bash
# or
wget -qO- https://install.smart-cli.com | bash</code></div>
                </div>
            </div>
            
            <div class="doc-section">
                <h2>⌨️ Keyboard Shortcuts</h2>
                <p>Essential shortcuts for your operating system:</p>
                
                <div class="os-mac">
                    <div class="shortcut-group">
                        <h3>🍎 macOS Shortcuts</h3>
                        <div class="shortcut">
                            <span class="shortcut-desc">Open Command Palette</span>
                            <div class="keys">
                                <span class="key">⌘</span>
                                <span class="key">Shift</span>
                                <span class="key">P</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Quick Search</span>
                            <div class="keys">
                                <span class="key">⌘</span>
                                <span class="key">K</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Toggle Terminal</span>
                            <div class="keys">
                                <span class="key">⌘</span>
                                <span class="key">\`</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Save File</span>
                            <div class="keys">
                                <span class="key">⌘</span>
                                <span class="key">S</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="os-windows">
                    <div class="shortcut-group">
                        <h3>🪟 Windows Shortcuts</h3>
                        <div class="shortcut">
                            <span class="shortcut-desc">Open Command Palette</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">Shift</span>
                                <span class="key">P</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Quick Search</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">K</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Toggle Terminal</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">\`</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Save File</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">S</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="os-linux">
                    <div class="shortcut-group">
                        <h3>🐧 Linux Shortcuts</h3>
                        <div class="shortcut">
                            <span class="shortcut-desc">Open Command Palette</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">Shift</span>
                                <span class="key">P</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Quick Search</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">K</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Toggle Terminal</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">\`</span>
                            </div>
                        </div>
                        <div class="shortcut">
                            <span class="shortcut-desc">Save File</span>
                            <div class="keys">
                                <span class="key">Ctrl</span>
                                <span class="key">S</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="doc-section">
                <h2>🚀 Advanced Configuration</h2>
                
                <div class="os-mac">
                    <h3>macOS-specific Settings</h3>
                    <div class="code-block"><code>// ~/.config/smart-cli/config.json
{
  "terminal": "iTerm2",
  "shell": "zsh",
  "packageManager": "brew"
}</code></div>
                </div>
                
                <div class="os-windows">
                    <h3>Windows-specific Settings</h3>
                    <div class="code-block"><code>// %APPDATA%\\smart-cli\\config.json
{
  "terminal": "Windows Terminal",
  "shell": "PowerShell",
  "packageManager": "winget"
}</code></div>
                </div>
                
                <div class="os-linux">
                    <h3>Linux-specific Settings</h3>
                    <div class="code-block"><code>// ~/.config/smart-cli/config.json
{
  "terminal": "gnome-terminal",
  "shell": "bash",
  "packageManager": "apt"
}</code></div>
                </div>
            </div>
            
            <div class="doc-section">
                <h2>💡 The UX Innovation</h2>
                <div class="info-box">
                    <p><strong>Problem:</strong> Traditional documentation forces users to mentally filter content ("Skip the Mac instructions, I'm on Windows").</p>
                    <p style="margin-top: 10px;"><strong>Solution:</strong> This Cloudflare Worker automatically detects your environment and shows only what's relevant to YOU.</p>
                    <p style="margin-top: 10px;"><strong>Result:</strong> Faster comprehension, less cognitive load, better developer experience.</p>
                </div>
            </div>
        </div>
        
        <footer>
            <p>Built with Cloudflare Workers + HTMLRewriter | <a href="/api/environment">View Your Environment Data</a></p>
            <p style="margin-top: 10px; font-size: 0.9rem;">Try opening this page on different devices to see the personalization in action!</p>
        </footer>
    </div>
    
    <script>
        // Optional: Display detected environment in real-time
        const userOs = document.querySelector('meta[name="user-os"]').content;
        const userBrowser = document.querySelector('meta[name="user-browser"]').content;
        console.log('Detected Environment:', { os: userOs, browser: userBrowser });
    </script>
</body>
</html>`;
}
