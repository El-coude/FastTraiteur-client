import { Text, View } from "react-native";
import useMutate from "../../hooks/useMutate";
import { OutlineButton, PrimaryButton } from "../../components/Button";
import PickFromMap from "../../components/Map";
import useAuthStore from "../../stores/AuthStore";
import { useState } from "react";
import Input from "../../components/Input";
import useCartStore from "../../stores/CartStore";

const OrderConfirmation = () => {
    const { isLoading, mutate } = useMutate("order");

    const { user, setUser } = useAuthStore((state) => state);
    const { total, cart } = useCartStore((state) => state);

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

    const confirm = () => {
        mutate({}, {});
    };

    return (
        <View className="p-4 h-screen">
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
            <Input name="phone" defaultValue={user?.phone} className="mb-8" />
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
            <PrimaryButton title="CONFIRM" style="mt-auto" onPress={confirm} />
        </View>
    );
};

export default OrderConfirmation;
