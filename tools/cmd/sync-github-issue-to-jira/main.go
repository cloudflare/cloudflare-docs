package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

type IssueName struct {
	Name string `json:"name"`
}

type IssueValue struct {
	Value string `json:"value"`
}

type IssueKey struct {
	Key string `json:"key"`
}

type IssueFields struct {
	Project     IssueKey    `json:"project"`
	Summary     string      `json:"summary"`
	Description string      `json:"description"`
	MyTeam      IssueValue  `json:"customfield_14803"`
	IssueType   IssueName   `json:"issuetype"`
	Components  []Component `json:"components"`
}

type Component struct {
	Name string `json:"name"`
}

type InternalIssue struct {
	Fields IssueFields `json:"fields"`
}

type IssueCreationResponse struct {
	ID   string `json:"id"`
	Key  string `json:"key"`
	Self string `json:"self"`
}

func main() {
	ctx := context.Background()
	if len(os.Args) < 2 {
		log.Fatalf("Usage: sync-github-issue-to-jira <GitHub issue number>\n")
	}
	iss := os.Args[1]
	issueNumber, err := strconv.Atoi(iss)
	if err != nil {
		log.Fatalf("error parsing issue %q as a number: %s", iss, err)
	}

	githubRepositoryOwner := os.Getenv("GITHUB_OWNER")
	githubRepositoryName := os.Getenv("GITHUB_REPO")
	githubAccessToken := os.Getenv("GITHUB_TOKEN")
	jiraHostname := os.Getenv("JIRA_HOSTNAME")
	jiraAuthToken := os.Getenv("JIRA_AUTH_TOKEN")
	accessClientID := os.Getenv("CF_ACCESS_CLIENT_ID")
	accessClientSecret := os.Getenv("CF_ACCESS_CLIENT_SECRET")

	if githubRepositoryOwner == "" {
		log.Fatal("GITHUB_OWNER not set")
	}

	if githubRepositoryName == "" {
		log.Fatal("GITHUB_REPO not set")
	}

	if githubAccessToken == "" {
		log.Fatal("GITHUB_TOKEN not set")
	}

	if jiraHostname == "" {
		log.Fatal("JIRA_HOSTNAME not set")
	}

	if jiraAuthToken == "" {
		log.Fatal("JIRA_AUTH_TOKEN not set")
	}

	if accessClientID == "" {
		log.Fatal("CF_ACCESS_CLIENT_ID not set")
	}

	if accessClientSecret == "" {
		log.Fatal("CF_ACCESS_CLIENT_SECRET not set")
	}

	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: githubAccessToken},
	)
	tc := oauth2.NewClient(ctx, ts)

	client := github.NewClient(tc)

	issue, _, err := client.Issues.Get(ctx, githubRepositoryOwner, githubRepositoryName, issueNumber)
	if err != nil {
		log.Fatalf("error retrieving issue %s/%s#%d: %s", githubRepositoryOwner, githubRepositoryName, issueNumber, err)
	}

	newIssue := InternalIssue{Fields: IssueFields{
		Project:     IssueKey{Key: "PCX"},
		Summary:     *issue.Title,
		Description: jirafyBodyMarkdown(issue),
		MyTeam:      IssueValue{Value: "Product Management"},
		IssueType:   IssueName{Name: "Task"},
		Components:  []Component{{Name: "Other (Unknown)"}},
	}}

	res, err := json.Marshal(newIssue)
	if err != nil {
		fmt.Println(err)
	}

	url := fmt.Sprintf("https://%s/rest/api/latest/issue/", jiraHostname)
	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(res))
	if err != nil {
		log.Fatalf("failed to build HTTP request: %s", err)
	}

	req.Header.Set("authorization", "Basic "+jiraAuthToken)
	req.Header.Set("cf-access-client-id", accessClientID)
	req.Header.Set("cf-access-client-secret", accessClientSecret)
	req.Header.Set("content-type", "application/json")

	httpClient := &http.Client{}
	resp, err := httpClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("failed to read response body: %s", err)
	}

	var createdIssue IssueCreationResponse
	json.Unmarshal([]byte(body), &createdIssue)

	if resp.StatusCode != http.StatusCreated {
		fmt.Println(fmt.Sprintf("failed to create new JIRA issue, got status code: %d", resp.StatusCode))
		os.Exit(1)
	}

	fmt.Println(fmt.Sprintf("successfully created internal JIRA issue: %s", createdIssue.Key))

	os.Exit(0)
}

// jirafyBodyMarkdown takes GitHub markdown and makes it palatable for JIRA
// with reasonable formatting.
func jirafyBodyMarkdown(issue *github.Issue) string {
	output := "GitHub issue: " + *issue.HTMLURL + "\n\n---\n\n"

	output += *issue.Body
	output = strings.ReplaceAll(output, "###", "h3.")

	return output
}
