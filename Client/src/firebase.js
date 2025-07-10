import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWw5uXuQi9ckdfC-SD5PO6i9ctESq8HmI",
  authDomain: "complaint-management-e4286.firebaseapp.com",
  projectId: "complaint-management-e4286",
  storageBucket: "complaint-management-e4286.firebasestorage.app",
  messagingSenderId: "103912991692",
  appId: "1:103912991692:web:b8c0c54478c3419f96cb69",
  measurementId: "G-DENZDMYQ5N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const collegeEmailRegex = /^[a-zA-Z0-9]+[0-9]{2}(it|cse|ec)@psnacet\.edu\.in$/;
export { auth, provider };