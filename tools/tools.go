//go:build tools
// +build tools

package tools

//go:generate go install github.com/google/go-github/github
//go:generate go install golang.org/x/oauth2

import (
	_ "github.com/google/go-github/github"
	_ "golang.org/x/oauth2"
)
