import { FC, PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { Navigate } from "react-router-native";
import { PrimaryButton } from "../components/Button";
import useAuthStore from "../stores/AuthStore";

const Dashboard: FC<PropsWithChildren> = ({ children }) => {
    const { user, setUser, hasHydrated } = useAuthStore((state) => state);

    if (!hasHydrated) return <Text className="text-center">Loading ...</Text>;
    if (!user) return <Navigate to="/login" />;
    return (
        <View>
            <PrimaryButton title="logout" onPress={() => setUser(null)} />
            {children}
        </View>
    );
};

export default Dashboard;
