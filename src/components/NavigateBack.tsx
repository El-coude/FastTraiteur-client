import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";

const NavigateBack = ({ path }: { path?: string }) => {
    const navigate = useNavigate();
    return (
        <View
            className="flex-1 justify-center items-center bg-transparent border border-black w-8 h-8 rounded-xl absolute top-0 left-4 z-50"
            onTouchStart={() => {
                if (path) {
                    navigate(path);
                }
            }}>
            <Ionicons name="chevron-back" size={24} color="black" />
        </View>
    );
};

export default NavigateBack;
