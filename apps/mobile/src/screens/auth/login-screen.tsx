import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenShell } from "../../components/common/screen-shell";
import { themeTokens } from "../../theme/tokens";

interface LoginScreenProps {
  onLogin: (input: { email: string; password: string }) => Promise<void>;
  onShowRegister: () => void;
  loading: boolean;
  error: string | null;
}

export const LoginScreen = ({ onLogin, onShowRegister, loading, error }: LoginScreenProps) => {
  const [email, setEmail] = useState("ali@example.com");
  const [password, setPassword] = useState("demo12345");

  return (
    <ScreenShell
      title="GymXP Member Login"
      subtitle="Sign in to your gym brand account and continue inside your active branch."
    >
      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          disabled={loading}
          onPress={() => onLogin({ email, password })}
          style={styles.primaryButton}
        >
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryText}>Login</Text>}
        </Pressable>
        <Pressable onPress={onShowRegister} style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Create an account</Text>
        </Pressable>
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 12
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d8e4df",
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  error: {
    color: "#a33434"
  },
  primaryButton: {
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 14,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 12
  },
  secondaryText: {
    color: themeTokens.brandPrimary,
    fontSize: 15,
    fontWeight: "600"
  }
});
