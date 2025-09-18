import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StoreStoryContext } from "../../contexts/storeStoryContext";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const { createStory } = useContext(StoreStoryContext);

  const handleSave = async () => {
    try {
      if (!title.trim()) return;

      const newId = await createStory({ title });

      setModalVisible(false);
      setTitle("");

      router.push({ pathname: "../viewStory", params: { id: newId } });
    } catch (err) {
      console.error("❌ Error saving story:", err);
    }
  };

  return (
    <LinearGradient
      colors={["#fffaf5", "#ffe9ec", "#fff4e6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.inner}>
        <Text style={styles.title}>✨ Welcome to Story Scape ✨</Text>
        <Text style={styles.subtitle}>
          Your cozy, dreamy corner for stories 💕
        </Text>

        {/* Example card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌸 Daily Story</Text>
          <Text style={styles.cardText}>
            “Embrace the little things in life, they bring the most joy.”
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a Story Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title..."
              value={title}
              onChangeText={setTitle}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleSave}
              >
                <Text style={styles.saveText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6b4226",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#a1887f",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#ffffffee",
    width: "100%",
    padding: 22,
    borderRadius: 28,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  featuredCard: { backgroundColor: "#fff5f7" },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#d17a67",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#6b4226",
    marginBottom: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#f8cba6",
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#6b4226",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#ffe9ec",
    borderWidth: 1,
    borderColor: "#f3d9ca",
  },
  secondaryButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#d17a67",
    fontSize: 16,
  },

  // Floating Action Button (FAB)
  fab: {
    position: "absolute",
    bottom: 28,
    right: 28,
    backgroundColor: "#f8cba6",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  fabText: {
    fontSize: 32,
    color: "#6b4226",
    fontWeight: "bold",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "85%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#6b4226",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f3d9ca",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#6b4226",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginLeft: 10,
  },
  cancelBtn: { backgroundColor: "#ffe9ec" },
  saveBtn: { backgroundColor: "#f8cba6" },
  cancelText: { color: "#d17a67", fontWeight: "600", fontSize: 16 },
  saveText: { color: "#6b4226", fontWeight: "bold", fontSize: 16 },
});
