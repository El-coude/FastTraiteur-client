import React, { useEffect } from "react";
import usePageStore from "../../stores/PageTitle";
import Meals from "./Meals";
import Categories from "./Categories";
import Search from "./Search";
import { View } from "react-native";
import Filter from "./Filter";

const Home = () => {
    const { setTitle } = usePageStore((state) => state);
    useEffect(() => {
        setTitle("Dashboard");
    }, []);
    return (
        <>
            <View className="flex flex-row items-center justify-between mb-4">
                <View className="h-10 w-1/5 pt-4">
                    <Filter />
                </View>
                <View className="w-4/5 mr-1">
                    <Search />
                </View>
            </View>
            <Categories />
            <Meals />
        </>
    );
};

export default Home;
