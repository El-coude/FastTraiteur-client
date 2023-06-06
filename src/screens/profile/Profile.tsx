import { Text, View } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import useAuthStore, { UserType } from "../../stores/AuthStore";
import { OutlineButton, PrimaryButton } from "../../components/Button";
import { useState } from "react";
import useMutate from "../../hooks/useMutate";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import FileInput from "./FileInput";
import PickFromMap from "../../components/Map";
const dp = require("./profile.png");

const Profile = () => {
    const { user, setUser } = useAuthStore((state) => state);
    console.log(user);

    const [info, setInfo] = useState<Partial<UserType>>({});

    const { state } = useLocation();
    const { mutate, isLoading, error } = useMutate<Partial<UserType>, any>(
        `clients/${user?.id || ""}`,
        {
            method: "Patch",
        }
    );

    const navigate = useNavigate();
    const update = async () => {
        try {
            mutate(
                {
                    address: map.address,
                    imageUrl: info?.imageUrl,
                    longtitud: map.longtitud,
                    latitud: map.latitud,
                },
                {
                    onSuccess: (res) => {
                        Toast.show({
                            type: "success",
                            text1: "Profile updated successfully",
                        });
                        setUser({
                            ...user!,
                            address: map.address,
                            longtitud: map.longtitud,
                            latitud: map.latitud,
                            imageUrl: (res as any).imageUrl,
                        });
                        if (state.firstTime) navigate("/dashboard");
                    },
                    onError: (err) => {
                        throw err;
                    },
                }
            );
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error in updating your profile",
            });
        }
    };

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
    return (
        <View className="px-4 h-[92%]">
            <FileInput
                name="profile"
                defaultImageSrc={user?.imageUrl ? { uri: user.imageUrl } : dp}
                onSelection={(uri) => {
                    setInfo({
                        ...info,
                        imageUrl: uri,
                    });
                }}
            />
            <Text className="text-err-1 text-start w-full my-4 font-bold">
                {error?.message || ""}
            </Text>

            <Text className="text-gray-700 text-start w-full">
                Your location ( default )
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
            <PrimaryButton
                title="Save"
                style="mt-auto"
                onPress={update}
                loading={isLoading}
            />
        </View>
    );
};

export default Profile;
