import { useEffect, useReducer, useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Context } from 'context/user-context';
import { GET_ITEM_DETAIL, POST_REVIEW } from 'constants/api';

/* ----- reducer ----- */
const itemDetailReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_FETCHING":
            return {
                ...state,
                loading: true,
            }
        case "SUCCESS_FETCHING":
            return {
                ...state,
                loading: false,
                item: action.payload
            }
        case "FAIL_FETCHING":
            return {
                ...state, 
                loading: false, 
                error: action.payload 
            } 
        case "REFRESH_ITEM":
            return {
                ...state,
                item: action.payload
            }
        case "REQUEST_REVIEW": 
            return {
                ...state,
                loadingReview: true
            }
        case "SUCCESS_REVIEW":
            return {
                ...state,
                loadingReview: false
            }
        case "FAIL_REVIEW":
            return {
                ...state,
                loadingReview: false
            }
        default: 
            return state; 
    };
};

const useDetail = () => {

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

                const res = await axios.get(`${GET_ITEM_DETAIL}/` + itemId);
                
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
            const { data } = await axios.get(`${GET_ITEM_DETAIL}/${item._id}`);

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
                `${POST_REVIEW}/${item._id}/reviews`, 
                { rating, comment, username: userInfo.user.username }, 
                { headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}}` } }
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
    
    return {
        reviewsRef,
        userInfo,
        rating, setRating,
        comment, setComment,
        color, setColor,
        loading,
        error,
        item,
        loadingReview,
        addToCartHandler,
        reviewSubmitHandler
    }
}

export default useDetail;