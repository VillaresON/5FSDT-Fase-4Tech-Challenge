import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function CreateStudentScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSave = () => {
    if (!name || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    console.log("Novo aluno cadastrado:", { name, email });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Cadastrar Novo Aluno
      </Text>

      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSave}>
        Salvar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 16 },
});
