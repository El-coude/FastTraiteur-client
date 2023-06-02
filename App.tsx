import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { QueryClientProvider, QueryClient } from "react-query";
import AppRoutes from "./src/routes/AppRoutes";
import { useFonts } from "expo-font";
export default function App() {
    const client = new QueryClient();
    const [fontsLoaded] = useFonts({
        "DM-Bold": require("./assets/DM_Sans/DMSans-Bold.ttf"),
        "DM-Med": require("./assets/DM_Sans/DMSans-Medium.ttf"),
        "DM-Reg": require("./assets/DM_Sans/DMSans-Regular.ttf"),
    });
    return (
        <NativeRouter>
            <QueryClientProvider client={client}>
                <StatusBar animated={true} />
                <View className="bg-white flex-1">
                    <AppRoutes />
                    <Toast />
                </View>
            </QueryClientProvider>
        </NativeRouter>
    );
}
