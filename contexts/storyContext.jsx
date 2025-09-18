// contexts/storyContext.js
import { createContext, useState } from "react";

export const StoryContext = createContext(); // ✅ export it

export default function StoryProvider({ children }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createUser(userData) {
    console.log(userData);
  }

  return (
    <StoryContext.Provider value={{ name, username, password, createUser }}>
      {children}
    </StoryContext.Provider>
  );
}
