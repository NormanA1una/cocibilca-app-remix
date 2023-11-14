import { z } from "zod";

const configSchema = z.object({
  PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  PUBLIC_FIREBASE_APP_ID: z.string().min(1),
  PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().min(1),
});

export const env = configSchema.parse(process.env);
