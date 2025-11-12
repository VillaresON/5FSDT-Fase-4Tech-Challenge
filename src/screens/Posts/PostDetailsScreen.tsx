import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { MainStackParamList } from "../../navigation/MainStack";

type PostDetailsRouteProp = RouteProp<MainStackParamList, "PostDetails">;
type NavigationProp = NativeStackNavigationProp<MainStackParamList, "PostDetails">;

export default function PostDetailsScreen() {
  const route = useRoute<PostDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={post.title} subtitle={`Autor: ${post.author}`} />
        <Card.Content>
          <Text variant="bodyLarge" style={styles.content}>
            {post.content}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("EditPost", { post })}
          style={styles.button}
        >
          Editar Post
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Voltar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 20 },
  content: { marginTop: 10, lineHeight: 22 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: { flex: 1, marginHorizontal: 5 },
});
