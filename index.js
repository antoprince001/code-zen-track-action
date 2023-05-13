const core = require('@actions/core');
const generatePrompt = require('./prompt')
const gpt = require('./gpt-api')

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.info(`Setting up ...`);
    const persona = core.getInput('persona');
    const githubInput = core.getInput('github-input');
    const action = core.getInput('action');
    const tone = core.getInput('tone');
    const outputLength = core.getInput('output-length');
    const contributionPeriod = core.getInput('contribution-period');

    let prompt = await generatePrompt(
      persona,
      githubInput,
      action,
      tone,
      outputLength
    );

    core.info(`Engineering the right prompt ...`);
    
    let gptResponse = await fetchGPTResponse(promptText)(
      persona,
      githubInput,
      action,
      tone,
      outputLength
    );

    core.info(`Response ...`);

    core.setOutput('response', gptResponse);
  } catch (error) {
    core.setFailed(error.message);
  }
}


/*
Inputs:
  Github API
    - issues
    - repositories
    - commits
    - contributions
    - pull requests
  
  Prompt Input
    - Persona (x from y)
    - Input from Github API
    - Action (Judge, Joke, Quote, one liner, advice, reminder)
    - Rules (Sarcastic, Jovial, Friendly)
    - Output (words,format, )

  Github Action
    - contributionFromNdays
    - 


Output:
Prompt
*/