import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainStack";

type Props = NativeStackScreenProps<MainStackParamList, "EditPost">;

export default function EditPostScreen({ route, navigation }: Props) {
  const { post } = route.params;

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [content, setContent] = useState(post.content || "");
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (!title || !author || !content) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    // Simulação de atualização
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Post atualizado com sucesso!");
      navigation.goBack();
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Editar Postagem" />
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
            onPress={handleSaveChanges}
            loading={loading}
            disabled={loading}
          >
            Salvar Alterações
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
