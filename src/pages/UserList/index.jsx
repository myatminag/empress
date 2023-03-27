import React from 'react'
import {  Link  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import TrashIcon from 'components/icons/TrashIcon';
import useUserList from './hook';
import { AnimationLottie } from 'utils/animation';
import { WebTitle, SubTitle, Waiting } from 'components';

const AdminUserList = () => {

    const {
        navigate,
        loading,
        error,
        usersList,
        pages,
        page,
        loadingDelete,
        deleteUserHandler
    } = useUserList();

    return (
        <section className="px-3 py-6 lg:px-6">
            <ToastContainer position="bottom-center" limit={1} />
            <WebTitle title={"Users List"} />
            <SubTitle name={"Users List"} />
            {loading ? (
                <Waiting />
            ) : error ? (
                navigate('*')
            ) : (
                <div>
                    {!usersList ? (
                        <div className="flex flex-col items-center">
                            <div className="w-[350px]">
                                <AnimationLottie />
                            </div>
                            <p className="text-secondaryDark">
                                No users list found!
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-scroll scrollbar-none lg:overflow-hidden">
                            <table className="list-table"
                            >
                                <thead className="text-left">
                                    <tr className="border">
                                        <th className="px-4 py-2">
                                            ID
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map((user) => (
                                        <tr 
                                            key={user._id}
                                            className="border hover:bg-[#eaf4f4] transition-all duration-150"
                                        >
                                            <td className="px-4 py-3">
                                                {user._id}
                                            </td>
                                            <td>
                                                {user.username}
                                            </td>
                                            <td>
                                                {user.email}
                                            </td>
                                            <td>
                                                {user.isAdmin ? 'Admin' : 'User'}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    disabled={user.idAdmin === true}
                                                    onClick={() => deleteUserHandler(user)}    
                                                    className="px-3 pt-1"
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
                            {/* ----- pagination ----- */}
                            <div className="flex items-center gap-x-3">
                                {[...Array(pages).keys()].map((x) => (
                                    <Link 
                                        key={x + 1}
                                        to={`/userslist?page=${ x + 1 }`}
                                    >
                                        <button 
                                            className={Number(page) === x + 1 ? "active-pagination-btn" : "pagination-btn"}
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

export default AdminUserList;