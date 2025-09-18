import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      colors={["#fff4e6", "#ffe9ec", "#fffaf0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.inner}>
        {/* App Logo */}
        <Image
          source={require("../assets/logo/applogo.png")}
          style={styles.logo}
        />

        {/* App Title */}
        <Text style={styles.title}>Story Scape</Text>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>

          {/* Email */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9a7b7b"
            value={email}
            onChangeText={setEmail}
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
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
