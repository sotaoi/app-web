#!/bin/env node

const { execSync } = require('child_process');

const main = async () => {
  execSync('npm run start:streaming:prod', { stdio: 'inherit' });
  execSync('git checkout -- ./', { stdio: 'inherit' });
  execSync('git pull', { stdio: 'inherit' });
  execSync('npm run bootstrap:prod');
  execSync('npm install -D ./');
  execSync('npm run restart:streaming:prod', { stdio: 'inherit' });
};

main();
