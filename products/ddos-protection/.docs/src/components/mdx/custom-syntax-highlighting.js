export const languageMappings = {
  "shell": "sh",
  "javascript": "js",
  "markup": "html",
  "vue": "html"
}

export const prismLanguages = {
  sh: {
    comment: {
      pattern: /(^|[^"{\\$])#.*/,
      alias: "unselectable",
      lookbehind: true
    },

    directory: {
      pattern: /^[^\r\n$*!]+(?=[$])/m,
      alias: "unselectable"
    },

    command: {
      pattern: /[$](?:[^\r\n])+/,
      inside: {
        prompt: {
          pattern: /^[$] /,
          alias: "unselectable"
        }
      }
    }
  }
}

const transformations = {
  js: {
    keyword: {
      to: "declaration-keyword",
      for: ["const", "let", "var", "async", "await", "function", "class"]
    },
    punctuation: {
      to: "operator",
      for: ["."]
    },
    "class-name": {
      to: "api",
      for: ["HTMLRewriter", "Request", "Response", "URL", "Error"]
    },
    function: {
      to: "builtin",
      for: ["fetch", "console", "addEventListener", "atob", "btoa", "setInterval", "clearInterval", "setTimeout", "clearTimeout"]
    }
  }
}

transformations.html = {
  keyword: transformations.js.keyword
}

export const transformToken = ({ token, children, language }) => {
  const lang = transformations[language]
  if (!lang) return token

  const any = transformations[language]["*"]
  const trans = transformations[language][token]

  if (!any && !trans)
    return token

  if (trans && trans.for.includes(children))
    return trans.to

  if (any && any.for(children))
    return any.to

  return token
}
