import tl = require('azure-pipelines-task-lib');

async function run() {
  try {
    const storageAccount: string = tl.getInput('storageAccount', true);
    if (storageAccount == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input for storageAccount.');
      return;
    }
    const storageKey: string = tl.getInput('storageKey', true);
    if (storageKey == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input for storageKey.');
      return;
    }
    const storageContainer: string = tl.getInput('storageContainer', true);
    if (storageContainer == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input for storageContainer.');
      return;
    }
    tl.cd(tl.getVariable('HOME'));
    tl.mkdirP('.m2')
    tl.cd('.m2')
    tl.execSync('az', 'storage container create'
      + ' --account-name ' + storageAccount
      + ' --account-key ' + storageKey
      + ' --name ' + storageContainer);
    tl.execSync('az', 'storage blob download'
      + ' --account-name ' + storageAccount
      + ' --account-key ' + storageKey
      + ' --container-name ' + storageContainer
      + ' --name repository'
      + ' --file repository.zip');
    tl.execSync('unzip', 'repository.zip');
    tl.execSync('rm', '-rf repository.zip');
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();