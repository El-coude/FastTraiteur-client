import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-native";
import useAuthStore from "../stores/AuthStore";
import { View } from "react-native";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthStore((state) => state);
    if (user) return <Navigate to="/dashboard" />;

    return (
        <View className="px-5 w-full flex-1 items-center justify-center">
            {children}
        </View>
    );
};

export default AuthLayout;
