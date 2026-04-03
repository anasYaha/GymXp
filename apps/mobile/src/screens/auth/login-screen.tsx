import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AuthModeLink } from "../../components/auth/auth-mode-link";
import { AuthTextField } from "../../components/auth/auth-text-field";
import { PrimaryButton } from "../../components/common/primary-button";
import { ScreenShell } from "../../components/common/screen-shell";
import { themeTokens } from "../../theme/tokens";

interface LoginScreenProps {
  onLogin: (input: { email: string; password: string }) => Promise<void>;
  onShowRegister: () => void;
  loading: boolean;
  error: string | null;
  notice: string | null;
}

export const LoginScreen = ({ onLogin, onShowRegister, loading, error, notice }: LoginScreenProps) => {
  const [email, setEmail] = useState("ali@example.com");
  const [password, setPassword] = useState("demo12345");

  return (
    <ScreenShell
      title="Welcome back"
      subtitle="Sign in to continue your progress, check into sessions, and keep your GymXP momentum going."
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Member access</Text>
        <Text style={styles.heroTitle}>Track your workouts, XP, and streaks in one place.</Text>
        <Text style={styles.heroBody}>
          Use the demo account below or your existing member credentials.
        </Text>
      </View>
      <View style={styles.formCard}>
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
        <PrimaryButton label="Login" loading={loading} onPress={() => onLogin({ email, password })} />
      </View>
      <AuthModeLink
        disabled={loading}
        hint="New to GymXP?"
        label="Create an account"
        onPress={onShowRegister}
      />
      <View style={styles.demoNote}>
        <Text style={styles.demoNoteText}>Demo login is prefilled so the app is easy to preview in a sales demo.</Text>
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: themeTokens.brandPrimary,
    borderRadius: 24,
    padding: 22,
    gap: 8
  },
  heroEyebrow: {
    color: "#D3ECE6",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800"
  },
  heroBody: {
    color: "#E5F2EE",
    fontSize: 14,
    lineHeight: 21
  },
  formCard: {
    backgroundColor: "#FFFFFF",
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
  },
  demoNote: {
    backgroundColor: themeTokens.accentSoft,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  demoNoteText: {
    color: "#7A5A15",
    fontSize: 13,
    lineHeight: 18
  }
});
