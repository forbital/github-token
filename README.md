# @forbital/github-token

[![npm-version]][npm-url]
[![npm-downloads]][npm-url]

> Obtain GitHub Token from various location.

1. `~/.config/hub`
2. `~/.config/gh/config.yml`
3. `GH_TOKEN`
4. `GITHUB_TOKEN`
5. System Keychain (macOS, Windows, Linux)

[npm-version]: https://badgen.net/npm/v/@forbital/github-token
[npm-downloads]: https://badgen.net/npm/dt/@forbital/github-token
[npm-url]: https://npmjs.org/package/@forbital/github-token

## Install

```bash
yarn add @forbital/github-token
# or npm i --save @forbital/github-token
```

## Use

### CLI

```bash
echo $(github-token)
```

or

```bash
eval $(github-token --shell)
echo $GITHUB_TOKEN
```

or

```bash
echo "$(github-token --env)" >> .env
```

#### direnv

```bash
# .envrc
eval $(github-token --shell)
```

#### Create new personal access token

```bash
github-token -p
```

### Node.js

```js
import getToken from '@forbital/github-token';

const user = await fetch('https://api.github.com/user', {
  headers: { Authorization: `Bearer ${await getToken()}` },
}).then((res) => res.json());

console.log(user.twitter_username);
```
