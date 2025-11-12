// src/screens/HomeScreen.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../navigation/MainStack";
import { useAuth } from "../context/AuthContext";

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Painel Principal
      </Text>

      {/* Navegações */}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("PostList")}
      >
        📚 Ver Posts
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("StudentList")}
      >
        👨‍🎓 Gerenciar Alunos
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("CreateTeacher")}
      >
        👩‍🏫 Cadastrar Professor
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("Admin")}
      >
        🧠 Painel Administrativo
      </Button>

      <Button
        mode="outlined"
        style={[styles.button, { marginTop: 20 }]}
        onPress={logout}
      >
        Sair
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 8,
  },
});
