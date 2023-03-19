import OnBoard from "./src/screens/OnBoard";
import { StatusBar } from "expo-status-bar";
import { NativeRouter, Route, Routes } from "react-router-native";
import { ScrollView } from "react-native";
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import AuthLayout from "./src/layouts/AuthLayout";
import Dashboard from "./src/layouts/Dashboard";
import { QueryClientProvider, QueryClient } from "react-query";

export default function App() {
    const client = new QueryClient();

    return (
        <NativeRouter>
            <QueryClientProvider client={client}>
                <StatusBar animated={true} />
                <ScrollView
                    className="bg-white px-8 py-4"
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AuthLayout>
                                    <OnBoard />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <AuthLayout>
                                    <Login />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <AuthLayout>
                                    <Signup />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard>
                                    <></>
                                </Dashboard>
                            }
                        />
                    </Routes>
                </ScrollView>
            </QueryClientProvider>
        </NativeRouter>
    );
}
