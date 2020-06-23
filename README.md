# gh-token

[![npm-version]][npm-url]
[![npm-downloads]][npm-url]

> Obtain GitHub Token from various location.

1. `~/.config/hub`
2. `~/.config/gh/config.yml`
3. `GH_TOKEN`
4. `GITHUB_TOKEN`

[npm-version]: https://badgen.net/npm/v/gh-token
[npm-downloads]: https://badgen.net/npm/dt/gh-token
[npm-url]: https://npmjs.org/package/gh-token

## Installation

```bash
yarn add gh-token
# or npm i gh-token
```

## Usage

```bash
import getToken from 'gh-token';

const githubToken = getToken();
```
