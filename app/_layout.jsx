import { Stack } from "expo-router";
import StoryProvider from "../contexts/storyContext";

export default function RootLayout(){
  return(
    <StoryProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </StoryProvider>
  )
}