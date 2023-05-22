import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useAuthStore from "../stores/AuthStore";
import { useNavigate } from "react-router-native";

const Logout = () => {
    const { setUser } = useAuthStore((state) => state);
    const navigate = useNavigate();
    return (
        <View
            className="flex-1 justify-center items-center shadow-lg bg-white border border-black w-8 h-8 rounded-xl absolute top-10 right-4 z-50"
            onTouchStart={() => {
                setUser(null);
                navigate("/login");
            }}>
            <MaterialIcons name="logout" size={20} color="black" />
        </View>
    );
};

export default Logout;
