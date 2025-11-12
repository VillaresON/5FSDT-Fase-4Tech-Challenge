import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";

interface Student {
  id: number;
  name: string;
  email: string;
}

export default function EditStudentScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { student } = route.params as { student: Student };

  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);

  const handleSave = () => {
    console.log("Aluno atualizado:", { id: student.id, name, email });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Editar Aluno
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
        Salvar Alterações
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 16 },
});
