import React, { useEffect, useReducer, useContext, useRef, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import parse from 'html-react-parser';

import { Context } from 'context/user-context';
import { itemDetailReducer } from './reducer';
import { Rating, Loading, WebTitle, Description } from 'components';

const ItemDetail = () => {

    const navigate = useNavigate();

    let reviewsRef = useRef();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [color , setColor] = useState('');

    // item detail
    const location = useLocation();
    const itemId = location.pathname.split("/")[2];

    // fetch item details from api
    const [{ loading, error, item, loadingReview }, dispatch] = useReducer(itemDetailReducer, {
        loading: true,
        item: [],
        error: null
    });

    useEffect(() => {
        const fetchingDetails = async () => {
            try {
                dispatch({ type: 'REQUEST_FETCHING' });

                const res = await axios.get(
                    `https://empress-api.onrender.com/server/items/item/` + itemId
                );
                
                dispatch({
                    type: 'SUCCESS_FETCHING',
                    payload: res.data
                })

            } catch (error) {
                dispatch({
                    type: 'FAIL_FETCHING',
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
                navigate('*');
            }
        }
        fetchingDetails();
    }, [itemId, navigate]);

    // get cart and userInfo from context
    const { state, dispatch: cartDispatch } = useContext(Context);
    const { cart, userInfo } = state;

    // add to cart
    const addToCartHandler = async () => {
        try {
            const existingItem = cart.cartItems.find((x) => x._id === item._id);
            const quantity = existingItem ? existingItem.quantity + 1 : 1; 
            const { data } = await axios.get(
                `https://empress-api.onrender.com/server/items/item/${item._id}`
            );

            if (data.inStock < quantity) {
                window.alert('Out Of Stock');
                return;
            };
            
            cartDispatch({
                type: "ADD_TO_CART",
                payload: {
                    ...item,
                    quantity
                }
            })
        } catch (error) {
            navigate('*');
        };
    };

    // review 
    const reviewSubmitHandler = async (e) => {
        e.preventDefault();
        if (!comment || !rating) {
            toast.error('Please enter comment and rating');
        };

        try {
            dispatch({ type: "REQUEST_REVIEW" });

            const { data } = await axios.post(
                `http://localhost:4000/server/items/${item._id}/reviews`, 
                { rating, comment, username: userInfo.user.username }, 
                { headers: { authorization: `Bearer ${userInfo.user.token}` } }
            );

            console.log(data);
            
            dispatch({ type: "SUCCESS_REVIEW" });
            toast.success("Review Submitted");

            item.reviews.unshift(data.review);
            item.numberOfReviews = data.numberOfReviews;
            item.rating = data.rating;
                
            dispatch({ 
                type: "REFRESH_ITEM",
                payload: item
            });

            window.scrollTo({
                behavior: 'smooth',
                top: reviewsRef.current.offsetTop
            })
        } catch (error) {
            dispatch({ type: "FAIL_REVIEW" });
            navigate('*');
        }
    };

    return (
        <section className="px-3 py-6 lg:px-6">
            <WebTitle title={item.name} />
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="text-sm font-semibold text-center text-[#ef233c]">
                    {error}
                </p>
            ) : ( 
                <div className="">
                    <div className="grid lg:grid-cols-2">
                        <div>
                            <img 
                                src={color || item.image}
                                alt={item.name}
                                className="w-[50%] mb-12 mx-auto bg-secondaryWhite"
                            />
                            <div className="grid grid-cols-3 lg:grid-cols-4">
                                {[item.image, ...item.images].map(image => (
                                    <img 
                                        src={image}
                                        alt="images"
                                        onClick={() => setColor(image)}
                                        className=" p-3 mb-6 mx-auto bg-secondaryWhite"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="">
                            <Rating rating={item.rating} numberOfReviews={item.numberOfReviews} />
                            <header className="text-lg font-semibold">
                                {item.name}
                            </header>
                            <p className="mb-1">
                                <span className="">
                                    Brand: {" "}     
                                </span> 
                                {item.brand}
                            </p>
                            <p className="mb-1">
                                <span className="">
                                    Model: {" "}
                                </span> 
                                {item.modelName}
                            </p>
                            <p className="mb-3">
                                <span className="">
                                    Price: {" "}
                                </span> 
                                ${item.price}
                            </p>
                            {item.inStock > 0 ? (
                                <motion.button 
                                    onClick={addToCartHandler}
                                    whileTap={{ scale: 0.95 }}
                                    className="mb-3 px-4 py-2 text-white text-sm bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                                >
                                    Add To Cart
                                </motion.button>
                            ) : (
                                <button disabled className="">
                                    Out of stock
                                </button>
                            )}
                            <p className="font-semibold">
                                About This Item
                            </p>
                            <div>
                                {parse(item.description)}
                            </div>
                            <Description item={item} />
                        </div>
                    </div>
                    <hr className="my-6" />
                    <div className="lg:px-[20%]">
                        <div className="py-4 mb-5 overflow-y-scroll scrollbar-none lg:mb-0 lg:col-span-1">
                            {userInfo ? (
                                <form onSubmit={reviewSubmitHandler}>
                                    <p className="font-semibold mb-2">
                                        Write A Review
                                    </p>
                                    <div className="mb-3">
                                        <select
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            className="border px-2 py-1 focus:outline-none rounded-md"
                                        >
                                            <option value="">Rating</option>
                                            <option value="1">1- Poor</option>
                                            <option value="2">2- Fair</option>
                                            <option value="3">3- Good</option>
                                            <option value="4">4- Very good</option>
                                            <option value="5">5- Excellent</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block mb-2 font-[500]">
                                            Comment
                                        </label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Feedback"
                                            className="border px-3 py-1 w-[100%] h-[130px] rounded focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <button 
                                            type="submit"
                                            className="px-4 py-2 text-white text-sm bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                    {loadingReview && (
                                        <p className="text-center font-semibold text-sm">
                                            Loading...
                                        </p>
                                    )}
                                </form> 
                            ) : (
                                <div className="w-[100%] flex items-center justify-center gap-x-1 lg:mt-5">
                                    <p className="text-sm">
                                        Please Login to post a review
                                    </p>
                                    <Link to={`/login`}>
                                        <span className="font-semibold text-sm  underline">
                                            login
                                        </span>
                                    </Link>
                                </div>
                            )}
                            <hr className="my-6" />
                            <p ref={reviewsRef} className="font-semibold text-center text-lg mb-2">
                                Customer Reviews
                            </p>
                            {item.reviews.length === 0 && (
                                <p className="text-center">
                                    No reviews yet.
                                </p>
                            )}
                            <div>
                                {item.reviews.map((review) => (
                                    <div key={review._id} className="border px-4 py-2 mb-2 rounded-md">
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p className="font-semibold">
                                            {review.username}
                                        </p>
                                        <Rating rating={review.rating} caption=" " />
                                        <p>
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
};

export default ItemDetail;