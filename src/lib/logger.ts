import { configure, getConsoleSink, getLogger } from "@logtape/logtape";
import { prettyFormatter } from "@logtape/pretty";

export async function setupLogger() {
	await configure({
		sinks: {
			console: getConsoleSink({
				formatter:
					process.env.NODE_ENV === "development" ? prettyFormatter : undefined,
			}),
		},
		loggers: [
			{
				category: "my-app",
				lowestLevel: process.env.NODE_ENV === "production" ? "debug" : "trace",
				sinks: ["console"],
			},
			{ category: ["logtape", "meta"], lowestLevel: "warning" },
		],
	});
}

export const logger = getLogger(["my-app"]);
