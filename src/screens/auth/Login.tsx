import { Text, View } from "react-native";
import { Link } from "react-router-native";
import useAuthStore from "../../stores/AuthStore";
import { PrimaryButton } from "../../components/Button";
import Input from "../../components/Input";
import { useForm, FieldValues } from "react-hook-form";
import { validatePassword } from "../../utils/Validators";

export type LoginInfo = {
    user: string;
    password: string;
};
const Login = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const { setUser } = useAuthStore((state) => state);
    const login = async (values: FieldValues) => {
        try {
            setUser({
                user: values.user,
                password: values.password,
            });
            /* const res = await fetch("", {
                method: "Post",
                body: JSON.stringify(info),
            }); */
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
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
