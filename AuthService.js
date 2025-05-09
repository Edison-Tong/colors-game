// authService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // this now works correctly

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("test1");
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore write timed out")), 5000));

    try {
      await Promise.race([
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
        }),
        timeout,
      ]);
      console.log("Firestore write successful");
    } catch (firestoreError) {
      console.error("Firestore write failed:", firestoreError.message);
    }

    console.log("Returning user");
    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error; // Rethrow the error to be handled in the calling function
  }
};
