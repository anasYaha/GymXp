import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenShell } from "../../components/common/screen-shell";
import { themeTokens } from "../../theme/tokens";

interface RegisterScreenProps {
  onRegister: (input: { fullName: string; email: string; password: string }) => Promise<void>;
  onShowLogin: () => void;
  loading: boolean;
  error: string | null;
}

export const RegisterScreen = ({
  onRegister,
  onShowLogin,
  loading,
  error
}: RegisterScreenProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenShell
      title="Create Your Member Account"
      subtitle="For this MVP demo, all signups belong to the Gym City brand and choose their branch after registration."
    >
      <View style={styles.form}>
        <TextInput onChangeText={setFullName} placeholder="Full name" style={styles.input} value={fullName} />
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
          onPress={() => onRegister({ fullName, email, password })}
          style={styles.primaryButton}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.primaryText}>Register</Text>
          )}
        </Pressable>
        <Pressable onPress={onShowLogin} style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Back to login</Text>
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
