const core = require('@actions/core');
const wait = require('./wait');
const generatePrompt = require('prompt')
const fetchGPTResponse = require('gpt-api')

// most @actions toolkit packages have async methods
async function run() {
  try {

    const persona = core.getInput('persona');
    const githubInput = core.getInput('github-input');
    const action = core.getInput('action');
    const tone = core.getInput('tone');
    const outputLength = core.getInput('output-length');
    const contributionPeriod = core.getInput('contribution-period');

    let prompt = generatePrompt(
      persona,
      githubInput,
      action,
      tone,
      outputLength
    );

    core.info(`Engineering the right prompt ...`);
    
    let gptResponse = fetchGPTResponse(promptText)(
      persona,
      githubInput,
      action,
      tone,
      outputLength
    );

    core.info(`Engineering the right prompt ...`);
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

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