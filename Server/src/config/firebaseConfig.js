import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCiqsBEvkk0AdmpXsx44F9mD8jmJnApVzA",
  authDomain: "chatbot-6b78c.firebaseapp.com",
  projectId: "chatbot-6b78c",
  storageBucket: "chatbot-6b78c.firebasestorage.app",
  messagingSenderId: "1034178019553",
  appId: "1:1034178019553:web:9f2e7d09017a1e6d48f7a0",
  measurementId: "G-4Q0R122DHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
export { auth, app };