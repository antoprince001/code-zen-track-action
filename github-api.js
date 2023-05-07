const axios = require('axios');

async function fetchRecentActivities(username, token) {
    const fiveDaysAgo = new Date(new Date() - 5 * 24 * 60 * 60 * 1000).toISOString();
    console.log(username+token)
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
        issues(last: 3){
          nodes {
                  title
                  comments(last: 5) {
                    edges {
                      node {
                        bodyText
                      }
                    }
                  }
                }
        }
        repositories(last: 3){
          nodes {
                  name
                        languages(last: 3) {
                          edges {
                            node {
                              name
                            }
                          }
                        }
                        description
                      labels(last: 3) {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                        repositoryTopics(last: 3) {
                          edges {
                            node {
                              topic {
                                id
                              }
                            }
                          }
                        }
                        stargazerCount
                        
                }
        }
        pullRequests(last: 3){
          nodes{
            title
          }
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
  // const token = '';
  // const username = 'antoprince001'
  fetchRecentActivities(username, token)