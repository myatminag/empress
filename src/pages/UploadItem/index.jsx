import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

import { Context } from 'context/user-context';
import { uploadItemReducer } from './reducer';
import { SubTitle, Editor, WebTitle, ErrorField } from 'components';

const NewItem = () => {

    const navigate = useNavigate();

    const { state } = useContext(Context);
    const { userInfo } = state;
     
    const [name, setName] = useState('');
    const [modelName, setModelName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [inStock, setInStock] = useState('');

    // post item to api
    const [{ loadingCreate, loadingUpload }, dispatch] = useReducer(uploadItemReducer, {
        loading: true,
        error: ''
    });

    const uploadItemHandler = async (e) => {
        e.preventDefault();
        const itemData = {
            name, modelName, brand, price,
            description, category, image, images, inStock
        }

        try {
            dispatch({ type: "REQUEST_CREATE_ITEM" });

            await axios.post(
                'https://empress-api.onrender.com/server/items/create', itemData, { 
                    headers: { authorization: `Bearer ${userInfo.user.token}` }
                }
            );

            toast.success('Success Upload');
            dispatch({ type: "SUCCESS_CREATE_ITEM" }); 
            navigate('/items-list');
        } catch (error) {
            dispatch({ type: "FAIL_CREATE_ITEM" });
            console.log(error);
            navigate('*');
        }
    };

    const uploadImageHandler = async (e, multiImages) => { 
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            dispatch({ type: "REQUEST_UPLOAD" });

            const { data } = await axios.post(
                'https://empress-api.onrender.com/server/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${userInfo.user.token}`,
                    }
                }
            );

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

    const deleteImageHandler = async (imageFile) => {
        setImages(images.filter(image => image === imageFile))
    };

    return (
        <section className="px-3 py-6 lg:px-6">
            <WebTitle title={"Upload Item"} />
            <SubTitle name={"Upload Item"} />
            <form onSubmit={uploadItemHandler}>
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Item Name
                        </label>
                        <input 
                            type="text"
                            placeholder="Item name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Model Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="Model name"
                            value={modelName}
                            required
                            onChange={(e) => setModelName(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Brand
                        </label>
                        <input 
                            type="text" 
                            placeholder="Brand"
                            value={brand}
                            required
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Price
                        </label>
                        <input 
                            type="number" 
                            placeholder="$"
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Category
                        </label>
                        <input 
                            type="text" 
                            placeholder="cateogry"
                            value={category}
                            required
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Image
                        </label>
                        <input 
                            type="text" 
                            placeholder="Image"
                            value={image}
                            required
                            onChange={(e) => setImage(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Upload Image
                        </label>
                        <input 
                            type="file" 
                            required
                            onChange={uploadImageHandler}
                            // className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                        {loadingUpload && (
                            <p className="font-semibold text-sm text-center">
                                Loading...
                            </p>
                        )}
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            In Stock
                        </label>
                        <input 
                            type="number" 
                            value={inStock}
                            required
                            onChange={(e) => setInStock(e.target.value)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Additional Images
                        </label>
                        {images.length === 0 && <ErrorField text={"No Images"} />}
                        <ul>
                            {images.map(image => (
                                <li>
                                    {image}
                                    <FaTrashAlt size={23} onClick={deleteImageHandler} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4 lg:col-span-1">
                        <label className="block mb-2 font-[500]">
                            Upload Additional Images
                        </label>
                        <input 
                            type="file" 
                            onChange={(e) => uploadImageHandler(e, true)}
                            className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                        />
                        {loadingUpload && (
                            <p className="font-semibold text-sm text-center">
                                Loading...
                            </p>
                        )}
                    </div>
                    <div className="mb-4 lg:col-span-4">
                        <label className="block mb-2 font-[500]">
                            Description
                        </label>
                        <Editor content={description} setContent={setDescription} />
                    </div>
                </div>
                <div className="w-[100%] flex items-end justify-end ">
                    <button 
                        type="submit"
                        disabled={loadingCreate}
                        className="px-4 py-1 mb-4 text-sm text-white bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                    >
                        Upload
                    </button>
                </div>
                {loadingCreate && <p>Loading</p>}
            </form>
        </section>
    )
};

export default NewItem;