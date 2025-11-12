import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Text,
  ActivityIndicator,
  Button,
  IconButton,
} from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../../navigation/MainStack";

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  content?: string;
}

export default function PostListScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  // 👇 Adiciona botão "+" no topo direito
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          onPress={() => navigation.navigate("CreatePost")}
        />
      ),
    });
  }, [navigation]);

  // 👇 Simulação de carregamento de posts (fictício)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: "Aprendendo React Native",
          author: "Prof. Carlos",
          description: "Uma introdução prática ao desenvolvimento mobile.",
          content:
            "React Native é uma biblioteca para criar apps mobile usando JavaScript e React...",
        },
        {
          id: 2,
          title: "Node.js no Back-end",
          author: "Profª Ana",
          description: "Como criar APIs REST escaláveis em Node.js.",
          content:
            "Node.js é um runtime que permite rodar JavaScript no servidor, ideal para back-ends rápidos...",
        },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão de sair */}
      <Button onPress={logout} mode="outlined" style={{ marginBottom: 10 }}>
        Sair
      </Button>

      {/* Lista de posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetails", { post: item })}
          >
            <Card style={styles.card}>
              <Card.Title title={item.title} subtitle={item.author} />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
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
