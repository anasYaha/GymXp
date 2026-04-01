import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { PrimaryButton } from "../../components/common/primary-button";
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
      title="Create your account"
      subtitle="Join the GymXP member app, then choose your branch to unlock branch-specific sessions, XP, and streak tracking."
    >
      <View style={styles.formCard}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Full name</Text>
          <TextInput
            onChangeText={setFullName}
            placeholder="Full name"
            placeholderTextColor={themeTokens.textSoft}
            style={styles.input}
            value={fullName}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={themeTokens.textSoft}
            style={styles.input}
            value={email}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={themeTokens.textSoft}
            secureTextEntry
            style={styles.input}
            value={password}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton
          label="Register"
          loading={loading}
          onPress={() => onRegister({ fullName, email, password })}
        />
      </View>
      <Pressable onPress={onShowLogin} style={styles.secondaryButton}>
        <Text style={styles.secondaryText}>Back to login</Text>
      </Pressable>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: themeTokens.border,
    padding: 18,
    gap: 14
  },
  field: {
    gap: 8
  },
  fieldLabel: {
    color: themeTokens.text,
    fontSize: 13,
    fontWeight: "700"
  },
  input: {
    backgroundColor: "#F9FBFA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: themeTokens.border,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  error: {
    color: themeTokens.danger,
    fontSize: 14,
    fontWeight: "600"
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
