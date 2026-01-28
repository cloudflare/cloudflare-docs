/**
 * Utility functions for environment detection
 */

/**
 * Detect user's operating system from User-Agent
 */
export function detectOS(userAgent) {
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
export function detectBrowser(userAgent) {
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
 * Get OS-specific package manager
 */
export function getPackageManager(os) {
  switch(os) {
    case 'mac':
    case 'ios':
      return 'brew';
    case 'windows':
      return 'winget';
    case 'linux':
    case 'android':
      return 'apt';
    default:
      return 'npm';
  }
}

/**
 * Get OS-specific terminal shell
 */
export function getDefaultShell(os) {
  switch(os) {
    case 'mac':
    case 'ios':
      return 'zsh';
    case 'windows':
      return 'powershell';
    case 'linux':
    case 'android':
      return 'bash';
    default:
      return 'sh';
  }
}

/**
 * Get OS-specific config directory
 */
export function getConfigDir(os) {
  switch(os) {
    case 'mac':
    case 'ios':
    case 'linux':
    case 'android':
      return '~/.config';
    case 'windows':
      return '%APPDATA%';
    default:
      return '~/.config';
  }
}

/**
 * Get OS emoji icon
 */
export function getOSIcon(os) {
  switch(os) {
    case 'mac':
    case 'ios':
      return '🍎';
    case 'windows':
      return '🪟';
    case 'linux':
      return '🐧';
    case 'android':
      return '🤖';
    default:
      return '💻';
  }
}

/**
 * Get friendly OS name
 */
export function getOSName(os) {
  switch(os) {
    case 'mac':
      return 'macOS';
    case 'ios':
      return 'iOS';
    case 'windows':
      return 'Windows';
    case 'linux':
      return 'Linux';
    case 'android':
      return 'Android';
    default:
      return 'Unknown OS';
  }
}
