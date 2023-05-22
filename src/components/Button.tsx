import { ReactElement, useState } from "react";
import { Text, Pressable, ButtonProps, Animated, View } from "react-native";
import Loading from "./Loading";

type CustomButtonProps = ButtonProps & {
    style?: string;
    rounded?: boolean;

    titleStyle?: string;
    loading?: boolean;
    icon?: ReactElement;
};
export default function Button(props: CustomButtonProps) {
    const [pressed, setPressed] = useState(false);
    const animatedButtonScale = new Animated.Value(1);

    const onPressIn = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 100,
        }).start();
    };

    // When button is pressed out, animate the scale back to 1
    const onPressOut = () => {
        Animated.spring(animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 100,
        }).start();
    };
    // The animated style for scaling the button within the Animated.View
    const animatedScaleStyle = {
        transform: [{ scale: animatedButtonScale }],
    };

    return (
        <Animated.View
            style={[animatedScaleStyle]}
            className={`w-full px-2 py-3 transition ${
                props.rounded ? "rounded-full" : "rounded-lg"
            } ${props.style} ${pressed ? "scale-90" : ""}`}>
            <Pressable
                className=""
                onPress={(e) => {
                    props.onPress && props.onPress(e);
                }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                <View className="flex items-center flex-row w-fit m-auto ">
                    {props.title && (
                        <Text
                            className={`text-center text-white font-bold mx-4 ${props.titleStyle}`}>
                            {props.title}
                        </Text>
                    )}
                    {props.icon && !props.loading && props.icon}
                    <Loading visible={!!props.loading} />
                </View>
            </Pressable>
        </Animated.View>
    );
}

export const PrimaryButton = (props: CustomButtonProps) => {
    return <Button {...props} style={`bg-pri-4 ${props.style}`} />;
};

export const OutlineButton = (props: CustomButtonProps) => {
    return (
        <Button
            {...props}
            style={`bg-transparent border border-black ${props.style}`}
            titleStyle="text-black"
        />
    );
};

export const IconButton = (props: CustomButtonProps) => {
    return <Button {...props} style={`bg-transparent ${props.style}`} />;
};
