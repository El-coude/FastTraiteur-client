import { useQuery } from "react-query";
import { API_URI } from "@env";

const useFetch = <ResultDataType>(endPoint: string) => {
    const {
        isLoading,
        error,
        refetch,
        data: result,
    } = useQuery<ResultDataType, any>(endPoint, async () => {
        console.log(`${API_URI}/${endPoint}`);
        const res = await (
            await fetch(`${"https://fasttraiteur.onrender.com"}/${endPoint}`, {
                method: "get",
                headers: {
                    "Content-type": "application/json",
                },
            })
        ).json();
        if (res.statusCode >= 400) {
            console.log(res);

            throw new Error(res.message);
        }
        console.log(res);
        return res;
    });
    return { isLoading, error, result, refetch };
};

export default useFetch;
