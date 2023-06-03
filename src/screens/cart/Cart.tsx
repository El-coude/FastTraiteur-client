import React, { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import useCartStore, { CartItem } from "../../stores/CartStore";
import { FlatList, Image, Modal, Text, View } from "react-native";
import Quantity from "../../components/Quantity";
import { Link } from "react-router-native";
import { EvilIcons } from "@expo/vector-icons";
import { PrimaryButton } from "../../components/Button";
import OrderConfirmation from "../order/OrderConfirmation";
const empty = require("../../../assets/empty-cart.png");

const Cart = () => {
    const { cart, total } = useCartStore((state) => state);
    const [confirmation, setConfirmation] = useState(false);
    /*   const {isLoading, mutate}  = useMutate("order");

    const save = () => {
        mutate({}, {
            on
        })
    } */

    return (
        <>
            <NavigateBack />
            <View className="w-full h-screen py-10 px-6">
                {cart.length > 0 ? (
                    <>
                        <FlatList
                            data={cart}
                            renderItem={({ item }) => <Item {...item} />}
                            numColumns={1}
                            keyExtractor={(item) => item.meal.id.toString()}
                        />
                        <View className="flex flex-1 flex-row items-end justify-between mb-10 w-4/5">
                            <Text
                                style={{ fontFamily: "DM-Bold" }}
                                className="mr-2 mb-1 text-lg">
                                {total}D.A
                            </Text>
                            <PrimaryButton
                                title="ORDER NOW"
                                rounded
                                onPress={() => setConfirmation(true)}
                            />
                        </View>
                        <Modal
                            visible={confirmation}
                            onRequestClose={() => setConfirmation(false)}>
                            <OrderConfirmation />
                        </Modal>
                    </>
                ) : (
                    <>
                        <Image source={empty} style={{ width: 300 }} />
                    </>
                )}
            </View>
        </>
    );
};

const Item = ({ meal, quantity }: CartItem) => {
    const [quan, setQuantity] = useState(quantity);
    const { removeItem } = useCartStore((state) => state);
    const { updateItemQuantity } = useCartStore((state) => state);
    useEffect(() => {
        if (quan !== quantity) {
            updateItemQuantity(meal.id, quan);
        }
    }, [quan]);
    return (
        <View className="flex flex-row items-center justify-start gap-4 py-4 border-b border-gray-400 w-full">
            <Link
                to={`/meal/${meal.id}`}
                state={meal}
                underlayColor="#ffffffff">
                <Image
                    source={{ uri: meal.images[0].url }}
                    style={{ width: 100, height: 80 }}
                />
            </Link>
            <View className="">
                <Text>{meal.name}</Text>
                <View className="flex justify-between items-center flex-row w-48">
                    <Text className="text-xl" style={{ fontFamily: "DM-Bold" }}>
                        {meal.price}da
                    </Text>
                    <Quantity
                        size="small"
                        count={quan}
                        setCount={setQuantity}
                    />
                    <View className="mb-1">
                        <EvilIcons
                            name="trash"
                            size={24}
                            color="red"
                            onPress={() => removeItem(meal.id)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Cart;
