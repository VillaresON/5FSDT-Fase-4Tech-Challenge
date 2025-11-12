import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";

export default function CreatePostScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!title || !author || !content) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    // Simulação de envio (aqui você chamaria o backend real futuramente)
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Post criado com sucesso!");
      navigation.goBack();
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Nova Postagem" />
        <Card.Content>
          <TextInput
            label="Título"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            label="Autor"
            mode="outlined"
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
          />

          <TextInput
            label="Conteúdo"
            mode="outlined"
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={5}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleCreatePost}
            loading={loading}
            disabled={loading}
          >
            Publicar
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { paddingBottom: 20 },
  input: { marginBottom: 15 },
});
