import {
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    View,
} from "react-native";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "react-router-native";

export type Meal = {
    id: number;
    name: string;
    images: {
        id: number;
        url: string;
    }[];
    description: string;
    price: string;
};
const Meals = () => {
    const {
        result: meals,
        isLoading,
        error,
        refetch,
    } = useFetch<Meal[]>("meals");

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = e.nativeEvent.contentOffset.y;
        if (scrollPosition === 0) {
            // Scrolled to the top
            console.log("Scrolled to the top");
            refetch();
        }
    };
    if (isLoading)
        return (
            <View className="m-auto">
                <Loading color="black" size={40} visible={isLoading} />
            </View>
        );
    if (error)
        return (
            <Text className="text-err-1 m-auto">⚠️ Failed to load meals</Text>
        );
    return (
        <FlatList
            onScroll={handleScroll}
            data={meals}
            renderItem={({ item }) => <Item {...item} />}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const Item = (props: Partial<Meal>) => {
    return (
        <Link
            to={`/meal/${props.id}`}
            state={props}
            className="max-w-[150px] rounded-2xl bg-slate-50 shadow-xl min-h-[300px] self-start flex flex-1 justify-start  mx-2 mb-4 pb-2">
            <>
                {!!props.images?.length && (
                    <Image
                        source={{
                            uri: props.images[0].url,
                        }}
                        style={{
                            width: "100%",
                            height: 125,
                        }}
                    />
                )}
                <Text
                    className="text-start px-2 text-2xl mt-1 leading-7"
                    style={{ fontFamily: "DM-Bold" }}>
                    {props.name}
                </Text>
                <Text
                    className="text-start text-xs px-2 "
                    style={{ fontFamily: "DM-Reg" }}>
                    {props.description}
                </Text>
                <View className="flex flex-row items-center justify-between px-2 mt-auto">
                    <Text className="font-bold text-start text-pri-5">
                        {props.price}.00da
                    </Text>
                    <View className="flex-1 justify-center items-center bg-pri-4 max-w-[32px] h-8 rounded-full">
                        <Ionicons
                            name="add"
                            size={24}
                            color={"white"}
                            className="text-center"
                        />
                    </View>
                </View>
            </>
        </Link>
    );
};

export default Meals;
