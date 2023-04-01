import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { EDIT_ITEM, UPDATE_ITEM, UPLOAD_IMAGE } from 'constants/api';

/* ----- reducer ----- */
const itemEditReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_ITEM_EDIT":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_ITEM_EDIT":
            return {
                ...state,
                loading: false
            }
        case "FAIL_ITEM_EDIT":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "REQUEST_ITEM_UPDATE":
            return {
                ...state,
                loadingUpdate: true
            }
        case "SUCCESS_ITEM_UPDATE":
            return {
                ...state,
                loadingUpdate: false
            }
        case "FAIL_UPDATE_ITEM":
            return {
                ...state,
                loadingUpdate: false
            }
        case "REQUEST_UPLOAD":
            return {
                ...state,
                loadingUpload: true,
                errorUpload:''
            }
        case "SUCCESS_UPLOAD":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: ''
            }
        case "FAIL_UPLOAD":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload
            }
        default: 
            return state;
    }
};

const useItemEdit = () => {

    const navigate = useNavigate();

    // item/:id
    const params = useParams();
    const { id: itemId } = params;

    const [name, setName] = useState('');
    const [modelName, setModelName] = useState('');
    const [brand, setBrand] = useState(''); 
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [inStock, setInStock] = useState('')

    // fetch item details from api
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] = useReducer(itemEditReducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchItemData = async () => {
            try {   
                dispatch({ type: "REQUEST_ITEM_EDIT" });

                const { data } = await axios.get(`${EDIT_ITEM}/${itemId}`);

                setName(data.name);
                setModelName(data.modelName);
                setBrand(data.brand);
                setPrice(data.price);
                setDescription(data.description);
                setCategory(data.category);
                setImage(data.image);
                setImages(data.images)
                setInStock(data.inStock);

                dispatch({ type: "SUCCESS_ITEM_EDIT" });
            } catch (error) {
                dispatch({ 
                    type: "FAIL_ITEM_EDIT",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
                navigate('*')
            }
        }
        fetchItemData();
    }, [itemId, navigate]);

    // update item 
    const updateItemHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: "REQUEST_ITEM_UPDATE" });

            await axios.put(
                `${UPDATE_ITEM}/${itemId}`, {
                    _id: itemId,
                    name, modelName, brand,
                    price, description, category, 
                    image, images, inStock
                }, {
                    headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
                }
            );

            dispatch({ type: "SUCCESS_ITEM_UPDATE" });
            toast.success('Success Update');
            navigate('/items-list');
        } catch (error) {
            dispatch({ type: "FAIL_UPDATE_ITEM" });
            console.log(error);
        }
    };

    // image upload
    const uploadImageHandler = async (e, multiImages) => { 
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            dispatch({ type: "REQUEST_UPLOAD" });

            const { data } = await axios.post(`${UPLOAD_IMAGE}`, formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });

            dispatch({ type: "SUCCESS_UPLOAD" });
            if (multiImages) {
                setImages([...images, data.secure_url]);
            } else {
                setImage(data.secure_url);
            };
        } catch (error) {
            dispatch({ type: "FAIL_UPLOAD" });
            console.log(error);
            navigate('*');
        }
    };

    // delete image
    const deleteImageHandler = async (imageFile) => {
        setImages(images.filter(image => image === imageFile))
    };

    return {
        navigate,
        itemId,
        name, setName,
        modelName, setModelName,
        brand, setBrand,
        price, setPrice,
        description, setDescription,
        category, setCategory,
        image, setImage,
        images,
        inStock, setInStock,
        loading,
        error,
        loadingUpdate,
        loadingUpload,
        updateItemHandler,
        uploadImageHandler,
        deleteImageHandler
    }
}

export default useItemEdit;