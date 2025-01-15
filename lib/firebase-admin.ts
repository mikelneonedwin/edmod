import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { randomUUID } from "node:crypto";

export const app = initializeApp(
  {
    credential: cert({
      clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
  },
  `server-${randomUUID()}`
);
export const auth = getAuth(app);
