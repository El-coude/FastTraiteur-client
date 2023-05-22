import React, { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
const Quantity = ({
    count,
    setCount,
    size,
}: {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
    size?: "small";
}) => {
    return (
        <View
            className={`rounded-full bg-pri-1 flex flex-1 items-center justify-between flex-row p-1 ${
                size == "small" ? "max-w-[70px] " : "max-w-[100px] "
            }`}>
            <View
                className={`flex-1 justify-center items-center bg-pri-4  rounded-full ${
                    size == "small" ? "max-w-[16px] h-4" : "max-w-[28px] h-7"
                }`}>
                <AntDesign
                    name="minus"
                    size={size == "small" ? 14 : 24}
                    color={"white"}
                    className="text-center"
                    onPress={() => setCount(count == 1 ? 1 : count - 1)}
                />
            </View>
            <Text className={`${size == "small" ? "text-sm" : "text-lg"}`}>
                {count}
            </Text>
            <View
                className={`flex-1 justify-center items-center bg-pri-4  rounded-full ${
                    size == "small" ? "max-w-[16px] h-4" : "max-w-[28px] h-7"
                }`}>
                <Ionicons
                    name="add"
                    size={size == "small" ? 14 : 24}
                    color={"white"}
                    className="text-center"
                    onPress={() => setCount(count + 1)}
                />
            </View>
        </View>
    );
};

export default Quantity;
