import { FlatList, Image, Text, View } from "react-native";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "react-router-native";
import { useEffect } from "react";
import useFilterStore from "../../stores/MealFilter";
import useAuthStore from "../../stores/AuthStore";

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
    const { search, price, distance, category } = useFilterStore(
        (state) => state
    );
    const { user } = useAuthStore((state) => state);
    const {
        result: meals,
        isLoading,
        error,
        refetch,
    } = useFetch<Meal[]>(
        `meals/filter?userId=${user?.id}&name=${search}${
            price ? `&minPrice=${price.min}&maxPrice=${price.max}` : ""
        }&distanceRange=${distance}&categoryId=${category}`
    );
    useEffect(() => {
        console.log(meals);
        refetch();
    }, [category, search]);

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
    if (!meals?.length)
        return (
            <Text className="text-black text-xl m-auto">
                No meals are founded !
            </Text>
        );
    return (
        <FlatList
            id="meals"
            refreshing={false}
            onRefresh={async () => {
                await refetch();
            }}
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
            underlayColor="#ffffffff"
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
