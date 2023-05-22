import { Text, View } from "react-native";
import { Link, useNavigate } from "react-router-native";
import useAuthStore from "../../stores/AuthStore";
import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import useMutate from "../../hooks/useMutate";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Confirm = () => {
    const { user, setUser } = useAuthStore((state) => state);
    const [input, setInput] = useState("");
    const { mutate, isLoading, error } = useMutate("sms/verify");
    const {
        mutate: sendSms,
        isLoading: sending,
        error: sendingErr,
    } = useMutate("sms/sendSms");
    useEffect(() => {
        send();
    }, []);

    const navigate = useNavigate();
    const verify = async () => {
        try {
            mutate(
                {
                    code: input,
                    phone: user?.phone,
                },
                {
                    onSuccess: () => {
                        setUser({
                            ...user!,
                            isConfirmed: true,
                        });
                        navigate("/dashboard");
                    },
                    onError: (err) => {
                        Toast.show({
                            type: "error",
                            text1: err,
                        });
                    },
                }
            );
        } catch (error) {}
    };

    const send = () => {
        sendSms(
            {
                phone: user?.phone,
            },
            {
                onSuccess() {
                    Toast.show({
                        type: "success",
                        text1: "You'll receive an sms soon !",
                    });
                },
                onError(err) {
                    Toast.show({
                        type: "error",
                        text1: err.message,
                    });
                },
            }
        );
    };
    return (
        <>
            <Text className="font-bold text-lg text-center">
                Enter the verification code sent to {user?.phone}
            </Text>
            <Text className="text-err-1 text-start w-full my-4 font-bold">
                {error?.message || ""}
            </Text>
            <Input
                name="confirm"
                placeholder="Enter code"
                label="Phone number"
                inputMode="tel"
                className={`${error ? "border-err-1 border-2" : "my-2"}`}
                onChangeText={(e) => {
                    console.log(e);
                    setInput(e);
                }}
            />
            <PrimaryButton
                title="Confirm"
                style="mt-2"
                onPress={verify}
                loading={isLoading}
            />
            <View className="flex items-center flex-row gap-2 mt-4">
                <Text>Didn't receive one ?</Text>
                <Text className="text-pri-5 font-bold" onPress={send}>
                    Send again
                </Text>
            </View>
            <View className="flex items-center flex-row gap-2 mt-4">
                <Text>Not your phone number ?</Text>
                <Link to="/signup" onPress={() => setUser(null)}>
                    <Text className="text-pri-5 font-bold">Sign up again</Text>
                </Link>
            </View>
        </>
    );
};

export default Confirm;
