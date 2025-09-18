import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StoryContext } from "../../contexts/storyContext";

export default function ProfileScreen() {
  const { currentUser, editUser, logoutUser } = useContext(StoryContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || "");
  const [newUsername, setNewUsername] = useState(currentUser?.username || "");
  const [newBio, setNewBio] = useState(currentUser?.bio || "");

  async function handleSave() {
    try {
      await editUser({ name: newName, username: newUsername, bio: newBio });
      setModalVisible(false);
    } catch (err) {
      console.error("❌ Error saving changes:", err);
    }
  }

  return (
    <LinearGradient
      colors={["#fffaf5", "#ffe9ec", "#fff4e6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.inner}>
        {/* Avatar */}
        <Image
          source={require("../../assets/logo/applogo.png")}
          style={styles.avatar}
        />

        {/* Name + Username */}
        <Text style={styles.name}>{currentUser?.name || "Guest User"}</Text>
        <Text style={styles.username}>
          @{currentUser?.username || "guest"}
        </Text>

        {/* Bio */}
        <Text style={styles.bio}>
          {currentUser?.bio || "🌸 Dreamer • 📖 Story lover • ☕ Cozy vibes only"}
        </Text>

        {/* Edit button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setNewName(currentUser?.name || "");
            setNewUsername(currentUser?.username || "");
            setNewBio(currentUser?.bio || "");
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Logout always at the bottom */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logoutUser}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new name"
              value={newName}
              onChangeText={setNewName}
            />

            {/* Username */}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={newUsername}
              onChangeText={setNewUsername}
            />

            {/* Bio */}
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              placeholder="Tell us about yourself..."
              value={newBio}
              onChangeText={setNewBio}
              multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#f8cba6",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6b4226",
  },
  username: {
    fontSize: 16,
    color: "#d48872",
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: "#7d5a50",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#f8cba6",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginBottom: 12,
  },
  buttonText: {
    color: "#6b4226",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutContainer: {
    padding: 24,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ffe9ec",
    borderWidth: 1,
    borderColor: "#f3d9ca",
  },
  logoutText: {
    color: "#d17a67",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "600",
    color: "#6b4226",
    marginBottom: 6,
    marginTop: 8,
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fffaf5",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b4226",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#f3d9ca",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#f8cba6",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 16,
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4226",
  },
  cancelButton: {
    backgroundColor: "#ffe9ec",
    borderWidth: 1,
    borderColor: "#f3d9ca",
  },
  cancelText: {
    color: "#d17a67",
    fontWeight: "600",
    fontSize: 16,
  },
});
