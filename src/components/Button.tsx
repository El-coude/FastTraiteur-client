import { useState } from "react";
import { Text, Pressable, ButtonProps, Animated } from "react-native";

type CustomButtonProps = ButtonProps & {
    style?: string;
    titleStyle?: string;
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
            className={`w-full rounded-lg px-2 py-3 transition ${props.style} ${
                pressed ? "scale-90" : ""
            }`}>
            <Pressable
                className=""
                onPress={(e) => {
                    props.onPress && props.onPress(e);
                }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                <Text
                    className={`text-center text-white font-bold ${props.titleStyle}`}>
                    {props.title}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

export const PrimaryButton = (props: CustomButtonProps) => {
    return <Button {...props} style={`bg-pri-4 ${props.style}`} />;
};
