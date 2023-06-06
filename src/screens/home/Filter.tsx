import { Modal, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/Button";
import useFilterStore from "../../stores/MealFilter";
import useAuthStore from "../../stores/AuthStore";

const Filter = () => {
    const { price, setPrice, distance, setDistance } = useFilterStore(
        (state) => state
    );

    const [modal, setModal] = useState(false);
    const [info, setInfo] = useState<{
        price: { min: number; max: number };
        distance: number;
    }>({
        price: price || {
            min: 1,
            max: 10000,
        },
        distance: distance || 10,
    });

    const save = () => {
        setPrice(info.price);
        setDistance(info.distance);
        setModal(false);
    };
    const { user } = useAuthStore((state) => state);

    return (
        <View className="m-auto rounded-md">
            <Ionicons
                name="filter"
                size={24}
                color="black"
                className="border border-pri-4"
                onPress={() => setModal(true)}
            />

            <Modal
                visible={modal}
                animationType="slide"
                onRequestClose={() => {
                    setModal(false);
                }}>
                <View className="p-4 h-screen">
                    <Text
                        className="text-pri-4 text-xl mb-4"
                        style={{ fontFamily: "DM-Bold" }}>
                        Filter meals
                    </Text>
                    <Text className="text-xl" style={{ fontFamily: "DM-Bold" }}>
                        Price
                    </Text>
                    <View className="flex-row items-center justify-center w-full my-5 ">
                        <View className="w-1/2 mr-2">
                            <Text className="text-black text-lg">Min</Text>
                            <Input
                                name="min"
                                inputMode="numeric"
                                defaultValue={info.price.min.toString()}
                                onChangeText={(e) =>
                                    setInfo((prev) => ({
                                        ...prev,
                                        price: {
                                            ...prev.price,
                                            min:
                                                prev.price.max <= +e
                                                    ? prev.price.max
                                                    : +e,
                                        },
                                    }))
                                }
                            />
                        </View>
                        <View className="w-1/2">
                            <Text className="text-black text-lg">Max</Text>
                            <Input
                                name="min"
                                inputMode="numeric"
                                defaultValue={info.price.max.toString()}
                                onChangeText={(e) =>
                                    setInfo((prev) => ({
                                        ...prev,
                                        price: {
                                            ...prev.price,
                                            max: +e,
                                        },
                                    }))
                                }
                            />
                        </View>
                    </View>

                    <Text className="text-xl" style={{ fontFamily: "DM-Bold" }}>
                        Restaurants distance ( max 30KM )
                    </Text>
                    <View className="flex flex-row items-center justify-start w-28">
                        <Input
                            className="w-20"
                            name="min"
                            inputMode="numeric"
                            defaultValue={info.distance.toString()}
                            onChangeText={(e) =>
                                setInfo((prev) => ({
                                    ...prev,
                                    distance: +e,
                                }))
                            }
                        />
                        <Text
                            className="text-xl mt-4"
                            style={{ fontFamily: "DM-Bold" }}>
                            KM
                        </Text>
                    </View>
                    <Text className="text-xl" style={{ fontFamily: "DM-Bold" }}>
                        Your address is {user?.address} , change it in profile
                        settings to get access to relavant restaurants
                    </Text>
                    <PrimaryButton
                        title="Save filter"
                        style="mt-auto"
                        onPress={save}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default Filter;
