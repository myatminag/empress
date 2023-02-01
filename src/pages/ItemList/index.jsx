import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { itemListReducer } from './reducer';
import { Context } from 'context/user-context';
import { Loading, WebTitle, SubTitle } from 'components';

const AdminItemList = () => {

    const navigate = useNavigate();

    const { state } = useContext(Context); 
    const { userInfo } = state;

    // ?page=1
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search); 

    const page = searchParams.get('page') || 1;

    // fetch item list from api
    const [{ loading, error, itemList, pages, loadingDelete, successDelete }, dispatch] = useReducer(itemListReducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchItemList = async () => { 
            try {
                dispatch({ type: "REQUEST_ITEM_LIST" });

                const { data } = await axios.get(
                    `https://empress-api.onrender.com/server/items/admin?page=${page}`, {
                        headers: { authorization: `Bearer ${userInfo.user.token}` }
                    }
                );

                dispatch({
                    type: "SUCCESS_ITEM_LIST",
                    payload: data
                });
            } catch (error) {
                dispatch({
                    type: "FAIL_ITEM_LIST",
                    payload: error.res && error.res.data.message 
                    ? error.res.data.message 
                    : error.message
                });
                console.log(error);
            }
        };
        if (successDelete) {
            dispatch({ type: "RESET_DELETE_ITEM" });
        } else {
            fetchItemList();
        }
    }, [userInfo, page, successDelete, navigate]);

    /** Delete Item */
    const deleteItemHandler = async (item) => {
        try {
            dispatch({ type: "REQUEST_DELETE_ITEM" });

            await axios.delete(
                `https://empress-api.onrender.com/server/items/item/${item._id}`, {
                    headers: { authorization: `Bearer ${userInfo.user.token}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_ITEM" });
            toast.success('Success Delete');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_ITEM" });
            navigate('*');
        }
    };

    return (
        <section className="px-3 py-6 lg:px-6">
            <ToastContainer position="bottom-center" limit={1} />
            <WebTitle title={"Item Lists"} />
            <SubTitle name={"Item Lists"} />
            {loading ? (
                <Loading />
            ) : error ? (
                navigate('*')
            ) : (
                <div className="overflow-x-scroll scrollbar-none lg:overflow-hidden">
                    <table className="w-[900px] overflow-x-scroll mb-10 lg:w-[100%] border border-collapse border-spacing-2.5 table-auto">
                        <thead className="text-left">
                            <tr className="border">
                                <th className="px-4 py-2">
                                    ID
                                </th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList.map((item) => (
                                <tr 
                                    key={item._id}
                                    className="border hover:bg-[#eaf4f4] transition-all duration-150"
                                > 
                                    <td className="px-4 py-3">
                                        {item._id}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        ${item.price}
                                    </td>
                                    <td>
                                        {item.category}
                                    </td>
                                    <td>
                                        {item.brand}
                                    </td>
                                    <td className="">
                                        <button 
                                            type="button"
                                            onClick={() => navigate(`/edit-item/${item._id}`)}
                                            className="px-3"
                                        >
                                            <FaRegEdit size={17} color="#4361ee" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteItemHandler(item)}    
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
                        <p className="text-center text-sm font-semibold">
                            Loading...
                        </p>
                    )}
                    <div className="flex items-center gap-x-3">
                        {[...Array(pages).keys()].map((x) => (
                            <Link 
                                key={x + 1}
                                to={`/itemslist?page=${ x + 1 }`}
                            >
                                <button 
                                    className={Number(page) === x + 1 ? "w-[30px] px-2 py-1 font-semibold rounded-md text-white bg-primaryDark" : "w-[30px] px-2 py-1 border border-primaryDark rounded-md"}
                                >
                                    {x + 1}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
};

export default AdminItemList;