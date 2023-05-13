async function generatePrompt(
      persona,
      githubInput,
      action,
      tone,
      outputLength) {
        
       let githubUsage = fetchGithubActivities(username)
       let prompt =  `
        Assume you are ${persona}. I am a github user who has
        ${githubUsage}. Your response should not be negative and discouraging. 
        ${action} relevant to my github contribution in less than ${outputLength} words 
        in a way that is ${tone}
       ` 
}