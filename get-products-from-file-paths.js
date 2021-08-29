process.stdin.on('data', chunk => {
console.log('herree')
    const lines = chunk.toString().trim().split('\n')
    lines.forEach(line => process.stdout.write(`=> ${line}\n`))
  })
  
  process.stdin.on('end', () => process.exit(0))