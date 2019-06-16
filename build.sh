#!/bin/bash

cd task
npm install --save
tsc
cd -
tfx extension create --manifest-globs manifest.json
