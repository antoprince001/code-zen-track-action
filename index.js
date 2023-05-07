const core = require('@actions/core');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

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