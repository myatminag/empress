import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { POST_ITEM, UPLOAD_IMAGE } from "constants/api";

/* ----- reducer ----- */
const uploadItemReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_CREATE_ITEM":
            return {
                ...state,
                loadingCreate: true,
            };
        case "SUCCESS_CREATE_ITEM":
            return {
                ...state,
                loadingCreate: false,
            };
        case "FAIL_CREATE_ITEM":
            return {
                ...state,
                loadingCreate: false,
            };
        case "REQUEST_UPLOAD":
            return {
                ...state,
                loadingUpload: true,
                errorUpload: "",
            };
        case "SUCCESS_UPLOAD":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: "",
            };
        case "FAIL_UPLOAD":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload,
            };
        default:
            return state;
    }
};

const useUploadItem = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [modelName, setModelName] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [images, setImages] = useState([]);
    const [inStock, setInStock] = useState("");

    const [{ loadingCreate, loadingUpload }, dispatch] = useReducer(uploadItemReducer, {
        loading: true,
        error: "",
    });

    /* ----- post item ----- */
    const uploadItemHandler = async (e) => {
        e.preventDefault();

        const itemData = {
            name,
            modelName,
            brand,
            price,
            description,
            category,
            image,
            images,
            inStock,
        };

        try {
            dispatch({ type: "REQUEST_CREATE_ITEM" });

            await axios.post(`${POST_ITEM}`, itemData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            toast.success("Success Upload");
            dispatch({ type: "SUCCESS_CREATE_ITEM" });
            navigate("/items-list");
        } catch (error) {
            dispatch({ type: "FAIL_CREATE_ITEM" });
            console.log(error);
            navigate("*");
        }
    };

    /* ----- upload image ----- */
    const uploadImageHandler = async (e, multiImages) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            dispatch({ type: "REQUEST_UPLOAD" });

            const { data } = await axios.post(`${UPLOAD_IMAGE}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            dispatch({ type: "SUCCESS_UPLOAD" });
            if (multiImages) {
                setImages([...images, data.secure_url]);
            } else {
                setImage(data.secure_url);
            }
        } catch (error) {
            dispatch({ type: "FAIL_UPLOAD" });
            console.log(error);
            navigate("*");
        }
    };

    /* ----- delete image ----- */
    const deleteImageHandler = async (imageFile) => {
        setImages(images.filter((image) => image === imageFile));
    };

    return {
        name,
        setName,
        modelName,
        setModelName,
        brand,
        setBrand,
        price,
        setPrice,
        description,
        setDescription,
        category,
        setCategory,
        image,
        setImage,
        images,
        setImages,
        inStock,
        setInStock,
        loadingCreate,
        loadingUpload,
        uploadItemHandler,
        uploadImageHandler,
        deleteImageHandler,
    };
};

export default useUploadItem;
