import { Text, View } from "react-native";
import { Link } from "react-router-native";
import useAuthStore, { UserType } from "../../stores/AuthStore";
import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import { useForm, FieldValues } from "react-hook-form";
import { validatePassword } from "../../utils/Validators";
import useMutate from "../../hooks/useMutate";

export type LoginInfo = {
    email: string;
    password: string;
};

const Login = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const { setUser } = useAuthStore((state) => state);
    const { mutate, isLoading, error } = useMutate<
        LoginInfo,
        Partial<UserType>
    >("auth/local/signin");

    const login = async (values: FieldValues) => {
        mutate(
            {
                email: values.user,
                password: values.password,
            },
            {
                onSuccess: (result) => {
                    console.log("res" + result);
                },
            }
        );
    };
    return (
        <>
            <Text className="text-err-1 text-start w-full my-4 font-bold">
                {error?.message + "!" || ""}
            </Text>
            <Input
                placeholder="Enter phone number"
                label="Phone number"
                control={control}
                inputMode="tel"
                {...register("user", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                })}
                className={`${errors.user ? "border-err-1 border-2" : ""}`}
            />
            <Input
                placeholder="Enter password"
                label="Password"
                control={control}
                secureTextEntry
                {...register("password", {
                    required: true,
                    validate: (val: string) => validatePassword(val),
                })}
                className={`${errors.password ? "border-err-1 border-2" : ""}`}
            />
            <PrimaryButton
                title="Login"
                style="my-4"
                onPress={handleSubmit(login)}
                loading={isLoading}
            />
            <PrimaryButton
                title="fill"
                style="my-4"
                onPress={() => {
                    setValue("user", "0669215342");
                    setValue("password", "17102001cH");
                }}
                loading={isLoading}
            />
            <View className="flex items-center flex-row gap-2 mt-4">
                <Text>Don't have an account ?</Text>
                <Link to="/signup" className="">
                    <Text className="text-pri-5 font-bold">Sign up</Text>
                </Link>
            </View>
        </>
    );
};

export default Login;
