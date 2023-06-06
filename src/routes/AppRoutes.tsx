import { Route, Routes } from "react-router-native";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard, {
    NoNavBarDashboard,
    WithNavBarDashboard,
} from "../layouts/Dashboard";
import Confirm from "../screens/auth/Confirm";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import OnBoard from "../screens/OnBoard";
import Profile from "../screens/profile/Profile";
import Home from "../screens/home/Home";
import Meal from "../screens/home/Meal";
import Cart from "../screens/cart/Cart";
import OrderTrack from "../screens/order/OrderTrack";
import Orders from "../screens/order/Orders";
import OrderConfirmation from "../screens/order/OrderConfirmation";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthLayout>
                        <OnBoard />
                    </AuthLayout>
                }
            />
            <Route
                path="/login"
                element={
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                }
            />
            <Route
                path="/signup"
                element={
                    <AuthLayout>
                        <Signup />
                    </AuthLayout>
                }
            />
            <Route path="/confirm-sms" element={<Confirm />} />
            <Route
                path="/profile"
                element={
                    <Dashboard>
                        <Profile />
                    </Dashboard>
                }
            />
            <Route
                path="/dashboard/profile"
                element={
                    <WithNavBarDashboard>
                        <Profile />
                    </WithNavBarDashboard>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <WithNavBarDashboard>
                        <Home />
                    </WithNavBarDashboard>
                }
            />
            <Route
                path="/meal/:id"
                element={
                    <NoNavBarDashboard>
                        <Meal />
                    </NoNavBarDashboard>
                }
            />
            <Route
                path="/cart"
                element={
                    <WithNavBarDashboard>
                        <Cart />
                    </WithNavBarDashboard>
                }
            />
            <Route path="/order-confirm" element={<OrderConfirmation />} />
            <Route
                path="/orders"
                element={
                    <WithNavBarDashboard>
                        <Orders />
                    </WithNavBarDashboard>
                }
            />
            <Route
                path="/order/:id"
                element={
                    <WithNavBarDashboard>
                        <OrderTrack />
                    </WithNavBarDashboard>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
