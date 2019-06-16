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
            if (storageAccount == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input for storageAccount.');
                return;
            }
            const storageKey = tl.getInput('storageKey', true);
            if (storageKey == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input for storageKey.');
                return;
            }
            const storageContainer = tl.getInput('storageContainer', true);
            if (storageContainer == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input for storageContainer.');
                return;
            }
            tl.cd(tl.getVariable('HOME'));
            tl.mkdirP('.m2');
            tl.cd('.m2');
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
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
