import tl = require('azure-pipelines-task-lib');
import { IExecSyncResult } from 'azure-pipelines-task-lib/toolrunner';

async function run() {
  try {
    const storageName: string = tl.getInput('storageName', true);
    const storageKey: string = tl.getInput('storageKey', true);
    const storageContainer: string = tl.getInput('storageContainer', true);
    tl.cd(tl.getVariable('HOME'));
    tl.mkdirP('.m2')
    tl.cd('.m2')
    execSecure(tl.execSync('az', 'storage container create'
      + ' --account-name ' + storageName
      + ' --account-key ' + storageKey
      + ' --name ' + storageContainer),
      'Failed to create storage container.');
    execSecure(tl.execSync('az', 'storage blob download'
      + ' --account-name ' + storageName
      + ' --account-key ' + storageKey
      + ' --container-name ' + storageContainer
      + ' --name repository'
      + ' --file repository.zip'),
      'Failed to download zip repository from storage account.');
    execSecure(tl.execSync('unzip', 'repository.zip'),
      'Failed to unzip repository.');
    execSecure(tl.execSync('rm', '-rf repository.zip'),
      'Failed to remove zip repository.');
  } catch (err) {
    tl.setResult(tl.TaskResult.SucceededWithIssues, err.message, true);
  }
}

function execSecure(result: IExecSyncResult, error?: string): void {
  if (result.code == 0) {
    return;
  }
  tl.error('ERROR_CODE: ' + result.code);
  if (error) {
    tl.error('ERROR_DETAILS: ' + error);
  }
  throw result;
}

run();