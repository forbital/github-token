import {homedir} from 'os';
import {join} from 'path';
import * as yaml from 'js-yaml';
import fs from 'fs';

export function fromHubConfig(): string | undefined {
  const hubConfigPath = join(homedir(), '.config', 'hub');
  try {
    const configString = fs.readFileSync(hubConfigPath, 'utf8');
    const hubConfig = yaml.safeLoad(configString);
    const token = hubConfig['github.com']?.[0]?.['oauth_token'];
    return token;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return undefined;
    }
    throw err;
  }
}

export function fromGhConfig(): string | undefined {
  const hubConfigPath = join(homedir(), '.config', 'gh', 'config.yml');
  try {
    const configString = fs.readFileSync(hubConfigPath, 'utf8');
    const hubConfig = yaml.safeLoad(configString);
    const token = hubConfig['hosts']?.['github.com']?.['oauth_token'];
    return token;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return undefined;
    }
    throw err;
  }
}

export function fromEnv(): string | undefined {
  return process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
}

export default function getGithubToken() {
  return fromHubConfig() || fromGhConfig() || fromEnv();
}

export function envSetup(): string {
  const token = getGithubToken();
  return `export GITHUB_TOKEN=${token}
export GH_TOKEN=${token}`;
}
