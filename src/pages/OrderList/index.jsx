import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TrashIcon from 'components/icons/TrashIcon';
import EditIcon from 'components/icons/EditIcon';
import useOrderList from './hook';
import { AnimationLottie } from 'utils/animation';
import { WebTitle, SubTitle, Waiting} from 'components';

const AdminOrderList = () => {

    const {
        navigate,
        loading,
        error,
        ordersList,
        pages,
        page,
        loadingDelete,
        deleteOrderHandler
    } = useOrderList();

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
                        <>
                            {/* ----- data table ----- */}
                            <div className="overflow-x-scroll scrollbar-none lg:overflow-hidden">
                                <table className="list-table">
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
                                                        <EditIcon />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteOrderHandler(order)}    
                                                        className="px-3"
                                                    >
                                                        <TrashIcon />
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
                            </div>
                            {/* ----- pagination ----- */}
                            <div className="flex items-center gap-x-3">
                                {[...Array(pages).keys()].map((x) => (
                                    <Link 
                                        key={x + 1}
                                        to={`/orderslist?page=${ x + 1 }`}
                                    >
                                        <button 
                                            className={Number(page) === x + 1 ? "active-pagination-btn" : "pagination-btn"}
                                        >
                                            {x + 1}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </section>
    )
};

export default AdminOrderList;