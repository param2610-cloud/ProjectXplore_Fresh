import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_PX_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_PX_DOMAIN_KEY,
  projectId: process.env.NEXT_PUBLIC_PX_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PX_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PX_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_PX_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_PX_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);



