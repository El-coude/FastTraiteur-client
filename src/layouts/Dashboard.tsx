import { FC, PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { Navigate } from "react-router-native";
import useAuthStore from "../stores/AuthStore";
import Logout from "../components/Logout";
import NavBar from "../components/NavBar";

const Dashboard: FC<PropsWithChildren> = ({ children }) => {
    const { user, hasHydrated } = useAuthStore((state) => state);

    if (!hasHydrated) return <Text className="text-center">Loading ...</Text>;
    if (!user) return <Navigate to="/login" />;
    /*  if (!user.isConfirmed) return <Navigate to="/confirm-sms" />;
    if (!user.address || !user.city)
        return <Navigate to="/profile" state={{ firstTime: true }} />; */

    return (
        <View className="h-full w-full pt-10">
            <Logout />
            {children}
        </View>
    );
};

export const WithNavBarDashboard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthStore((state) => state);

    if (!user?.isConfirmed) return <Navigate to="/confirm-sms" />;
    if (!user?.address)
        return <Navigate to="/profile" state={{ firstTime: true }} />;

    return (
        <Dashboard>
            <View className="px-4 w-full">{children}</View>
            <NavBar />
        </Dashboard>
    );
};

export const NoNavBarDashboard: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthStore((state) => state);

    if (!user?.isConfirmed) return <Navigate to="/confirm-sms" />;
    if (!user?.address)
        return <Navigate to="/profile" state={{ firstTime: true }} />;

    return (
        <Dashboard>
            <View className="w-full">{children}</View>
        </Dashboard>
    );
};

export default Dashboard;
