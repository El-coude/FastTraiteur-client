import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useParams } from "react-router-native";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import NavigateBack from "../../components/NavigateBack";
import { PrimaryButton } from "../../components/Button";

const OrderTrack = () => {
    const { id } = useParams();
    const {
        result: order,
        error,
        isLoading,
        refetch,
    } = useFetch<{
        state: "PENDING" | "COOKING" | "DELIVERY" | "DONE" | "CANCELED";
    }>("orders/" + id);

    enum STEPNUMBER {
        "PENDING" = 1,
        "COOKING" = 2,
        "DELIVERY" = 3,
        "DONE" = 4,
        "CANCELED" = 5,
    }
    console.log(order?.state);
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("first");
            refetch();
        }, 5000);

        return () => clearInterval(interval);
    });

    if (error) return <Text className="text-err-1">Error loading order</Text>;
    if (isLoading) return <Loading visible={isLoading} />;
    return (
        <View className="h-full px-4 pt-20">
            <NavigateBack />
            <Step
                stepNumber={0}
                state={STEPNUMBER[order?.state!]}
                text="Order placed"
            />
            <Step
                stepNumber={1}
                state={STEPNUMBER[order?.state!]}
                text="Order in review"
            />
            <Step
                stepNumber={2}
                state={STEPNUMBER[order?.state!]}
                text="Order cooking"
            />
            <Step
                stepNumber={3}
                state={STEPNUMBER[order?.state!]}
                text="Order on the way"
            />
            <Step
                stepNumber={4}
                state={STEPNUMBER[order?.state!]}
                text="Order delivered"
            />
            <PrimaryButton
                title="Cancel order"
                style="mt-auto"
                onPress={() => {}}
            />
        </View>
    );
};

const Step = (props: { stepNumber: number; state: number; text: string }) => {
    let color: string = "";
    if (props.state < props.stepNumber) color = "gray";
    else if (props.state > props.stepNumber || props.state == 4)
        color = "green";
    else color = "orange";
    console.log(props.state);
    const Icon = () => {
        if (props.state < props.stepNumber) {
            return <AntDesign name="minuscircleo" size={48} color={color} />;
        } else if (props.state > props.stepNumber || props.state == 4) {
            return (
                <Ionicons
                    name="checkmark-done-circle"
                    size={48}
                    color={color}
                />
            );
        } else {
            return <AntDesign name="clockcircleo" size={48} color={color} />;
        }
    };
    return (
        <>
            <View className="flex flex-row items-center mb-8">
                <Icon />
                <Text
                    style={{ fontFamily: "DM-Bold", color: color || "black" }}
                    className={`text-2xl ml-2 ${color}`}>
                    {props.text}
                </Text>
            </View>
        </>
    );
};

export default OrderTrack;
