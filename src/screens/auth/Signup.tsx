import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import React from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import useAuthStore, { UserType } from "../../stores/AuthStore";
import { useForm, FieldValues } from "react-hook-form";
import { validateCPassword, validatePassword } from "../../utils/Validators";
import useMutate from "../../hooks/useMutate";

export type SignInfo = {
    name: string;
    phone: string;
    password: string;
};

const Signup = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm();
    const { setUser } = useAuthStore((state) => state);
    const { mutate, isLoading, error } = useMutate<
        SignInfo,
        { client: UserType }
    >("clients/sign-up");

    const Sign = async (values: FieldValues) => {
        const { c_password, ...client } = values;
        mutate(client as SignInfo, {
            onSuccess: (result) => {
                console.log(result.client);
                setUser(result.client);
            },
        });
    };
    return (
        <View className="w-full">
            <Text className="text-err-1 text-start w-full my-4 font-bold">
                {error?.message || ""}
            </Text>
            <Input
                placeholder="Enter your name"
                label="Name"
                control={control}
                {...register("name", { required: true, minLength: 3 })}
                className={`${errors.name ? "border-err-1 border-2" : ""}`}
            />
            <Input
                placeholder="Enter your phone number"
                label="Phone number"
                inputMode="tel"
                control={control}
                {...register("phone", {
                    required: true,
                    minLength: 13,
                    maxLength: 13,
                    pattern: /\+213\d{9}/,
                })}
                className={`${errors.phone ? "border-err-1 border-2" : ""}`}
            />
            <Input
                placeholder="Enter a password"
                label="Password"
                secureTextEntry
                control={control}
                {...register("password", {
                    required: true,
                    validate: (val: string) => validatePassword(val),
                })}
                className={`${errors.password ? "border-err-1 border-2" : ""}`}
            />
            <Input
                placeholder="Confirm password"
                label="Confirm password"
                secureTextEntry
                control={control}
                {...register("c_password", {
                    required: true,
                    validate: (val: string) =>
                        validateCPassword(val, watch("password")),
                })}
                className={`${
                    errors.c_password ? "border-err-1 border-2" : ""
                }`}
            />

            <PrimaryButton
                title="Sign up"
                style="my-4"
                onPress={handleSubmit(Sign)}
                loading={isLoading}
            />
            <PrimaryButton
                title="fill"
                style="my-4"
                onPress={() => {
                    setValue("name", "Chaker");
                    setValue("phone", "+213669215342");
                    setValue("password", "17102001cH");
                    setValue("c_password", "17102001cH");
                }}
            />
            <View className="flex items-center flex-row gap-2 mt-4">
                <Text>Already have an account ?</Text>
                <Link to="/login" className="">
                    <Text className="text-pri-5 font-bold">Log in</Text>
                </Link>
            </View>
        </View>
    );
};

export default Signup;
