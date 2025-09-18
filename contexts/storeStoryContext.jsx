import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";
import { StoryContext } from "./storyContext";

export const StoreStoryContext = createContext();

export default function StoreStoryProvider({ children }) {
  const { currentUser } = useContext(StoryContext);
  const [stories, setStories] = useState([]);

  // Create a story
  // contexts/storeStoryContext.js
async function createStory(storyData) {
  if (!currentUser) throw new Error("No logged-in user");

  const docRef = await addDoc(collection(db, "Story"), {
    ...storyData,
    userId: currentUser.id,
    username: currentUser.username, // ✅ store username
    name: currentUser.name,         // ✅ optional: full name
  });

  console.log("✅ Story created with ID:", docRef.id);
  return docRef.id;
}

  // Fetch all stories for current user
  async function fetchStories() {
  try {
    const snap = await getDocs(collection(db, "Story")); // fetch all stories
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setStories(list);
    return list;
  } catch (err) {
    console.error("❌ Error fetching stories:", err);
    return [];
  }
}

  // Update a story
  async function updateStory(storyId, updates) {
    const storyRef = doc(db, "Story", storyId);
    await updateDoc(storyRef, updates);

    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, ...updates } : s))
    );
    console.log("✅ Story updated:", storyId);
  }

  async function deleteStory(id) {
  if (!id) return;

  try {
    const docRef = doc(db, "Story", id);
    await deleteDoc(docRef);
    console.log("✅ Story deleted:", id);
    
    // Optionally, update local state after deletion
    setStories((prev) => prev.filter((story) => story.id !== id));
  } catch (err) {
    console.error("❌ Error deleting story:", err);
  }
}

  return (
    <StoreStoryContext.Provider
      value={{ stories, currentUser, createStory, fetchStories, updateStory, deleteStory }}
    >
      {children}
    </StoreStoryContext.Provider>
  );
}
