import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    // Check if the environment variable exists
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_KEY is not set in environment variables"
      );
    }

    // Parse the JSON
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization failed:", error.message);
    throw error;
  }
}

export default admin;
export const db = admin.firestore();
