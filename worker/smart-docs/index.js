/**
 * Smart Documentation Worker - Environment Detection
 * Personalizes technical documentation based on user's environment
 * Silently shows only relevant content for user's OS
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve the silent documentation page at root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return handleDocumentationRequest(request);
    }
    
    // API endpoint to get user environment info (for debugging)
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
 * Handle documentation page requests with SILENT personalization
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
  
  // Use HTMLRewriter to SILENTLY personalize the content
  // No badges, no indicators, no messages - just hide irrelevant content
  return new HTMLRewriter()
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
    .transform(response);
}

/**
 * Documentation HTML WITHOUT any smart docs messaging
 * User doesn't know it's personalized - it just works
 */
function getDocumentationHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get Started with Cloudflare Workers</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f9fafb;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 40px;
        }
        
        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 20px;
        }
        
        h2 {
            font-size: 1.8rem;
            color: #34495e;
            margin: 30px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        p {
            margin-bottom: 15px;
            color: #4b5563;
        }
        
        .code-block {
            background: #1f2937;
            color: #e5e7eb;
            padding: 20px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
        }
        
        .step {
            margin: 25px 0;
        }
        
        .step-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: #f6821f;
            color: white;
            border-radius: 50%;
            font-weight: 700;
            margin-right: 12px;
        }
        
        /* OS Switcher Tabs */
        .os-switcher {
            display: flex;
            gap: 8px;
            margin: 20px 0;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .os-tab {
            padding: 10px 20px;
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: #6b7280;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            transition: all 0.2s;
        }
        
        .os-tab:hover {
            color: #f6821f;
        }
        
        .os-tab.active {
            color: #f6821f;
            border-bottom-color: #f6821f;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Get Started with Cloudflare Workers</h1>
        <p>This guide will help you install Wrangler, the Workers CLI, and deploy your first Worker.</p>
        
        <h2><span class="step-number">1</span>Install Wrangler CLI</h2>
        
        <p>Wrangler is the official CLI for managing Cloudflare Workers. Install it using your package manager:</p>
        
        <!-- OS Switcher Tabs -->
        <div class="os-switcher">
            <button class="os-tab" data-os="mac" onclick="switchOS('mac')">macOS</button>
            <button class="os-tab" data-os="windows" onclick="switchOS('windows')">Windows</button>
            <button class="os-tab" data-os="linux" onclick="switchOS('linux')">Linux</button>
        </div>
        
        <!-- macOS Installation - shown only to Mac users -->
        <div class="os-mac">
            <div class="step">
                <h3>Installation</h3>
                <div class="code-block">brew install wrangler</div>
                <p>Or using npm:</p>
                <div class="code-block">npm install -g wrangler</div>
            </div>
        </div>
        
        <!-- Windows Installation - shown only to Windows users -->
        <div class="os-windows">
            <div class="step">
                <h3>Installation</h3>
                <div class="code-block">winget install Cloudflare.Wrangler</div>
                <p>Or using npm:</p>
                <div class="code-block">npm install -g wrangler</div>
            </div>
        </div>
        
        <!-- Linux Installation - shown only to Linux users -->
        <div class="os-linux">
            <div class="step">
                <h3>Installation</h3>
                <div class="code-block">npm install -g wrangler</div>
                <p>Or using your package manager:</p>
                <div class="code-block">curl -fsSL https://wrangler.io/install.sh | sh</div>
            </div>
        </div>
        
        <h2><span class="step-number">2</span>Verify Installation</h2>
        
        <p>Check that Wrangler is installed correctly:</p>
        <div class="code-block">wrangler --version</div>
        
        <h2><span class="step-number">3</span>Authenticate with Cloudflare</h2>
        
        <p>Login to your Cloudflare account:</p>
        <div class="code-block">wrangler login</div>
        
        <h2><span class="step-number">4</span>Create Your First Worker</h2>
        
        <p>Use Wrangler to scaffold a new Worker project:</p>
        <div class="code-block">wrangler init my-worker
cd my-worker</div>
        
        <h2><span class="step-number">5</span>Deploy to Production</h2>
        
        <p>When you're ready, deploy your Worker:</p>
        <div class="code-block">wrangler deploy</div>
        
        <p style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-radius: 6px;">
            <strong>Next Steps:</strong> Explore our examples, tutorials, and API documentation to build your next project.
        </p>
    </div>
    
    <script>
        // OS Switcher functionality
        function switchOS(os) {
            // Hide all OS sections
            document.querySelectorAll('.os-mac, .os-windows, .os-linux').forEach(el => {
                el.style.display = 'none';
            });
            
            // Show selected OS section
            document.querySelectorAll('.os-' + os).forEach(el => {
                el.style.display = 'block';
            });
            
            // Update active tab
            document.querySelectorAll('.os-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector('[data-os="' + os + '"]').classList.add('active');
            
            // Save preference to localStorage
            localStorage.setItem('preferred-os', os);
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Check for saved preference
            const savedOS = localStorage.getItem('preferred-os');
            
            // Determine which OS to show (saved preference or auto-detected)
            let activeOS = savedOS;
            
            // If no saved preference, use auto-detected OS from server
            if (!activeOS) {
                // Check which OS section is currently visible (auto-detected by server)
                if (document.querySelector('.os-mac').style.display !== 'none') {
                    activeOS = 'mac';
                } else if (document.querySelector('.os-windows').style.display !== 'none') {
                    activeOS = 'windows';
                } else if (document.querySelector('.os-linux').style.display !== 'none') {
                    activeOS = 'linux';
                } else {
                    // Fallback to first visible OS
                    activeOS = 'mac';
                }
            }
            
            // Set active tab and show content
            document.querySelector('[data-os="' + activeOS + '"]').classList.add('active');
            
            // If user has preference, apply it
            if (savedOS) {
                switchOS(savedOS);
            }
        });
    </script>
</body>
</html>`;
}
