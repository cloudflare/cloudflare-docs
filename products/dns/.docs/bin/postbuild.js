const fs = require("fs")
const { exec } = require("child_process")
const { pathPrefix } = require("../docs-config.js")

console.log("Running postbuild.js")

if (!pathPrefix && pathPrefix !== "") {
  console.error(`docs-config.js must have a pathPrefix set`)
}

if (pathPrefix.length && !pathPrefix.startsWith("/")) {
  console.error(`docs-config.js pathPrefix must start with a forward slash "/"`)
  return
}

const handleExec = (completed) => {
  return (error, stdout, stderr) => {
    if (error) {
      console.error(error)

    } else {
      const trimmedStdout = stdout.trim()
      if (trimmedStdout) console.log(trimmedStdout)

      const trimmedStderr = stderr.trim()
      if (trimmedStderr) console.log(trimmedStderr)

      completed()
    }
  }
}

const robots = `User-agent: *\nDisallow: /`

if (pathPrefix !== "") {
  // We are running from inside `.docs/`
  const dir = "$PWD/"
  const folderName = pathPrefix.substr(1)

  exec(`mv "${dir}public" "${dir}${folderName}"`, handleExec(() => {
    exec(`mkdir "${dir}public"`, handleExec(() => {
      exec(`mv "${dir}${folderName}" "${dir}public/"`, handleExec(() => {
        console.log("Completed postbuild")
        if (process.env.WORKERS_ENV && process.env.WORKERS_ENV === "development") {
          console.log("Building robots.txt for development environment")
          fs.writeFile(`${process.env.PWD}/public/robots.txt`, robots, err => err && console.error(err))
        }
      }))
    }))
  }))
}
