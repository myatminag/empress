import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TrashIcon from 'components/icons/TrashIcon';
import EditIcon from 'components/icons/EditIcon';
import useItemList from './hook';
import { WebTitle, SubTitle, Waiting } from 'components';

const AdminItemList = () => {

    const {
        navigate,
        loading,
        error,
        itemList,
        pages,
        page,
        loadingDelete,
        deleteItemHandler
    } = useItemList();

    return (
        <section className="px-3 py-6 lg:px-6">
            <ToastContainer position="bottom-center" limit={1} />
            <WebTitle title={"Item Lists"} />
            <SubTitle name={"Item Lists"} />
            {loading ? (
                <Waiting />
            ) : error ? (
                navigate('*')
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
                                                className=""
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteItemHandler(item)}    
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
                            <p className="text-center text-sm font-semibold">
                                Loading...
                            </p>
                        )}
                    </div>
                    {/* ----- pagination ----- */}
                    <div className="flex items-center gap-x-3">
                        {[...Array(pages).keys()].map((x) => (
                            <Link 
                                key={x + 1}
                                to={`/itemslist?page=${ x + 1 }`}
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
        </section>
    )
};

export default AdminItemList;