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
# or npm i @forbital/github-token
```

## Use

### CLI

```bash
eval $(github-token)
echo $GITHUB_TOKEN
```

#### direnv

```bash
# .direnv
eval $(github-token)
```

### Node.js

```js
import getToken from '@forbital/github-token';

const githubToken = getToken();
```
