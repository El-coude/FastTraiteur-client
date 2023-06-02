import { View, FlatList, Text, ScrollView } from "react-native";
import {} from "react-native-gesture-handler";

export type Category = {
    id: number;
    name: string;
};
const c: Category[] = [
    {
        id: 1,
        name: "pzii",
    },
    {
        id: 2,
        name: "pzazeii",
    },
    {
        id: 3,
        name: "pzazeii",
    },
    {
        id: 4,
        name: "pziazezaei",
    },
];

const Categories = () => {
    const Item = ({ item }: { item: Category }) => (
        <View className="roundedf-full bg-slate-200">
            <Text className="text-lg" style={{ fontFamily: "DM-Bold" }}>
                {item.name}
            </Text>
        </View>
    );

    return (
        <></>
        /*  <ScrollView horizontal>
            <View className="mt-10 flex flex-1 flex-row gap-4 items-center justify-center">
                {c.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </View>
        </ScrollView> */
    );
};

export default Categories;
