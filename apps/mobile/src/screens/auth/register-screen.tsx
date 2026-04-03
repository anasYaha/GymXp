import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthModeLink } from "../../components/auth/auth-mode-link";
import { AuthTextField } from "../../components/auth/auth-text-field";
import { PrimaryButton } from "../../components/common/primary-button";
import { ScreenShell } from "../../components/common/screen-shell";
import { themeTokens } from "../../theme/tokens";

interface RegisterScreenProps {
  onRegister: (input: { fullName: string; email: string; password: string }) => Promise<void>;
  onShowLogin: () => void;
  loading: boolean;
  error: string | null;
  notice: string | null;
}

export const RegisterScreen = ({
  onRegister,
  onShowLogin,
  loading,
  error,
  notice
}: RegisterScreenProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenShell
      title="Create your account"
      subtitle="Join GymXP to unlock your sessions, XP, and streak tracking."
    >
      <View style={styles.formCard}>
        <AuthTextField
          autoCapitalize="words"
          label="Full name"
          onChangeText={setFullName}
          placeholder="Full name"
          value={fullName}
        />
        <AuthTextField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
        />
        <AuthTextField
          autoCapitalize="none"
          autoCorrect={false}
          label="Password"
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          value={password}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {notice ? <Text style={styles.notice}>{notice}</Text> : null}
        <PrimaryButton
          label="Register"
          loading={loading}
          onPress={() => onRegister({ fullName, email, password })}
        />
      </View>
      <AuthModeLink disabled={loading} label="Back to login" onPress={onShowLogin} />
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
  error: {
    color: themeTokens.danger,
    fontSize: 14,
    fontWeight: "600"
  },
  notice: {
    color: themeTokens.brandPrimary,
    fontSize: 14,
    fontWeight: "600"
  }
});
