import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useStory } from "../hooks/useStory";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { createUser } = useStory()

  const addUser = async() => {
    await createUser({name, username, password})
    setName('')
    setUsername('')
    setPassword('')
  }

  return (
    <LinearGradient
      colors={["#fff4e6", "#ffe9ec", "#fffaf0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.inner}>
        {/* Logo */}
        <Image
          source={require("../assets/logo/applogo.png")} // change this path to your actual logo file
          style={styles.logo}
        />

        {/* App Title */}
        <Text style={styles.title}> Story Scape </Text>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Account</Text>

          {/* Full Name */}
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9a7b7b"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* Username */}
          <TextInput
            placeholder="Username"
            placeholderTextColor="#9a7b7b"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          {/* Password */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9a7b7b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={addUser}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => router.push("/")}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6b4226",
    marginBottom: 32,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: "100%",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#d48872",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fffaf5",
    borderWidth: 1,
    borderColor: "#f3d9ca",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: "#6b4226",
  },
  button: {
    backgroundColor: "#f8cba6",
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#6b4226",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    marginTop: 32,
  },
  footerText: {
    color: "#6b4226",
  },
  footerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#d48872",
  },
});
