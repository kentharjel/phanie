import { router } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../firebaseConfig";

export const StoryContext = createContext();

export default function StoryProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: "Guest User",
    username: "guest",
    bio: "🌸 Dreamer • 📖 Story lover • ☕ Cozy vibes only",
  });

  // ✅ Create new user
  async function createUser(userData) {
    try {
      const docRef = await addDoc(collection(db, "User"), userData);
      console.log("✅ User created with ID:", docRef.id);
    } catch (err) {
      console.error("❌ Error creating user:", err);
      throw err;
    }
  }

  // ✅ Fetch user by username + password
  async function fetchUser(username, password) {
    try {
      const q = query(
        collection(db, "User"),
        where("username", "==", username),
        where("password", "==", password)
      );

      const snap = await getDocs(q);
      if (!snap.empty) {
        const userDoc = snap.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() };
        setCurrentUser(userData);
        return userData;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      throw err;
    }
  }

  // ✅ Edit current user (updates Firestore + local state)
  async function editUser(updates) {
    try {
      if (!currentUser?.id) throw new Error("No logged-in user");

      const userRef = doc(db, "User", currentUser.id);
      await updateDoc(userRef, updates);

      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      console.log("✅ User updated:", updatedUser);
      return updatedUser;
    } catch (err) {
      console.error("❌ Error updating user:", err);
      throw err;
    }
  }

  // ✅ Logout
  function logoutUser() {
    setCurrentUser(null);
    console.log("🚪 User logged out");
    router.push("/");
  }

  return (
    <StoryContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        createUser,
        fetchUser,
        editUser,
        logoutUser,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}
