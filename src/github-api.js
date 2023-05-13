require('dotenv').config();
const axios = require('axios');

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
module.exports = async function fetchGithubActivities(username) {
    const xDaysAgo = new Date(new Date() - 5 * 24 * 60 * 60 * 1000).toISOString();
    const token = process.env.API_GITHUB_TOKEN;

    const query = `
    query { 
      user(login: "antoprince001") { 
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
    let bio = response.data.data.user.bio;
    let contributions =  response.data.data.user.contributionsCollection
    let output =  `${bio} and has ${contributions.totalCommitContributions} commits, ${contributions.totalIssueContributions} issues ${contributions.totalPullRequestContributions} pull requests and ${contributions.totalPullRequestReviewContributions} PR reviews in 5 days`
    return  output;
  }

