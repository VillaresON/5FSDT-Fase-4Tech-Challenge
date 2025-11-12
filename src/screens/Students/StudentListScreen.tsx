// src/screens/Students/StudentListScreen.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Card, Button, IconButton, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/MainStack"; // garanta que o caminho esteja correto

type NavigationProp = NativeStackNavigationProp<MainStackParamList, "StudentList">;

interface Student {
  id: number;
  name: string;
  email: string;
}

export default function StudentListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStudents([
        { id: 1, name: "Maria Souza", email: "maria@aluno.com" },
        { id: 2, name: "Pedro Silva", email: "pedro@aluno.com" },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir", "Deseja realmente excluir este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setStudents((prev) => prev.filter((s) => s.id !== id)),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        icon="plus"
        mode="contained"
        style={{ marginBottom: 10 }}
        onPress={() => navigation.navigate("CreateStudent")}
      >
        Novo Aluno
      </Button>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} subtitle={item.email} />
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => navigation.navigate("EditStudent", { student: item })}
              />
              <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
