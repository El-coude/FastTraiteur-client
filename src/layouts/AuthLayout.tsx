import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-native";
import useAuthStore from "../stores/AuthStore";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthStore((state) => state);
    if (user) return <Navigate to="/dashboard" />;
    return <>{children}</>;
};

export default AuthLayout;
