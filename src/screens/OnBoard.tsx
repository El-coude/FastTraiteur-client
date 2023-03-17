import { Button } from "react-native";
import { useNavigate } from "react-router-native";

const OnBoard = () => {
    const navigate = useNavigate();
    return (
        <Button title={"Welcome to fasty"} onPress={() => navigate("/login")} />
    );
};

export default OnBoard;
