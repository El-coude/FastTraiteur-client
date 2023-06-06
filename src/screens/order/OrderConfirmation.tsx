import { Image, Text, View } from "react-native";
import useMutate from "../../hooks/useMutate";
import { OutlineButton, PrimaryButton } from "../../components/Button";
import PickFromMap from "../../components/Map";
import useAuthStore from "../../stores/AuthStore";
import { useState } from "react";
import Input from "../../components/Input";
import useCartStore, { CartItem } from "../../stores/CartStore";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNavigate } from "react-router-native";
import NavigateBack from "../../components/NavigateBack";
const doneImage = require("../../../assets/success.png");

const OrderConfirmation = () => {
    const { isLoading, mutate } = useMutate("orders/create");

    const { user, setUser } = useAuthStore((state) => state);
    const { total, cart, removeItem } = useCartStore((state) => state);

    const [map, setMap] = useState<{
        visible: boolean;
        longtitud?: number;
        latitud?: number;
        address?: string;
    }>({
        visible: false,
        longtitud: user?.longtitud,
        latitud: user?.latitud,
        address: user?.address,
    });
    const [orderIds, setOrderIds] = useState<number[]>([]);
    const [done, setDone] = useState<boolean>(false);

    const confirm = () => {
        const ordersByRestaurants = new Map<number, CartItem[]>();
        cart.forEach((item) => {
            ordersByRestaurants.set(
                item.meal.restaurantId,
                ordersByRestaurants.get(item.meal.restaurantId)
                    ? [
                          ...ordersByRestaurants.get(item.meal.restaurantId)!,
                          item,
                      ]
                    : [item]
            );
        });
        ordersByRestaurants.forEach(async (order, key) => {
            await mutate(
                {
                    price: total,
                    longitude: map.longtitud,
                    latitud: map.latitud,
                    address: map.address,
                    clientId: user?.id,
                    orderItems: order.map((c) => ({
                        mealId: c.meal.id,
                        quantity: c.quantity,
                    })),
                    restaurantId: key,
                },
                {
                    onSuccess: (data: any) => {
                        console.log("key");
                        cart.forEach((item) => {
                            removeItem(item.meal.id);
                        });
                        let ids = [...orderIds, data.id];
                        setOrderIds(ids);
                    },
                    onError: () => {
                        Toast.show({
                            type: "error",
                            text1: "Order failed",
                        });
                    },
                }
            );
        });
    };
    const navigate = useNavigate();

    return (
        <>
            <View className="pt-20 px-4 h-screen">
                {orderIds?.length && orderIds?.length > 0 ? (
                    <>
                        <Image source={doneImage} />
                        <Text
                            className="text-2xl -mt-20 text-center w-full"
                            style={{ fontFamily: "DM-Bold" }}>
                            Order successful
                        </Text>
                        {orderIds.map((order) => (
                            <PrimaryButton
                                key={order}
                                title="Track order"
                                style="mt-auto"
                                onPress={() => {
                                    navigate(`/order/${order}`);
                                }}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <Text
                            className="text-2xl text-start w-full"
                            style={{ fontFamily: "DM-Bold" }}>
                            Order delivery details
                        </Text>
                        <Text
                            className="text-lg text-start w-full -mb-2 mt-2"
                            style={{ fontFamily: "DM-Bold" }}>
                            Confirm phone number
                        </Text>
                        <Input
                            name="phone"
                            defaultValue={user?.phone}
                            className="mb-8"
                        />
                        <Text
                            className="text-lg text-start w-full"
                            style={{ fontFamily: "DM-Bold" }}>
                            Delivery location
                        </Text>
                        <OutlineButton
                            title={map.address || "Choose location from map"}
                            style="my-2"
                            onPress={() =>
                                setMap((prev) => ({
                                    ...prev,
                                    visible: true,
                                }))
                            }
                            loading={isLoading}
                        />
                        {map.visible && (
                            <PickFromMap
                                close={() =>
                                    setMap((prev) => ({
                                        ...prev,
                                        visible: false,
                                    }))
                                }
                                setInfo={setMap}
                                default={
                                    map.latitud && map.longtitud
                                        ? [map.latitud, map.longtitud]
                                        : undefined
                                }
                            />
                        )}
                        <Text
                            className="text-4xl w-full text-center my-8 text-pri-4"
                            style={{ fontFamily: "DM-Bold" }}>
                            Total price
                        </Text>
                        <Text
                            className="text-4xl w-full text-center text-pri-4"
                            style={{ fontFamily: "DM-Bold" }}>
                            {total}DA
                        </Text>
                        <PrimaryButton
                            title="CONFIRM"
                            style="mt-auto"
                            onPress={confirm}
                        />
                        <PrimaryButton
                            title="Cancel"
                            style="mt-4"
                            onPress={() => navigate("/cart")}
                        />
                    </>
                )}
            </View>
        </>
    );
};

export default OrderConfirmation;
