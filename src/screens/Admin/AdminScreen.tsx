// src/screens/Admin/AdminScreen.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Card, Button, IconButton, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/MainStack";

type NavigationProp = NativeStackNavigationProp<MainStackParamList, "PostList">;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  content?: string;
}

export default function AdminScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulação de carregamento (mock)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: "Primeiro Post",
          author: "Prof. João",
          description: "Introdução à disciplina.",
          content: "Bem-vindos ao curso!",
        },
        {
          id: 2,
          title: "Segundo Post",
          author: "Prof. Ana",
          description: "Dicas de estudo.",
          content: "Mantenham a rotina de leitura!",
        },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir", "Deseja realmente excluir este post?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setPosts((prev) => prev.filter((p) => p.id !== id)),
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
        style={styles.newButton}
        onPress={() => navigation.navigate("CreatePost")}
      >
        Novo Post
      </Button>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} subtitle={`Autor: ${item.author}`} />
            <Card.Content>
              <Button onPress={() => navigation.navigate("PostDetails", { post: item })}>
                Ver Detalhes
              </Button>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon="pencil"
                onPress={() => navigation.navigate("EditPost", { post: item })}
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
  newButton: { marginBottom: 10 },
});
