import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import React from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import useAuthStore from "../../stores/AuthStore";
import { useForm, FieldValues } from "react-hook-form";
import { validateCPassword, validatePassword } from "../../utils/Validators";

const Signup = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const { setUser } = useAuthStore((state) => state);

    const Sign = async (values: FieldValues) => {
        setUser(values);
        /*  try {
            const res = await fetch("", {
                method: "Post",
                body: JSON.stringify(info),
            });
        } catch (error) {
            console.log(error);
        } */
    };
    return (
        <>
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
                    minLength: 10,
                    maxLength: 10,
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
            />
            <View className="flex items-center flex-row gap-2 mt-4">
                <Text>Already have an account ?</Text>
                <Link to="/login" className="">
                    <Text className="text-pri-5 font-bold">Log in</Text>
                </Link>
            </View>
        </>
    );
};

export default Signup;
