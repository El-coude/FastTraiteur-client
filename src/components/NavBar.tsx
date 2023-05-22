import React, { useState } from "react";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
const NavBar = () => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    return (
        <View className="absolute bottom-0 left-0 right-0 w-full border-t border-gray-300 bg-white h-14 flex flex-row items-center justify-between px-10">
            <View
                onTouchStart={() => {
                    setActive(0);
                    navigate("/dashboard");
                }}
                className={`h-full flex-1 items-center justify-center ${
                    active == 0 ? "border-t-2 border-pri-4 bg-slate-50" : ""
                }`}>
                <Entypo
                    name="home"
                    size={24}
                    color={active == 0 ? "#FA4A0C" : "black"}
                />
            </View>
            <View
                onTouchStart={() => {
                    setActive(1);
                    navigate("/cart");
                }}
                className={`h-full flex-1 items-center justify-center ${
                    active == 1 ? "border-t-2 border-pri-4 bg-slate-50" : ""
                }`}>
                <MaterialCommunityIcons
                    name="shopping"
                    size={24}
                    color={active == 1 ? "#FA4A0C" : "black"}
                />
            </View>
            <View
                onTouchStart={() => {
                    setActive(2);
                    navigate("/dashboard/profile");
                }}
                className={`h-full flex-1 items-center justify-center ${
                    active == 2 ? "border-t-2 border-pri-4 bg-slate-50" : ""
                }`}>
                <MaterialCommunityIcons
                    name="account"
                    size={24}
                    color={active == 2 ? "#FA4A0C" : "black"}
                />
            </View>
        </View>
    );
};

export default NavBar;
