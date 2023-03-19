import { useEffect, useState } from "react";
import {
    Text,
    Pressable,
    ButtonProps,
    Animated,
    View,
    Easing,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

type CustomButtonProps = ButtonProps & {
    style?: string;
    titleStyle?: string;
    loading?: boolean;
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

    const spin = new Animated.Value(0);
    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(spin, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        if (props.loading) {
            animation.start();
        } else {
            animation.stop();
        }
        return () => {
            animation.stop();
        };
    }, [props.loading]);
    const spinAnimation = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

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
                <View className="flex items-center flex-row w-fit m-auto ">
                    <Text
                        className={`text-center text-white font-bold mx-4 ${props.titleStyle}`}>
                        {props.title}
                    </Text>
                    <Animated.View
                        style={{ transform: [{ rotate: spinAnimation }] }}>
                        {props.loading && (
                            <EvilIcons
                                name="spinner-3"
                                size={18}
                                color="white"
                            />
                        )}
                    </Animated.View>
                </View>
            </Pressable>
        </Animated.View>
    );
}

export const PrimaryButton = (props: CustomButtonProps) => {
    return <Button {...props} style={`bg-pri-4 ${props.style}`} />;
};
