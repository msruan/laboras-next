import { createEnv } from "@t3-oss/env-nextjs";
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
  client: {},
  experimental__runtimeEnv: {},
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
