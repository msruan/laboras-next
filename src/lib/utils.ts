import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";
import cors from "./cors";
import { NextRequest, NextResponse } from "next/server";

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
      console.log("Using existing connection!");
      return;
    }
    const db: typeof mongoose = await mongoose.connect(process.env.MONGO!);
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Database connected!");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting to database!" + error);
  }
}

export const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export const DefaultResponse = (
  request: Request,
  responseBody: any,
  status: number = 200
) => {
  return cors(
    request,
    new Response(JSON.stringify(responseBody), {
      status: status,
      headers: corsHeaders,
    })
  );
};

export const DefaultError = (request: Request) => {
  return cors(request, NextResponse.error());
};
