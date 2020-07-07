import { homedir, hostname } from 'os';
import { join } from 'path';
import * as yaml from 'js-yaml';
import promptSync from 'prompt-sync';
import keytar from 'keytar';
import fs from 'fs';

export interface GetGithubTokenOption {
  prompt?: boolean;
}

const KEYCHAIN_SERVICE = '@forbital/github-token';
const KEYCHAIN_ACCOUNT = 'token';

export function fromHubConfig(): string | undefined {
  const hubConfigPath = join(homedir(), '.config', 'hub');
  try {
    const configString = fs.readFileSync(hubConfigPath, 'utf8');
    const hubConfig = yaml.safeLoad(configString) as any;
    const token = hubConfig?.['github.com']?.[0]?.['oauth_token'];
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
    const hubConfig = yaml.safeLoad(configString) as any;
    const token = hubConfig?.['hosts']?.['github.com']?.['oauth_token'];
    return token;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return undefined;
    }
    throw err;
  }
}

export function fromEnv(): string | undefined {
  return process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
}

export async function fromKeychain(): Promise<string | null> {
  return await keytar.getPassword(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT);
}

export function fromUserInput(): string {
  const prompt = promptSync();
  const description = `${KEYCHAIN_SERVICE} (${hostname()})`;
  const newTokenURL = `https://github.com/settings/tokens/new?description=${encodeURIComponent(
    description,
  )}`;
  // console.log(
  //   'document: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token',
  // );
  console.log('Generate new personal access token and paste it here:');
  console.log(newTokenURL);
  const input = prompt('token: ');

  keytar.setPassword(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT, input);
  console.log('Your token will be saved to the system keychain.');
  console.log(
    'You can find it searching "@forbital/github-token" in the keychain app',
  );

  return input;
}

export default async function getGithubToken({
  prompt = false,
}: GetGithubTokenOption = {}): Promise<string | undefined> {
  if (prompt) {
    return fromUserInput();
  }

  return (
    fromHubConfig() ?? fromGhConfig() ?? (await fromKeychain()) ?? fromEnv()
  );
}

export async function getEnv({
  shell = false,
}: { shell?: boolean } = {}): Promise<string | undefined> {
  const token = await getGithubToken();
  if (!token) return undefined;
  return ['GITHUB_TOKEN', 'GH_TOKEN']
    .map((key) => key + '=' + token)
    .map((line) => (shell ? 'export ' + line : line))
    .join('\n');
}
