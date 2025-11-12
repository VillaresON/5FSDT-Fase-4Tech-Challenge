// src/navigation/MainStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostListScreen from "../screens/Posts/PostListScreen";
import PostDetailsScreen from "../screens/Posts/PostDetailsScreen";
import CreatePostScreen from "../screens/Posts/CreatePostScreen";
import EditPostScreen from "../screens/Posts/EditPostScreen";
import CreateTeacherScreen from "../screens/Teachers/CreateTeacherScreen";
import EditTeacherScreen from "../screens/Teachers/EditTeacherScreen";
import CreateStudentScreen from "../screens/Students/CreateStudentScreen";
import EditStudentScreen from "../screens/Students/EditStudentScreen";
import StudentListScreen from "../screens/Students/StudentListScreen";
import AdminScreen from "../screens/Admin/AdminScreen";
import HomeScreen from "../screens/HomeScreen";

export type MainStackParamList = {
    PostList: undefined;
    PostDetails: {
        post: {
            id: number;
            title: string;
            author: string;
            description: string;
            content?: string;
        };
    };
    CreatePost: undefined;
    CreateTeacher: undefined;
    EditPost: {
        post: {
            id: number;
            title: string;
            author: string;
            description: string;
            content?: string;
        };
    };
    EditTeacher: {
        teacher: {
            id: number;
            name: string;
            email: string;
        };
    };
    StudentList: undefined;
    CreateStudent: undefined;
    Admin: undefined;
    Home: undefined;
    EditStudent: {
        student: {
            id: number;
            name: string;
            email: string;
        };
    };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostList" component={PostListScreen} options={{ title: "Posts" }} />
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} options={{ title: "Detalhes do Post" }} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Criar Postagem" }} />
            <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: "Editar Postagem" }} />
            <Stack.Screen name="CreateTeacher" component={CreateTeacherScreen} options={{ title: "Novo Professor" }} />
            <Stack.Screen name="EditTeacher" component={EditTeacherScreen} options={{ title: "Editar Professor" }} />
            <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: "Estudantes" }} />
            <Stack.Screen name="CreateStudent" component={CreateStudentScreen} options={{ title: "Novo Estudante" }} />
            <Stack.Screen name="EditStudent" component={EditStudentScreen} options={{ title: "Editar Estudante" }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ title: "Painel Administrativo" }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />

        </Stack.Navigator>
    );
}
