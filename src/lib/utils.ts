import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";
import { env } from "@/env";
import { logger } from "@/lib/logger";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

interface CustomConnection extends mongoose.Connection {
	isConnected?: boolean;
}
const connection: CustomConnection = {} as CustomConnection;

export async function connectToDb() {
	try {
		if (connection.isConnected) {
			logger.debug("Using existing connection!");
			return;
		}

		const db: typeof mongoose = await mongoose.connect(env.MONGO);
		connection.isConnected = db.connections[0]?.readyState === 1;
		logger.debug("Database connected!");
	} catch (error) {
		logger.error(String(error));
		throw new Error("Error connecting to database!" + error);
	}
}
