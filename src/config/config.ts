import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const SERVER_HOSTNAME = process.env.SERVE_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 12345;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
export const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION || "";
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || "";
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "";
