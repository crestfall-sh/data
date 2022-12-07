#!/bin/bash

# usage:
# bash ./env.sh

echo "--> Removing .env file."
rm -f ./.env

echo "--> Creating .env file."
secret=$(openssl rand -base64 32)
echo "POSTGRES_USER=postgres" >> .env
echo "POSTGRES_PASSWORD=postgres" >> .env
echo "PGRST_DB_SCHEMAS=public" >> .env
echo "PGRST_DB_EXTRA_SEARCH_PATH=public" >> .env
echo "PGRST_JWT_SECRET=$secret" >> .env
echo "PGRST_JWT_SECRET_IS_BASE64=true" >> .env
echo "TYPESENSE_API_KEY=$secret" >> .env

echo "--> Reading .env file."
cat ./.env