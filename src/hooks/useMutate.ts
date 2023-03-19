import { useMutation } from "react-query";
import { API_URI } from "@env";

const useMutate = <BodyDataType, ResultDataType>(
    endPoint: string,
    onSuccess?: (res: any) => void,
    onFail?: (err: any) => void
) => {
    const {
        mutate,
        isLoading,
        error,
        data: result,
    } = useMutation<ResultDataType, any, BodyDataType>(
        async (data: BodyDataType) => {
            const res = await (
                await fetch(
                    `https://00bb-105-235-139-15.in.ngrok.io/${endPoint}`,
                    {
                        method: "post",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                )
            ).json();
            if (res.statusCode >= 400) {
                throw new Error(res.message);
            }
            return res;
        },
        {
            onSettled: (res) => {
                onSuccess && onSuccess(res);
            },
            onError: (err) => {
                onFail && onFail(err);
            },
        }
    );
    return { mutate, isLoading, error, result };
};

export default useMutate;
