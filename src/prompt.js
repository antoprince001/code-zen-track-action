const fetchGithubActivities = require('./github-api')

module.exports = async function generatePrompt(
      username,
      persona,
      githubInput,
      action,
      tone,
      contributionPeriod,
      outputLength) {
        
       let githubUsage = await fetchGithubActivities(username,githubInput,contributionPeriod)
       let prompt =  `
        Assume you are ${persona}. I am a github user who has
        ${githubUsage}. 
        Your response should not be negative or discouraging. 
        ${action} relevant to my github contribution in less than ${outputLength} words 
        in a way that is ${tone}
       ` 
       return prompt;
}