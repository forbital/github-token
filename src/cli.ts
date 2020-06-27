#!/usr/bin/env node

import minimist from 'minimist';
import getGithubToken, { setupEnv } from './github-token';

const { env, help } = minimist(process.argv.slice(2), {
  alias: { env: 'e', help: 'h' },
  default: { env: false, help: false },
});

if (help) {
  console.log(`github-token [options]

 --help, -h   show help
 --env,  -e   print shell code to setup env var`);
  process.exit(0);
}

console.log(env ? setupEnv() : getGithubToken());
