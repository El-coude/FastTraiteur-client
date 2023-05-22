import React, { useEffect } from "react";
import usePageStore from "../../stores/PageTitle";
import Meals from "./Meals";

const Home = () => {
    const { setTitle } = usePageStore((state) => state);
    useEffect(() => {
        setTitle("Dashboard");
    }, []);
    return (
        <>
            <Meals />
        </>
    );
};

export default Home;
