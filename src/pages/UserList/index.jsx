import React, { useEffect, useReducer } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
 
import { userListReducer } from './reducer';
import { AnimationLottie } from 'utils/animation';
import { WebTitle, SubTitle, Waiting } from 'components';
import { BASE_URL } from 'constants/locationPathname';
import { accessToken } from 'utils/accessToken';

const AdminUserList = () => {

    const navigate = useNavigate();

    // ?page=1
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const page = searchParams.get('page') || 1;

    // fetch user list from api
    const [{ loading, error, usersList, pages, loadingDelete, successDelete }, dispatch] = useReducer(userListReducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                dispatch({ type: "REQUEST_USER_LIST" });
                const { data } = await axios.get(
                    `${BASE_URL}/server/user/userslist?page=${page}`, {
                        headers: { authorization: `Bearer ${accessToken}` }
                    }
                );

                dispatch({ 
                    type: "SUCCESS_USER_LIST", 
                    payload: data
                });
            } catch (error) {
                dispatch({ 
                    type: "FAIL_USER_LIST",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
                console.log(error); 
            }
        }

        if (successDelete) {
            dispatch({ type: "RESET_DELETE_USER" });
        } else {
            fetchUserList();
        }
    }, [accessToken, successDelete, page, navigate]);

   // delete user
    const deleteUserHandler = async (user) => {
        try {
            dispatch({ type: "REQUEST_DELETE_USER" });

            await axios.delete(
                `https://empress-api.onrender.com/server/user/userslist/${user._id}`, {
                    headers: { authorization: `Bearer ${accessToken}` }
                }
            );

            dispatch({ type: "SUCCESS_DELETE_USER" });
            toast.success('Success Delete');
        } catch (error) {
            dispatch({ type: "FAIL_DELETE_USER" });
            console.log(error);
            navigate('*');
        }
    };

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
                    {usersList.length === 0 ? (
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
                            <table className="w-[900px] overflow-x-scroll mb-10 lg:w-[100%] border border-collapse border-spacing-2.5 table-auto">
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
                                        to={`/userslist?page=${ x + 1 }`}
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

export default AdminUserList;