import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import { Screen } from "@/src/components/layout/Screen";
import { AppButton } from "@/src/components/ui/AppButton";
import { AppText } from "@/src/components/ui/AppText";
import { Surface } from "@/src/components/ui/Surface";
import { useAppTheme } from "@/src/theme/useAppTheme";

export function SignInRoute() {
  const theme = useAppTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");

  const submit = () => {
    const cleanEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail))
      return setError("Enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setError("");
    console.log(cleanEmail);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen>
        <View
          style={[styles.intro, Platform.OS === "web" && styles.webContent]}
        >
          <View
            style={[styles.logo, { backgroundColor: theme.colors.primary }]}
          >
            <MaterialIcons
              name="account-circle"
              size={26}
              color={theme.colors.inverseText}
            />
          </View>
          <AppText variant="eyebrow" style={{ color: theme.colors.primary }}>
            Sign In
          </AppText>
          <AppText variant="title">Welcome back,</AppText>
          <AppText muted>Sign in to get started!</AppText>
        </View>

        <Surface style={[styles.form, Platform.OS === "web" && styles.webForm]}>
          <View style={styles.field}>
            <AppText variant="caption">Email</AppText>
            <TextInput
              accessibilityLabel="Email"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.textSoft}
              style={[
                styles.input,
                { borderColor: theme.colors.border, color: theme.colors.text },
              ]}
              value={email}
            />
          </View>
          <View style={styles.field}>
            <AppText variant="caption">Password</AppText>
            <View
              style={[styles.password, { borderColor: theme.colors.border }]}
            >
              <TextInput
                accessibilityLabel="Password"
                autoComplete="password"
                onChangeText={setPassword}
                onSubmitEditing={submit}
                placeholder="At least 6 characters"
                placeholderTextColor={theme.colors.textSoft}
                secureTextEntry={secure}
                style={[styles.passwordInput, { color: theme.colors.text }]}
                value={password}
              />
              <Pressable
                accessibilityLabel={secure ? "Show password" : "Hide password"}
                onPress={() => setSecure(!secure)}
              >
                <MaterialIcons
                  name={secure ? "visibility" : "visibility-off"}
                  size={21}
                  color={theme.colors.textMuted}
                />
              </Pressable>
            </View>
          </View>
          {error ? (
            <AppText variant="caption" style={{ color: theme.colors.danger }}>
              {error}
            </AppText>
          ) : null}
          <AppButton icon="arrow-forward" onPress={submit}>
            Sign in
          </AppButton>
          <AppText variant="caption" muted style={styles.hint}>
            Demo mode: use any valid email and a 6+ character password.
          </AppText>
        </Surface>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  intro: { gap: 10, marginTop: 36 },
  logo: {
    alignItems: "center",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    marginBottom: 14,
    width: 54,
  },
  form: { gap: 18, marginTop: "auto", padding: 22 },
  field: { gap: 8 },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: 16,
  },
  password: {
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    paddingRight: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  hint: { textAlign: "center" },
  webContent: { alignSelf: "center", width: "100%", maxWidth: 560 },
  webForm: { alignSelf: "center", marginTop: 22, width: "100%", maxWidth: 560 },
});
