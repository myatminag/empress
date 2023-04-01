import React from 'react';

import TrashIcon from 'components/icons/TrashIcon';
import useUploadItem from './hook';
import { SubTitle, Editor, WebTitle, ErrorField } from 'components';

const NewItem = () => {

    const {
        name, setName,
        modelName, setModelName,
        brand, setBrand,
        price, setPrice,
        description, setDescription,
        category, setCategory,
        image, setImage,
        images,
        inStock, setInStock,
        loadingCreate,
        loadingUpload,
        uploadItemHandler,
        uploadImageHandler,
        deleteImageHandler
    } = useUploadItem();

    return (
        <section className="px-3 py-6 lg:px-6">
            <WebTitle title={"Upload Item"} />
            <SubTitle name={"Upload Item"} />
            <form onSubmit={uploadItemHandler}>
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
                    {/* ----- item name ----- */}
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
                            className="input-form"
                        />
                    </div>
                    {/* ----- model name ----- */}
                    <div className="mb-4">
                        <label className="block mb-2 font-[500]">
                            Model Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="Model name"
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
                            placeholder="Brand"
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
                            placeholder="$"
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
                            placeholder="cateogry"
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
                            placeholder="Image"
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
                                    <button onClick={deleteImageHandler}>
                                        <TrashIcon  />
                                    </button>
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
                        disabled={loadingCreate}
                        className="secondary-btn "
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