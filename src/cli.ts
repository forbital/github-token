#!/usr/bin/env node

import minimist from "minimist";
import getGithubToken, { getEnv } from "./github-token";

const { shell, env, help } = minimist(process.argv.slice(2), {
  alias: { shell: "s", env: "e", help: "h" },
  default: { shell: false, env: false, help: false },
});

if (shell && env) {
  console.log("--shell and --env cannot be used together.\n");
  showHelp();
  process.exit(1);
}

if (help) {
  showHelp();
  process.exit(0);
}

function showHelp() {
  console.log(`github-token [options]

 --help,   -h   show help
 --shell,  -s   print shell code to setup env var
 --env,    -e   print env var`);
}

async function main() {
  const token = shell
    ? getEnv({ shell: true })
    : env
    ? getEnv()
    : getGithubToken();
  if (token) console.log(token);
}

main().catch((err) => console.error(err.message));
