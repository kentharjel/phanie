import { Ionicons } from "@expo/vector-icons"; // ✅ back icon
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StoreStoryContext } from "../contexts/storeStoryContext";

export default function ViewStory() {
  const { fetchStories, updateStory, deleteStory, currentUser } = useContext(StoreStoryContext);
  const { id } = useLocalSearchParams();
  const [story, setStory] = useState(null);
  const [content, setContent] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const load = async () => {
      const allStories = await fetchStories();
      const found = allStories.find((s) => s.id === id);
      if (found) {
        setStory(found);
        setContent(found.content || "");
        setIsOwner(currentUser && found.userId === currentUser.id);
      }
    };
    load();
  }, [id, currentUser]);

  const handleSave = async () => {
    if (!story || !isOwner) return;
    try {
      await updateStory(story.id, { content });
      alert("✅ Story saved!");
      router.replace("/tabs/stories"); // Redirect after saving
    } catch (err) {
      console.error("❌ Error saving story:", err);
    }
  };

  const handleDelete = () => {
  if (!story || !isOwner) return;

  Alert.alert(
    "Delete Story?",
    "Are you sure you want to delete this story? This action cannot be undone.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteStory(story.id);
            alert("🗑️ Story deleted!");
            router.replace("/tabs/stories"); // Redirect after deleting
          } catch (err) {
            console.error("❌ Error deleting story:", err);
          }
        },
      },
    ],
    { cancelable: true }
  );
};

  if (!story) {
    return (
      <LinearGradient
        colors={["#fffaf5", "#ffe9ec", "#fff4e6"]}
        style={styles.container}
      >
        <View style={styles.center}>
          <Text style={styles.loading}>Loading your story...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#fffaf5", "#ffe9ec", "#fff4e6"]}
      style={styles.container}
    >
      {/* ✅ Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/tabs/stories")}>
          <Ionicons name="arrow-back" size={28} color="#6b4226" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>{story.title}</Text>

        {/* ✅ Editable only if owner */}
        {isOwner ? (
          <TextInput
            style={styles.input}
            placeholder="Write your story here..."
            value={content}
            onChangeText={setContent}
            multiline
          />
        ) : (
          <View style={styles.readOnlyBox}>
            <Text style={styles.readOnlyText}>
              {content || "No story content yet."}
            </Text>
          </View>
        )}

        {/* ✅ Save button only for owner */}
        {isOwner && (
          <>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save Story</Text>
            </TouchableOpacity>

            {/* ✅ Delete button */}
            <TouchableOpacity style={[styles.saveBtn, styles.deleteBtn]} onPress={handleDelete}>
              <Text style={styles.deleteText}>Delete Story</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50, // push below status bar
    paddingHorizontal: 16,
  },
  inner: {
    padding: 28,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    color: "#6b4226",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6b4226",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f3d9ca",
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    color: "#6b4226",
    backgroundColor: "#fff",
    minHeight: 220,
    marginBottom: 20,
  },
  readOnlyBox: {
    borderWidth: 1,
    borderColor: "#f3d9ca",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#fff",
    minHeight: 220,
    marginBottom: 20,
  },
  readOnlyText: {
    fontSize: 16,
    color: "#6b4226",
  },
  saveBtn: {
    backgroundColor: "#f8cba6",
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 10,
  },
  saveText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#6b4226",
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: "#ff6b6b",
  },
  deleteText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});
