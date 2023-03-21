import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AnimationLottie } from 'utils/animation';
import { WebTitle, SubTitle, Waiting } from 'components'; 
import useOrderHistory from './Hook';

const OrderHistory = () => {

    const navigate = useNavigate();

    const { isLoading, error, data } = useOrderHistory();

    if (isLoading) return <Waiting />
    
    if (error) return navigate('*')

    return (
        <section className="px-3 py-6 lg:px-6"> 
            <WebTitle title={"Order History"} />
            <SubTitle name={"Order History"} />
            <div>
                {data.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <div className="w-[350px]">
                            <AnimationLottie />
                        </div>
                        <p className="text-secondaryDark">
                            No orders found!
                        </p>
                        <Link to='/shop'>
                            <p className="text-sm underline">
                                Click here to go shopping
                            </p>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-scroll scrollbar-none lg:overflow-hidden">
                        <table className="w-[900px] overflow-x-scroll mb-10 lg:w-[100%] border border-collapse border-spacing-2.5 table-auto">
                            <thead className="text-left">
                                <tr className="border">
                                    <th className="px-4 py-2">
                                        ID
                                    </th>
                                    <th>Order Date</th>
                                    <th>Total</th>
                                    <th>Paid At</th>
                                    <th>Delivered At</th>
                                    <th>Check</th>
                                </tr>
                            </thead>
                            {data.map((order) => (
                                <tbody>
                                    <tr key={order._id} className="border hover:bg-[#eaf4f4] transition-all duration-150">
                                        <td className="px-4 py-3">
                                            {order._id}
                                        </td>
                                        <td>
                                            {new Date(order.createdAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })}
                                        </td>
                                        <td>
                                            ${order.totalPrice}
                                        </td>
                                        <td>
                                            {order.isPaid ? new Date(order.paidAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" }) : 'NOT Paid'}
                                        </td>
                                        <td>
                                            {order.isDelivered ? new Date(order.deliveredAt).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" }) : 'NOT Deliver'}
                                        </td>
                                        <td>
                                            <button type="button" onClick={() => {navigate(`/order/${order._id}`)}}>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table> 
                    </div>
                )}
            </div>  
        </section>
    )
};

export default OrderHistory;