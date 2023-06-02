import React, { useEffect } from "react";
import usePageStore from "../../stores/PageTitle";
import Meals from "./Meals";
import Categories from "./Categories";

const Home = () => {
    const { setTitle } = usePageStore((state) => state);
    useEffect(() => {
        setTitle("Dashboard");
    }, []);
    return (
        <>
            {/*   <Categories /> */}
            <Meals />
        </>
    );
};

export default Home;
