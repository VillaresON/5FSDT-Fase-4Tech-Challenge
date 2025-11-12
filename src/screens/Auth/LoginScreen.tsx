// src/screens/Auth/LoginScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/MainStack";

type NavigationProp = NativeStackNavigationProp<MainStackParamList, "Home">;

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState("prof@teste.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password); // função tipada do context
      // navega para Home apenas se o login tiver sucesso
      navigation.replace("Home");
    } catch (err: any) {
      setError(err?.message ?? "Erro ao efetuar login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login do Professor
      </Text>
      <TextInput label="E-mail" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} loading={loading}>
        Entrar
      </Button>

      <Snackbar visible={!!error} onDismiss={() => setError("")}>
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginBottom: 10 },
  title: { textAlign: "center", marginBottom: 20 },
});
