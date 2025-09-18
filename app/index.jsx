import { Ionicons } from "@expo/vector-icons"; // 👈 import icons
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StoryContext } from "../contexts/storyContext";

export default function SignInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const { fetchUser } = useContext(StoryContext);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert("Missing Fields", "Enter username and password.");
      return;
    }

    try {
      const user = await fetchUser(username, password);
      console.log("✅ Signed in as:", user.username);
      router.push("/tabs/home"); // redirect after login
    } catch (err) {
      Alert.alert("Sign In Failed", err.message);
    }
  };

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
          source={require("../assets/logo/applogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Story Scape</Text>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#9a7b7b"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />

          {/* Password field with eye toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9a7b7b"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#9a7b7b"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* 🔹 Forgot password link */}
          <TouchableOpacity
            style={styles.forgot}
            onPress={() => Alert.alert("Oops!", "Forgot password coming soon!")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 Footer link to Sign Up */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => router.push("/signup")}
            >
              Sign Up
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
    resizeMode: "contain",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fffaf5",
    borderWidth: 1,
    borderColor: "#f3d9ca",
    borderRadius: 12,
    marginBottom: 16,
    paddingRight: 10,
  },
  eyeButton: {
    paddingHorizontal: 6,
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
  forgot: {
    marginTop: 16,
  },
  forgotText: {
    color: "#d48872",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  footer: {
    marginTop: 32,
  },
  footerText: {
    color: "#6b4226",
    fontSize: 14,
  },
  footerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#d48872",
  },
});
