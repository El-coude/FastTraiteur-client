import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import NavigateBack from "../../components/NavigateBack";
import { Link, useLocation } from "react-router-native";
import Quantity from "../../components/Quantity";
import { PrimaryButton } from "../../components/Button";
import useCartStore from "../../stores/CartStore";
import { Feather } from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Meal = () => {
    const { state: meal } = useLocation();
    const [quantity, setQuantity] = useState(1);
    const { addItem, cart } = useCartStore((state) => state);
    return (
        <>
            <NavigateBack />
            <View className="h-full w-full">
                {meal.images.length > 0 && (
                    <Image
                        source={{ uri: meal.images[0].url }}
                        style={{
                            width: "100%",
                            height: "50%",
                        }}
                    />
                )}
                <View className="w-full px-4 h-1/2">
                    <Text
                        className="text-3xl my-2"
                        style={{ fontFamily: "DM-Bold" }}>
                        {meal.name}
                    </Text>
                    <View className="flex flex-row items-center justify-between">
                        <Text
                            className="text-3xl my-2 text-pri-4"
                            style={{ fontFamily: "DM-Bold" }}>
                            {meal.price} da
                        </Text>
                        <Quantity count={quantity} setCount={setQuantity} />
                    </View>
                    <Text
                        className="text-xl my-2"
                        style={{ fontFamily: "DM-Med" }}>
                        {meal.description}
                    </Text>
                    <View className="flex flex-1 flex-row items-end justify-between mt-auto py-4 w-4/5">
                        <Link
                            to="/cart"
                            className="w-1/12 mb-2 mr-10 ml-2 relative">
                            <>
                                {cart.length > 0 && (
                                    <View className="absolute z-20 -top-1 -right-1 rounded-full bg-pri-4 w-4 h-4 flex-1 items-center justify-center">
                                        <Text className="text-[8px] text-center text-white">
                                            {cart.length}
                                        </Text>
                                    </View>
                                )}
                                <Feather
                                    name="shopping-cart"
                                    size={24}
                                    color="black"
                                />
                            </>
                        </Link>
                        <PrimaryButton
                            title="ADD TO CART"
                            rounded
                            style=""
                            onPress={() => {
                                Toast.show({
                                    type: "success",
                                    text1: "Meal added to cart",
                                });
                                addItem({
                                    meal,
                                    quantity,
                                });
                            }}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

export default Meal;
