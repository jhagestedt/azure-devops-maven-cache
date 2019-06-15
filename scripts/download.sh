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

az storage container create \
--account-name ${storage_account} \
--account-key ${storage_key} \
--name ${storage_container}

az storage blob download \
--account-name ${storage_account} \
--account-key ${storage_key} \
--container-name ${storage_container} \
--name repository \
--file repository.zip

mkdir -p ~/.m2
unzip repository.zip -d ~/.m2
rm -rf repository.zip