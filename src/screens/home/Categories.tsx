import { View, FlatList, Text } from "react-native";
import useFetch from "../../hooks/useFetch";
import uid from "react-native-uuid";
import useFilterStore from "../../stores/MealFilter";

export type Category = {
    id: number;
    name: string;
};

const Categories = () => {
    const { result } = useFetch<Category[]>("category");
    return (
        <FlatList
            id="categories"
            data={result}
            renderItem={(item) => <Item {...item} />}
            keyExtractor={(item) => uid.v4() as string}
            horizontal
        />
    );
};

const Item = ({ item }: { item: Category }) => {
    const { category, setCategory } = useFilterStore((state) => state);

    return (
        <View
            className={`rounded-full bg-slate-200 my-4 mr-1 px-10 py-3 ${
                category === item.id.toString() ? "bg-pri-4 " : "bg-slate-100"
            }`}
            onTouchStart={() =>
                setCategory(
                    category === item.id.toString() ? "all" : item.id.toString()
                )
            }>
            <Text
                className={`text-lg ${
                    category === item.id.toString() ? "text-white " : ""
                }`}
                style={{ fontFamily: "DM-Bold" }}>
                {item.name}
            </Text>
        </View>
    );
};
export default Categories;
