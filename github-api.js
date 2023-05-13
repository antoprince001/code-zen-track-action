require('dotenv').config();
const axios = require('axios');
const token = process.env.GITHUB_API_TOKEN;

function getQuery(githubInput, xDaysAgo){
  let queries = {
    "issues" : `
    query { 
      user(login: "antoprince001") { 
        bio
        contributionsCollection(from : "${xDaysAgo}"){
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions	
                totalPullRequestReviewContributions      	
              
        }
      }
    }
    `,
    "repos" : `
    `,
    "commits" : `
    `,
    "prs" : `
    `,
    "contributions" : `
    `
  }
}
async function fetchGithubActivities(username) {
    const xDaysAgo = new Date(new Date() - 5 * 24 * 60 * 60 * 1000).toISOString();
    const query = `
    query { 
      user(login: ${username}) { 
        bio
        contributionsCollection(from : "2023-04-30T08:55:09.282Z"){
                totalCommitContributions
                totalIssueContributions
                totalPullRequestContributions	
                totalPullRequestReviewContributions      	
              
        }
      }
    }
    `;
        
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
    console.log(response.data)
    return response.data;
  }

  fetchGithubActivities(username)