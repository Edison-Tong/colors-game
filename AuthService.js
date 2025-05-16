import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const signUp = async (username, email, password) => {
  try {
    // 1. Check if username is taken
    const usernameRef = doc(db, "usernames", username);
    const existingUsername = await getDoc(usernameRef);
    if (existingUsername.exists()) {
      throw new Error("Username already taken");
    }

    // 2. Create the user with email/password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 3. Create a timeout (optional, as you had)
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Firestore write timed out")), 1000)
    );

    // 4. Write user data to "users" and "usernames" collections
    await Promise.race([
      Promise.all([
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username,
          createdAt: new Date(),
        }),
        setDoc(doc(db, "usernames", username), {
          uid: user.uid,
          email: user.email,
        }),
      ]),
      timeout,
    ]);

    console.log("User and username stored successfully");
    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};
