import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "animate.css";

import "./App.css";
import ProtectedRoute from "routes/ProtectedRoute";
import AdminRoute from "routes/AdminRoute";
import Navigation from "components/Navigation";
import Footer from "components/Footer";
import PreLoader from "components/PreLoader";

const NotFound = lazy(() => import("pages/NotFound"));
const Home = lazy(() => import("pages/Home"));
// const About = lazy(() => import("pages/About"));
// const Services = lazy(() => import("pages/Services"));
const Login = lazy(() => import("pages/Login"));
const Signup = lazy(() => import("pages/Register"));
const ForgotPassword = lazy(() => import("pages/ForgotPassword"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));
const Cart = lazy(() => import("pages/Cart"));
const ItemDetail = lazy(() => import("pages/Detail"));
const Delivery = lazy(() => import("pages/DeliveryInfo"));
const CheckoutSuccess = lazy(() => import("pages/CheckoutSuccess"));
const Order = lazy(() => import("pages/Order"));
const Shop = lazy(() => import("pages/Shop"));
const Invoice = lazy(() => import("pages/Invoice"));
const OrderHistory = lazy(() => import("pages/OrderHistory"));
const Profile = lazy(() => import("pages/Profile"));
// Admin Panel
const AdminDashboard = lazy(() => import("pages/Dashboard"));
const AdminItemList = lazy(() => import("pages/ItemList"));
const AdminItemEdit = lazy(() => import("pages/ItemEdit"));
const AdminOrderList = lazy(() => import("pages/OrderList"));
const AdminUserList = lazy(() => import("pages/UserList"));
const AdminUploadItem = lazy(() => import("pages/UploadItem"));

const App = () => {

    const [preloader, setPreloader] = useState(true);
    const [timer, setTimer] = useState(2);

    const id = useRef(null);

    const clear = () => {
        window.clearInterval(id.current);
        setPreloader(false);
    };

    useEffect(() => {
        id.current = window.setInterval(() => {
        setTimer((timer) => timer - 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (timer === 0) {
        clear();
        }
    }, [timer]);

    return (
        <>
        {preloader ? (
            <PreLoader />
        ) : (
            <div className="flex flex-col justify-between h-screen animate__animated animate__fadeIn animate__slow">
                <Router>
                    <Suspense fallback={
                        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <Box sx={{ display: "flex" }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    }>
                    <main>
                        <Navigation />
                        <Routes>
                            <Route path='*' element={<NotFound />} />
                            <Route path="/" element={<Home />} />
                            {/* <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} /> */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/forgetpassword" element={<ForgotPassword />} />
                            <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/item/:id" element={<ItemDetail />} />
                            <Route path="/delivery" element={<Delivery />} />
                            <Route path="/checkout-success" element={<CheckoutSuccess />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/order/:id" element={
                                <ProtectedRoute>
                                    <Invoice />
                                </ProtectedRoute>
                            } />
                            <Route path="/orderhistory" element={
                                <ProtectedRoute>
                                    <OrderHistory />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            {/* Admin */}
                            <Route path="/admin-dashboard" element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            } />
                            <Route path="/items-list" element={
                                <AdminRoute>
                                    <AdminItemList />
                                </AdminRoute>
                            } />
                            <Route path="/edit-item/:id" element={
                                <AdminRoute>
                                    <AdminItemEdit />
                                </AdminRoute>
                            } />
                            <Route path="/orders-list" element={
                                <AdminRoute>
                                    <AdminOrderList />
                                </AdminRoute>
                            } />
                            <Route path="/users-list" element={
                                <AdminRoute>
                                    <AdminUserList />
                                </AdminRoute>
                            } />
                            <Route path="/upload-item" element={
                                <AdminRoute>
                                    <AdminUploadItem />
                                </AdminRoute>
                            } />
                        </Routes>
                    </main>
                    <div>
                        <Footer />
                    </div>
                    </Suspense>
                </Router>
            </div>
        )}
        </>
    );
};

export default App;
