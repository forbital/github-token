# @forbital/github-token

[![npm-version]][npm-url]
[![npm-downloads]][npm-url]

> Obtain GitHub Token from various location.

1. `~/.config/hub`
2. `~/.config/gh/config.yml`
3. `GH_TOKEN`
4. `GITHUB_TOKEN`

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
eval $(github-token --env)
echo $GITHUB_TOKEN
```

#### direnv

```bash
# .envrc
eval $(github-token --env)
```

### Node.js

```js
import getToken from '@forbital/github-token';

const user = await fetch('https://api.github.com/user', {
  headers: { Authorization: `Bearer ${getToken()}` },
}).then((res) => res.json());

console.log(user.twitter_username);
```
