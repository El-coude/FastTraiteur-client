import { Button } from "react-native";
import { useNavigate } from "react-router-native";

const OnBoard = () => {
    const navigate = useNavigate();
    console.log("hi");

    return (
        <Button
            title={"Welcome to fasty"}
            onPress={() => {
                console.log("hi");
                navigate("/login");
            }}
        />
    );
};

export default OnBoard;
