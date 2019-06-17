"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storageAccount = tl.getInput('storageAccount', true);
            const storageKey = tl.getInput('storageKey', true);
            const storageContainer = tl.getInput('storageContainer', true);
            tl.cd(tl.getVariable('HOME'));
            tl.mkdirP('.m2');
            tl.cd('.m2');
            execSecure(tl.execSync('az', 'storage container create'
                + ' --account-name ' + storageAccount
                + ' --account-key ' + storageKey
                + ' --name ' + storageContainer), 'Failed to create storage container.');
            execSecure(tl.execSync('az', 'storage blob download'
                + ' --account-name ' + storageAccount
                + ' --account-key ' + storageKey
                + ' --container-name ' + storageContainer
                + ' --name repository'
                + ' --file repository.zip'), 'Failed to download zip repository from storage account.');
            execSecure(tl.execSync('unzip', 'repository.zip'), 'Failed to unzip repository.');
            execSecure(tl.execSync('rm', '-rf repository.zip'), 'Failed to remove zip repository.');
        }
        catch (err) {
            tl.setResult(tl.TaskResult.SucceededWithIssues, err.message, true);
        }
    });
}
function execSecure(result, error) {
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
