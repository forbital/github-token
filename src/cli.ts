#!/usr/bin/env node

import minimist from 'minimist';
import getGithubToken, { setupEnv } from './github-token';

const { token, help } = minimist(process.argv.slice(2), {
  alias: { token: 't', help: 'h' },
  default: { token: false, help: false },
});

if (help) {
  console.log(`github-token [options]

 --help,  -h   show help
 --token, -t   only print token`);
  process.exit(0);
}

console.log(token ? getGithubToken() : setupEnv());
