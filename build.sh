#!/bin/bash

cd src
npm install --save
tsc
cd -
tfx extension create --manifest-globs manifest.json
