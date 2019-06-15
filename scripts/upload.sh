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

zip -r repository.zip ~/.m2/repository

az storage container create \
--account-name ${storage_account} \
--account-key ${storage_key} \
--name ${repository}

az storage blob upload \
--account-name ${storage_account} \
--account-key ${storage_key} \
--container-name ${repository} \
--name repository \
--file repository.zip

rm -rf repository.zip