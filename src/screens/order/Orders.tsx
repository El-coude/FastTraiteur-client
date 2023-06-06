import { FlatList, Text, View } from "react-native";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import useAuthStore from "../../stores/AuthStore";
import NavigateBack from "../../components/NavigateBack";
import { Link } from "react-router-native";
import { CartItem } from "src/stores/CartStore";

export type Order = {
    id: number;
    orderItems: CartItem[];
    price: number;
    address: string;
};
const Orders = () => {
    const { user } = useAuthStore((state) => state);
    const {
        result: orders,
        isLoading,
        error,
    } = useFetch<Order[]>("orders/clientOrders/" + user?.id);
    console.log(orders?.length);
    if (isLoading) return <Loading visible={isLoading} />;
    if (error) return <Text className="text-err-1">Failed to load orders</Text>;
    if (orders?.length == 0)
        return <Text className="">You have no orders </Text>;

    return (
        <>
            <NavigateBack />
            <View className="w-full h-screen py-10 px-6">
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <Item order={item} />}
                    numColumns={1}
                />
            </View>
        </>
    );
};

const Item = ({ order }: { order: Order }) => {
    return (
        <Link to={`/order/${order.id}`} underlayColor="#00000011">
            <View className="flex py-2 w-3/4 mx-auto shadow-lg mb-4">
                <Text className="text-xl">Order to {order.address}</Text>
                <Text className="text-xl">
                    Price <Text className="text-pri-4">{order.price}</Text>
                </Text>
            </View>
        </Link>
    );
};

export default Orders;
