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

## Installation

```bash
yarn add @forbital/github-token
# or npm i @forbital/github-token
```

## Usage

```bash
import getToken from '@forbital/github-token';

const githubToken = getToken();
```
