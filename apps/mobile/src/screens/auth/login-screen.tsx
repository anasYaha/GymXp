import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { PrimaryButton } from "../../components/common/primary-button";
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
      title="Welcome back"
      subtitle="Sign in to continue your branch-specific progress, check into sessions, and keep your GymXP momentum going."
    >
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Member access</Text>
        <Text style={styles.heroTitle}>Track your workouts, XP, and streaks in one place.</Text>
        <Text style={styles.heroBody}>
          Use the demo account below or your existing member credentials.
        </Text>
      </View>
      <View style={styles.formCard}>
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
        <PrimaryButton label="Login" loading={loading} onPress={() => onLogin({ email, password })} />
      </View>
      <Pressable onPress={onShowRegister} style={styles.secondaryButton}>
        <Text style={styles.secondaryHint}>New to GymXP?</Text>
        <Text style={styles.secondaryText}>Create an account</Text>
      </Pressable>
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
    justifyContent: "center",
    paddingVertical: 14,
    gap: 4
  },
  secondaryHint: {
    color: themeTokens.textSoft,
    fontSize: 13
  },
  secondaryText: {
    color: themeTokens.brandPrimary,
    fontSize: 15,
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
