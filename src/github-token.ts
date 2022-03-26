import { homedir, hostname } from "os";
import { join } from "path";
import * as yaml from "js-yaml";
import fs from "fs";

export interface GetGithubTokenOption {}

export function fromHubConfig(): string | undefined {
  const hubConfigPath = join(homedir(), ".config", "hub");
  try {
    const configString = fs.readFileSync(hubConfigPath, "utf8");
    const hubConfig = yaml.load(configString) as any;
    const token = hubConfig?.["github.com"]?.[0]?.["oauth_token"];
    return token;
  } catch (err) {
    if ((err as any)?.code === "ENOENT") {
      return undefined;
    }
    throw err;
  }
}

export function fromGhConfig(): string | undefined {
  const hubConfigPath = join(homedir(), ".config", "gh", "config.yml");
  try {
    const configString = fs.readFileSync(hubConfigPath, "utf8");
    const hubConfig = yaml.load(configString) as any;
    const token = hubConfig?.["hosts"]?.["github.com"]?.["oauth_token"];
    return token;
  } catch (err) {
    if ((err as any)?.code === "ENOENT") {
      return undefined;
    }
    throw err;
  }
}

export function fromEnv(): string | undefined {
  return process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
}

export function getEnv({ shell = false }: { shell?: boolean } = {}):
  | string
  | undefined {
  const token = getGithubToken();
  if (!token) return undefined;
  return ["GITHUB_TOKEN", "GH_TOKEN"]
    .map((key) => key + "=" + token)
    .map((line) => (shell ? "export " : "") + line)
    .join("\n");
}

export default function getGithubToken({}: GetGithubTokenOption = {}):
  | string
  | undefined {
  return fromHubConfig() ?? fromGhConfig() ?? fromEnv();
}
