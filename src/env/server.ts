import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Database config
    MONGO: z.string().min(1),

    // App config
    SERVER_URL: z.url(),
    APP_PRIVACY_MODE: z.enum(["public", "private"]),
    APP_PRIVATE_GITHUB_USERS: z
      .string().optional()
      .transform((str) => str ? purgeChar(" ", str).split(",") : str),
    // Auth.js config
    AUTH_SECRET: z.string().min(32),
    GITHUB_SECRET: z.string().min(1),
    GITHUB_ID: z.string().min(1),
  },
  runtimeEnv: process.env,
  /**
 * By default, this library will feed the environment variables directly to
 * the Zod validator.
 *
 * This means that if you have an empty string for a value that is supposed
 * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
 * it as a type mismatch violation. Additionally, if you have an empty string
 * for a value that is supposed to be a string with a default value (e.g.
 * `DOMAIN=` in an ".env" file), the default value will never be applied.
 *
 * In order to solve these issues, we recommend that all new projects
 * explicitly specify this option as true.
 */
  emptyStringAsUndefined: true
});

function purgeChar(charToRemove: string, str: string | undefined) {
  if (str === undefined) return "";
  let filteredStr = "";
  for (let char of str) {
    if (char !== charToRemove) {
      filteredStr += char;
    }
  }
  return filteredStr;
}
