import React, { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import useCartStore, { CartItem } from "../../stores/CartStore";
import { FlatList, Image, Text, View } from "react-native";
import Quantity from "../../components/Quantity";
import { Link } from "react-router-native";

const Cart = () => {
    const { cart } = useCartStore((state) => state);
    console.log(cart);
    return (
        <>
            <NavigateBack />
            <View className="w-full py-10 px-6">
                <FlatList
                    data={cart}
                    renderItem={({ item }) => <Item {...item} />}
                    numColumns={1}
                    keyExtractor={(item) => item.meal.id.toString()}
                />
            </View>
        </>
    );
};

const Item = ({ meal, quantity }: CartItem) => {
    const [quan, setQuantity] = useState(quantity);
    const { updateItemQuantity } = useCartStore((state) => state);
    useEffect(() => {
        if (quan !== quantity) {
            updateItemQuantity(meal.id, quan);
        }
    }, [quan]);
    return (
        <View className="flex flex-row items-center justify-start gap-4 py-4 border-b border-gray-400 w-full">
            <Link to={`/meal/${meal.id}`} state={meal}>
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
                </View>
            </View>
        </View>
    );
};

export default Cart;
