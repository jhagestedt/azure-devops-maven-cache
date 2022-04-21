#!/bin/bash

if [[ -z "$storage_account" ]]
then
  echo "Variable 'storage_account' was not set."
  exit 1
fi
if [[ -z "$storage_key" ]]
then
  echo "Variable 'storage_key' was not set."
  exit 2
fi
if [[ -z "$storage_container" ]]
then
  echo "Variable 'storage_container' was not set."
  exit 3
fi

cd ${HOME}
mkdir -p .m2 && cd .m2

zip -r repository.zip repository

az storage container create \
--account-name ${storage_account} \
--account-key ${storage_key} \
--name ${storage_container}

az storage blob upload \
--account-name ${storage_account} \
--account-key ${storage_key} \
--container-name ${storage_container} \
--name repository \
--file repository.zip
--overwrite

rm -rf repository.zip
