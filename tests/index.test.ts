import mock from 'mock-fs';

import getGithubToken from '../src/github-token';
import { homedir } from 'os';
import { join } from 'path';

afterEach(async () => {
  mock.restore();
});

it('fromHub', async () => {
  mock({
    [join(homedir(), '.config')]: {
      hub: `github.com:
- user: uetchy
  oauth_token: 3ZJBAhMVjdFQvQNkb
  protocol: https`,
    },
  });

  const token = await getGithubToken();
  expect(token).toBe('3ZJBAhMVjdFQvQNkb');
});

it('fromGh', async () => {
  mock({
    [join(homedir(), '.config')]: {
      gh: {
        'config.yml': `{
  "hosts": {
    "github.com": {
      "oauth_token": "ZfJTkxcfA5DZUbPBb",
      "user": "uetchy"
    }
  }
}`,
      },
    },
  });

  const token = await getGithubToken();
  expect(token).toBe('ZfJTkxcfA5DZUbPBb');
});

it('fromEnv', async () => {
  mock({
    [join(homedir(), '.config')]: {},
  });

  process.env.GITHUB_TOKEN = 'wY9KqC52TxF3N2SJZ';

  const token = await getGithubToken();
  expect(token).toBe('wY9KqC52TxF3N2SJZ');
});
