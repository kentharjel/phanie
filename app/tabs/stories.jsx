// app/tabs/story.js
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoreStoryContext } from "../../contexts/storeStoryContext";

export default function StoryScreen() {
  const { stories, fetchStories } = useContext(StoreStoryContext);
  const router = useRouter();

  useEffect(() => {
    fetchStories(); // load stories on mount
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "../viewStory",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.username}>
          👤 {item.username || "Unknown User"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <Text style={styles.header}>📚 Stories</Text>

      {stories.length === 0 ? (
        <Text style={styles.empty}>No stories yet. Create one!</Text>
      ) : (
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6b4226",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f3d9ca",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b4226",
    marginBottom: 6,
  },
  username: {
    fontSize: 14,
    color: "#8c6b52",
  },
  empty: {
    fontSize: 16,
    color: "#8c6b52",
    textAlign: "center",
    marginTop: 40,
  },
});
