require('dotenv').config();
const axios = require('axios');

function getQuery(username, githubInput, xDaysAgo) {
  let queries = {
    "issues": `
    query{
      user(login: "${username}") {
        issues(last: 4) {
          nodes {
            title
            createdAt
          }
        }
      }
    }
    `,
    "issueComments": `
    query{
      user(login: "${username}") {
        issueComments(last: 4) {
          nodes {
            bodyText
            createdAt
          }
        }
      }
    }
    `,
    "repos": `
    query{
      user(login: "${username}"){
      repositories(last: 4) {
        nodes {
          name
          createdAt
          stargazerCount
          languages(last: 2) {
            edges {
              node {
                name
              }
            }
          }
          description
          labels(last: 2) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
      }
    }
    
    `,
    "prs": `
    query{
      user(login: "${username}"){
        pullRequests(last: 3){
          nodes{
            title
            body
            createdAt
          }
        }
      }
    }
    `,
    "contributions": `
    query { 
      user(login: "${username}") { 
        bio
        contributionsCollection(from : "${xDaysAgo}"){
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions	
                totalPullRequestReviewContributions      	
              
        }
      }
    }
    `
  }
  return queries[githubInput];
}

function handleGithubContributionsResponse(response) {
  let bio = response.data.data.user.bio;
  let contributions = response.data.data.user.contributionsCollection
  let output = `${bio} and has ${contributions.totalCommitContributions} commits, ${contributions.totalIssueContributions} issues ${contributions.totalPullRequestContributions} pull requests and ${contributions.totalPullRequestReviewContributions} PR reviews in 5 days`
  return output;
}

function handleGithubIssuesResponse(response) {
  let issues = response.data.data.user.issues.nodes;
  let output = "";
  issues.forEach(issue => {
    output += `Issue: ${issue.title} created at ${issue.createdAt} \n`
  });
  return output;
}

function handleGithubIssueCommentsResponse(response) {
  let issueComments = response.data.data.user.issueComments.nodes;
  let output = "";
  issueComments.forEach(issueComment => {
    output += `Issue Comment: ${issueComment.bodyText} created at ${issueComment.createdAt} \n`
  });
  return output;  
}

function handleGithubReposResponse(response) {
  let repos = response.data.data.user.repositories.nodes;
  let output = "";
  repos.forEach(repo => {
    output += `Repo: ${repo.name} created at ${repo.createdAt} \n`
  });
  return output;
}

function handleGithubPRsResponse(response) {
  let prs = response.data.data.user.pullRequests.nodes;
  let output = "";
  prs.forEach(pr => {
    output += `PR: ${pr.title} created at ${pr.createdAt} \n`
  });
  return output;
}

module.exports = async function fetchGithubActivities(username,githubInput, xDays) {
  const xDaysAgo = new Date(new Date() - xDays * 24 * 60 * 60 * 1000).toISOString();
  const token = process.env.API_GITHUB_TOKEN;

  const query = getQuery(username, githubInput, xDaysAgo)

  const response = await axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data: {
      query: query
    }
  });

  switch (githubInput) {
    case "issues":
      return handleGithubIssuesResponse(response);
    case "issueComments":
      return handleGithubIssueCommentsResponse(response);
    case "repos":
      return handleGithubReposResponse(response);
    case "prs":
      return handleGithubPRsResponse(response);
    case "contributions":
      return handleGithubContributionsResponse(response);
    default:
      return "No github input provided";
  }
}

// fetchGithubActivities("antoprince001","contributions", 2)