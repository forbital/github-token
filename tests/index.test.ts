import mock from 'mock-fs';

import getGithubToken from '../src/github-token';
import { homedir } from 'os';
import { join } from 'path';

beforeEach(async () => {
  mock({
    [join(homedir(), '.config')]: {
      hub: `github.com:
- user: uetchy
  oauth_token: 3ZJBAhMVjdFQvQNkb
  protocol: https`,
      gh: {
        'config.yml': `{
  "hosts": {
    "github.com": {
      "oauth_token": "3ZJBAhMVjdFQvQNkb",
      "user": "uetchy"
    }
  }
}`,
      },
    },
  });
});

afterEach(async () => {
  mock.restore();
});

it('getGithubToken', async () => {
  const token = await getGithubToken();
  expect(token).toBe('3ZJBAhMVjdFQvQNkb');
});
