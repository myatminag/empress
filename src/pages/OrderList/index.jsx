import React, { useEffect, useReducer } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import axios from 'axios';

import { orderListReducer } from './reducer';
import { AnimationLottie } from 'utils/animation';
import { WebTitle, SubTitle, Waiting} from 'components';
import { baseUrl } from 'utils/baseUrl';
import { accessToken } from 'utils/token';

const AdminOrderList = () => {

    const navigate = useNavigate();

    // ?page=1
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const page = searchParams.get('page') || 1;

    // fetch order list from api
    const [{ loading, error, ordersList, pages, loadingDelete, successDelete }, dispatch] = useReducer(orderListReducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                dispatch({ type: "REQUEST_ORDER_LIST" });

                const { data } = await axios.get(
                    `${baseUrl}/server/orders/admin?page=${page}`, {
                        headers: { authorization: `Bearer ${accessToken}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_ORDER_LIST",
                    payload: data
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_ORDER_LIST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
                console.log(error);
            }
        }
        if (successDelete) {
            dispatch({ type: "RESET_DELETE" })
        } else {
            fetchOrderList();
        }
    }, [accessToken, page, successDelete, navigate]);

    // delete order
    const deleteOrderHandler = async (order) => {
        try {
            dispatch({ type: "REQUEST_DELETE_ORDER" });

            await axios.delete(
                `${baseUrl}/server/orders/order/${order._id}`, {
                    headers: { authorization: `Bearer ${accessToken}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_ORDER" });
            toast.success('Success Deleted');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_ORDER" });
            console.log(error);
            navigate('*')
        }
    };

    return (
        <section className="px-3 py-6 lg:px-6">
            <ToastContainer position="bottom-center" limit={1} />
            <WebTitle title={"Orders List"} />
            <SubTitle name={"Orders List"} />
            {loading ? (
                <Waiting />
            ) : error ? (
                navigate('*')
            ) : (
                <div>
                    {ordersList.length === 0 ? (
                        <div className="flex flex-col items-center">
                            <div className="w-[350px]">
                                <AnimationLottie />
                            </div>
                            <p className="text-secondaryDark">
                                No orders list found!
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-scroll scrollbar-none lg:overflow-hidden">
                            <table className="w-[900px] overflow-x-scroll mb-10 lg:w-[100%] border border-collapse border-spacing-2.5 table-auto">
                                <thead className="text-left">
                                    <tr className="border">
                                        <th className="px-4 py-2">
                                            ID
                                        </th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Deliver</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersList.map((order) => (
                                        <tr 
                                            key={order._id}
                                            className="border hover:bg-[#eaf4f4] transition-all duration-150"
                                        >
                                            <td className="px-4 py-3">
                                                {order._id}
                                            </td>
                                            <td>
                                                {order.user ? order.user._id : 'DELETE USER'}
                                            </td>
                                            <td>
                                                {new Date(order.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })}
                                            </td>
                                            <td>
                                                ${order.totalPrice.toFixed(2)}
                                            </td>
                                            <td>
                                                {order.isPaid ? new Date(order.paidAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" }) : 'NOT Paid'}
                                            </td>
                                            <td>
                                                {order.isDelivered ? new Date(order.deliveredAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" }) : 'NOT Deliver'}
                                            </td>
                                            <td className="">
                                                <button 
                                                    type="button"
                                                    onClick={() => navigate(`/order/${order._id}`)}
                                                    className=""
                                                >
                                                    <FaRegEdit size={17} color="#4361ee" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteOrderHandler(order)}    
                                                    className="px-3"
                                                >
                                                    <FaTrashAlt size={17} color="#ef233c" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {loadingDelete && (
                                <p className="text-sm font-semibold text-center">
                                    Loading...
                                </p>
                            )}
                            <div className="flex items-center gap-x-3">
                                {[...Array(pages).keys()].map((x) => (
                                    <Link 
                                        key={x + 1}
                                        to={`/orderslist?page=${ x + 1 }`}
                                    >
                                        <button 
                                            className={Number(page) === x + 1 ? "w-[30px] px-2 py-1 font-semibold rounded-md text-white bg-primaryDark" : "w-[30px] px-2 py-1 shadow-CustomShadow rounded-md"}
                                        >
                                            {x + 1}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
};

export default AdminOrderList;