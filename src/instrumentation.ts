import { setupLogger } from "./lib/logger";

export async function register() {
	await setupLogger();
}
