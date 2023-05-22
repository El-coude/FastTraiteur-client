import { EvilIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Animated, Easing } from "react-native";

const Loading = ({
    visible,
    color,
    size,
}: {
    visible: boolean;
    color?: string;
    size?: number;
}) => {
    const spin = new Animated.Value(0);
    const animation = Animated.loop(
        Animated.timing(spin, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    );
    animation.start();

    const spinAnimation = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });
    return (
        <Animated.View style={{ transform: [{ rotate: spinAnimation }] }}>
            {visible && (
                <EvilIcons
                    name="spinner-3"
                    size={size || 18}
                    color={color || "white"}
                />
            )}
        </Animated.View>
    );
};

export default Loading;
