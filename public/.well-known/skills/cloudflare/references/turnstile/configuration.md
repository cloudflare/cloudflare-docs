## Configuration Options

### Widget Configurations
```javascript
{
  sitekey: 'required',              // Your widget sitekey
  action: 'optional-string',        // Custom action identifier for analytics
  cData: 'optional-string',         // Custom data passed back in validation
  callback: (token) => {},          // Success callback with token
  'error-callback': (code) => {},   // Error callback
  'expired-callback': () => {},     // Token expiry callback
  'timeout-callback': () => {},     // Challenge timeout callback
  'before-interactive-callback': () => {}, // Before showing checkbox
  'after-interactive-callback': () => {},  // After checkbox interaction
  theme: 'auto',                    // 'light', 'dark', 'auto'
  size: 'normal',                   // 'normal', 'flexible', 'compact'
  tabindex: 0,                      // Tab index for accessibility
  'response-field': true,           // Create hidden input (default: true)
  'response-field-name': 'cf-turnstile-response', /