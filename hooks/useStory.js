// hooks/useStory.js
import { useContext } from "react";
import { StoryContext } from "../contexts/storyContext"; // ✅ works now

export function useStory() {
  const context = useContext(StoryContext);

  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}
