import { useMutation } from "react-query";
import { API_URI } from "@env";

const useMutate = <BodyDataType, ResultDataType>(
    endPoint: string,
    options?: {
        onSuccess?: (res: any) => void;
        onFail?: (err: any) => void;
        method?: string;
    }
) => {
    const {
        mutate,
        isLoading,
        error,
        data: result,
    } = useMutation<ResultDataType, any, BodyDataType>(
        async (data: BodyDataType) => {
            console.log(`${API_URI}/${endPoint}`);
            const res = await (
                await fetch(
                    `${"https://cb12-105-235-139-250.ngrok-free.app"}/${endPoint}`,
                    {
                        method: options?.method || "post",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                )
            ).json();
            if (res.statusCode >= 400) {
                console.log(res);

                throw new Error(res.message);
            }
            console.log(res);
            return res;
        },
        {
            onSettled: (res) => {
                options?.onSuccess && options?.onSuccess(res);
            },
            onError: (err) => {
                options?.onFail && options?.onFail(err);
            },
        }
    );
    return { mutate, isLoading, error, result };
};

export default useMutate;
