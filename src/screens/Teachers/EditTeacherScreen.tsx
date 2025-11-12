import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { MainStackParamList } from "../../navigation/MainStack";

type EditTeacherRouteProp = RouteProp<MainStackParamList, "EditTeacher">;
type NavigationProp = NativeStackNavigationProp<MainStackParamList, "EditTeacher">;

export default function EditTeacherScreen() {
  const route = useRoute<EditTeacherRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { teacher } = route.params;

  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: `Editar ${teacher.name}` });
  }, [navigation, teacher.name]);

  const handleSave = async () => {
    if (!name || !email) {
      setMessage("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Aqui você chamaria sua API real:
      // await api.put(`/teachers/${teacher.id}`, { name, email, password });

      // Simulação fictícia de atualização
      setTimeout(() => {
        setLoading(false);
        setMessage("Dados atualizados com sucesso!");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage("Erro ao salvar alterações.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Editar Professor
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
        label="Nova Senha (opcional)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Salvar Alterações
      </Button>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Button onPress={() => navigation.goBack()} mode="text" style={{ marginTop: 10 }}>
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
