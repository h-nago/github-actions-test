const github = require('@actions/github');
const core = require('@actions/core');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const token = core.getInput('repo-token', {required: true});
    const octokit = new github.GitHub(token);
    const pullRequests = await octokit.pulls.list({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo
    })
    console.log(pullRequests);


    const ms = core.getInput('milliseconds');
    console.log(`Waiting ${ms} milliseconds ...`)

    core.debug((new Date()).toTimeString())
    wait(parseInt(ms));
    core.debug((new Date()).toTimeString())

    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    console.log(error);
    // core.setFailed(error.message);
  }
}

run()
