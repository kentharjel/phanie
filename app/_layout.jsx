import { Stack } from "expo-router";
import StoreStoryProvider from "../contexts/storeStoryContext";
import StoryProvider from "../contexts/storyContext";

export default function RootLayout(){
  return(
    <StoryProvider>
      <StoreStoryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen name="viewStory" options={{ headerShown: false }} />
        </Stack>
      </StoreStoryProvider>
    </StoryProvider>
  )
}