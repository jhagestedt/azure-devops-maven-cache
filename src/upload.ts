import tl = require('azure-pipelines-task-lib');

async function run() {
  try {
    const storage_account: string = tl.getInput('storage_account', true);
    if (storage_account == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input for Azure storage account.');
      return;
    }
    const storage_key: string = tl.getInput('storage_key', true);
    if (storage_key == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input for Azure storage key.');
      return;
    }
    const storage_container: string = tl.getInput('storage_container', true);
    if (storage_container == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input for Azure storage container.');
      return;
    }
    tl.execSync("zip", "-r repository.zip ~/.m2/repository");
    tl.execSync("az", "storage container create"
      + " --account-name " + storage_account
      + " --account-key " + storage_key
      + " --name " + storage_container);
    tl.execSync("az", "storage blob upload"
      + " --account-name " + storage_account
      + " --account-key " + storage_key
      + " --container-name " + storage_container
      + " --name repository"
      + " --file repository.zip");
    tl.execSync("rm", "-rf repository.zip");
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();