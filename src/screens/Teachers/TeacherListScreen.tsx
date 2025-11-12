import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Card, Text, Button, IconButton, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/MainStack";

interface Teacher {
  id: number;
  name: string;
  email: string;
}

export default function TeacherListScreen() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    // Simula uma requisição
    const timeout = setTimeout(() => {
      setTeachers([
        { id: 1, name: "Prof. Carlos", email: "carlos@escola.com" },
        { id: 2, name: "Profª Ana", email: "ana@escola.com" },
        { id: 3, name: "Prof. João", email: "joao@escola.com" },
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir", "Deseja realmente excluir este professor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setTeachers((prev) => prev.filter((t) => t.id !== id));
        },
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
        onPress={() => navigation.navigate("CreateTeacher")}
      >
        Novo Professor
      </Button>

      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.name} subtitle={item.email} />
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => navigation.navigate("EditTeacher", { teacher: item })}
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
