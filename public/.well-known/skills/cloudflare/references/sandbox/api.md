# API Reference

## Command Execution

```typescript
// Basic
const result = await sandbox.exec('python3 script.py');
// Returns: { stdout, stderr, exitCode, success, duration }

// Streaming
await sandbox.exec('npm install', {
  stream: true,
  onOutput: (stream, data) => console.log(`[${stream}]`, data),
  onComplete: (result) => console.log('Exit:', result.exitCode),
  onError: (error) => console.error(error)
});

// With env & cwd
await sandbox.exec('python3 test.py', {
  cwd: '/workspace/project',
  env: { API_KEY: 'secret', DEBUG: 'true' }
});
```

## File Operations

```typescript
// Read
const file = await sandbox.readFile('/workspace/data.txt');
// Returns: { content, path }

// Write (creates dirs automatically)
await sandbox.writeFile('/workspace/deep/nested/file.txt', 'content');

// List
const files = await sandbox.listFiles('/workspace');
// Returns: [{ name, path, type: 'file'|'directory', size, modified }]

// Delete
await sandbox.deleteFile('/workspace/temp.txt');
await sandbox.deleteFile('/workspace/temp-dir', { recursive: true });

// Directory ops
await sandbox.mkdir('/workspace/new-dir', { recursive: true });
const exists = await sandbox.pathExists('/workspace/file.txt');
```

## Background Processes

```typescript
// Start
const process = await sandbox.startProcess('python3 -m http.server 8080', {
  processId: 'web-server',
  cwd: '/workspace/public',
  env: { PORT: '8080' }
});
// Returns: { id, pid, command }

// Management
const processes = await sandbox.listProcesses();
const info = await sandbox.getProcess('web-server');
await sandbox.stopProcess('web-server');
const logs = await sandbox.getProcessLogs('web-server');
```

## Port Exposure

```typescript
// Expose
const exposed = await sandbox.exposePort(8080, {
  name: 'web-app',
  hostname: request.hostname
});
// Returns: { url, port, name, status }

// Check
const isExposed = await sandbox.isPortExposed(8080);
const portInfo = await sandbox.getExposedPort(8080);
const allPorts = await sandbox.getExposedPorts(request.hostname);

// Unexpose
await sandbox.unexposePort(8080);
```

## Sessions (Isolated Contexts)

Each session maintains own shell state, env vars, cwd, process namespace.

```typescript
// Create
const session = await sandbox.createSession({
  id: 'user-123',
  name: 'User Workspace',
  cwd: '/workspace/user123',
  env: { USER_ID: '123', API_KEY: 'secret' }
});

// Use (full sandbox API bound to session context)
await session.exec('echo $USER_ID');
await session.writeFile('config.txt', 'data');
await session.startProcess('python3 worker.py', { processId: 'worker-1' });

// Retrieve
const session = await sandbox.getSession('user-123');
const sessions = await sandbox.listSessions();

// Delete
await sandbox.deleteSession('user-123');
```

## Code Interpreter

```typescript
const result = await sandbox.interpret('python', {
  code: `
import matplotlib.pyplot as plt
plt.plot([1, 2, 3], [4, 5, 6])
plt.savefig('plot.png')
print("Chart created")
  `,
  files: {
    'data.csv': 'name,value\nalice,10\nbob,20'
  }
});
// Returns: { outputs: [{ type, content }], files, error }
```

## Error Handling

```typescript
// Command errors
const result = await sandbox.exec('python3 invalid.py');
if (!result.success) {
  console.error('Exit code:', result.exitCode);
  console.error('Stderr:', result.stderr);
}

// SDK errors
try {
  await sandbox.readFile('/nonexistent');
} catch (error) {
  if (error.code === 'FILE_NOT_FOUND') { /* ... */ }
  else if (error.code === 'CONTAINER_NOT_READY') { /* retry */ }
  else if (error.code === 'TIMEOUT') { /* ... */ }
}

// Retry pattern
async function execWithRetry(sandbox, cmd, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sandbox.exec(cmd);
    } catch (error) {
      if (error.code === 'CONTAINER_NOT_READY' && i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      throw error;
    }
  }
}
```

## Client Architecture

```
SandboxClient (aggregator)
├── CommandClient     → exec(), streaming
├── FileClient        → read/write/list/delete
├── ProcessClient     → background processes
├── PortClient        → expose services, preview URLs
├── GitClient         → clone repos
├── UtilityClient     → health, sessions
└── InterpreterClient → code execution (Python/JS)
```

**Execution Modes**:
1. **Foreground** (exec): Blocking, captures output
2. **Background** (execStream/startProcess): Non-blocking, uses FIFOs, concurrent
