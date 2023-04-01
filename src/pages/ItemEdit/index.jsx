import React from 'react';

import TrashIcon from 'components/icons/TrashIcon';
import useItemEdit from './hook';
import { SubTitle, Editor, WebTitle, Loading, ErrorField } from 'components';

const AdminItemEdit = (props) => {

    const {
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
    } = useItemEdit();

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
                            {/* ----- item name ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Item Name
                                </label>
                                <input 
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- model name ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Model Name
                                </label>
                                <input 
                                    type="text" 
                                    value={modelName}
                                    required
                                    onChange={(e) => setModelName(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- brand ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]"> 
                                    Brand
                                </label>
                                <input 
                                    type="text" 
                                    value={brand}
                                    required
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- price ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Price
                                </label>
                                <input 
                                    type="number" 
                                    value={price}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- category ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Category
                                </label>
                                <input 
                                    type="text" 
                                    value={category}
                                    required
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- image ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Image
                                </label>
                                <input 
                                    type="text" 
                                    value={image}
                                    required
                                    onChange={(e) => setImage(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- upalod image ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Upload Image
                                </label>
                                <input 
                                    type="file" 
                                    required
                                    onChange={uploadImageHandler}
                                    className="input-form"
                                />
                                {loadingUpload && (
                                    <p className="font-semibold text-sm text-center">
                                        Loading...
                                    </p>
                                )}
                            </div>
                            {/* ----- inStock ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    In Stock
                                </label>
                                <input 
                                    type="number"  
                                    value={inStock}
                                    required
                                    onChange={(e) => setInStock(e.target.value)}
                                    className="input-form"
                                />
                            </div>
                            {/* ----- additional images ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Additional Images
                                </label>
                                {images.length === 0 && <ErrorField text={"No Images"} />}
                                <ul>
                                    {images.map(image => (
                                        <li>
                                            {image}
                                            <div onClick={deleteImageHandler}>
                                                <TrashIcon />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* ----- upload additional images ----- */}
                            <div className="mb-4 lg:col-span-1">
                                <label className="block mb-2 font-[500]">
                                    Upload Additional Images
                                </label>
                                <input 
                                    type="file" 
                                    required
                                    onChange={(e) => uploadImageHandler(e, true)}
                                    className="input-form"
                                />
                                {loadingUpload && (
                                    <p className="font-semibold text-sm text-center">
                                        Loading...
                                    </p>
                                )}
                            </div>
                            {/* ----- description ----- */}
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
                                className="secondary-btn "
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