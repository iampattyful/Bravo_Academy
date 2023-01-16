#!/bin/bash
set -e
set -x

npm install -D ts-node typescript @types/node
npm install pg dotenv
npm install -D @types/pg
npm install populate-env
npm install express
npm install -D @types/express
npm install ts-node-dev
npm install express-session
npm install -D @types/express-session
npm install formidable @types/formidable
npm install jsonfile @types/jsonfile
npm start

# touch .gitignore
# echo 'node_modules' > .gitignore