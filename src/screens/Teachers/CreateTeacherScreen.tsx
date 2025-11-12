import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/MainStack";

type NavigationProp = NativeStackNavigationProp<MainStackParamList, "CreateTeacher">;

export default function CreateTeacherScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setMessage("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Aqui entraria a chamada real à API:
      // await api.post("/teachers", { name, email, password });

      // Simulação fictícia
      setTimeout(() => {
        setLoading(false);
        setMessage("Professor cadastrado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao cadastrar professor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Cadastrar Professor
      </Text>

      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Cadastrar
      </Button>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Button
        onPress={() => navigation.goBack()}
        mode="text"
        style={{ marginTop: 10 }}
      >
        Voltar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  message: { textAlign: "center", marginTop: 10 },
});
