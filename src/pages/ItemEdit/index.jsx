import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

import { itemEditReducer } from './reducer';
import { SubTitle, Editor, WebTitle, Loading, ErrorField } from 'components';
import { baseUrl } from 'utils/baseUrl';

const AdminItemEdit = (props) => {

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

                const { data } = await axios.get(
                    `${baseUrl}/server/items/item/${itemId}`
                );

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
                `${baseUrl}/server/items/item/${itemId}`, {
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

    /** Image Upload */
    const uploadImageHandler = async (e, multiImages) => { 
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            dispatch({ type: "REQUEST_UPLOAD" });

            const { data } = await axios.post(
                `${baseUrl}/server/upload`, formData, { 
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
            <WebTitle title={`Edit Item: ${itemId}`} />
            <SubTitle name={`Item: ${itemId}`} />
            {loading ? (
                <Loading />
            ) : error ? (
                navigate('*')
            ) : (
                <div>
                    <form onSubmit={updateItemHandler}>
                        <div className="lg:grid lg:grid-cols-4 lg:gap-x-5">
                            <div className="mb-4">
                                <label className="block mb-2 font-[500]">
                                    Name
                                </label>
                                <input 
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-[500]">
                                    Model Name
                                </label>
                                <input 
                                    type="text" 
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
                                    className="w-[100%] px-4 py-2 rounded-md border text-sm focus:outline-none"
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
                                    required
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
                                disabled={loadingUpdate}
                                className="px-4 py-1 mb-4 text-sm text-white bg-primaryDark border border-primaryDark hover:text-primaryDark hover:bg-white transition duration-200"
                            >
                                Update
                            </button>
                        </div>
                        {loadingUpdate && <p>Loading</p>}
                    </form>
                </div>
            )}
        </section>
    )
};

export default AdminItemEdit;