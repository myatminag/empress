import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

import { ItemSearchReducer } from 'pages/Shop/reducer';
import { prices } from 'utils/data';
import { Card, Loading, WebTitle } from 'components';

const Shop = () => {

    const navigate = useNavigate(); 

    // search?category=laptops
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const category = searchParams.get('category') || 'all';
    const query = searchParams.get('query') || 'all';
    const price = searchParams.get('price') || 'all';
    const order = searchParams.get('order') || 'newest';
    const page  = searchParams.get('page') || 1;
    const brand = searchParams.get('brand') || 'all';

    // filtering URL
    const filteringURL = (filter) => {
        const filterPage = filter.page || page;
        const filterBrand = filter.brand || brand;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;

        return `/shop?brand=${filterBrand}&category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`;
    };

    // fetch items from api
    const [{ loading, error, items, pages, countItems }, dispatch] = useReducer(ItemSearchReducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchSearchItem = async () => {
            try {
                dispatch({ type: "FETCH_SEARCH_ITEM" });

                const { data } = await axios.get(
                    `https://empress-api.onrender.com/server/items/shop?brand=${brand}&category=${category}&query=${query}&price=${price}&order=${order}&page=${page}`
                );

                dispatch({
                    type: "SUCCESS_SEARCH_ITEM", 
                    payload: data
                })
            } catch (error) {
                dispatch({
                    type: "FAIL_SEARCH_ITEM",
                    payload: error.res && error.res.data.message 
                        ? error.res.data.message 
                        : error.message
                });
                navigate('*');
            }
        };
        fetchSearchItem();
    }, [query, price, brand, category, page, order, error, navigate]);

    // fetch categories from api
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(
                    'https://empress-api.onrender.com/server/items/categories'
                );
                setCategories(data);
            } catch (error) {
                navigate('*');
            }
        };
        fetchCategories();
    }, [navigate]);

    // fetch brands
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get(
                    'https://empress-api.onrender.com/server/items/brands'
                );
                setBrands(data);
            } catch (error) {
                navigate('*');
            }
        };
        fetchBrands();
    }, [navigate]);

    return (
        <section className="px-3 py-6 lg:px-6 lg:mb-16 lg:grid lg:grid-cols-5 lg:gap-x-3">
            <WebTitle title={"Shop"} />
            <div className="lg:col-span-1">
                <div className="border rounded-md px-3 py-4 mb-4">
                    <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Brands</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link to={filteringURL({ brand: 'all' })}>
                                <div className="flex items-center gap-x-2 mb-2">
                                    <input 
                                        type="radio"
                                        checked={brand === 'all'}
                                        className="cursor-pointer"
                                    />
                                    <label>
                                        All
                                    </label>
                                </div>
                            </Link>
                            {brands.map((b) => (
                                <Link key={b} to={filteringURL({ brand: b })}>
                                    <div className="flex items-center gap-x-2 mb-2">
                                        <input 
                                            type="radio"
                                            value={b}
                                            checked={b === brand}
                                            className="cursor-pointer"
                                        />
                                        <label>
                                            {b}
                                        </label>
                                    </div>
                                </Link>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Categories</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link to={filteringURL({ brand: 'all' })}>
                                <div className="flex items-center gap-x-2 mb-2">
                                    <input 
                                        type="radio"
                                        checked={brand === 'all'}
                                        className="cursor-pointer"
                                    />
                                    <label>
                                        All
                                    </label>
                                </div>
                            </Link>
                            {categories.map((c) => (
                                <Link key={c} to={filteringURL({ category: c })}>
                                    <div className="flex items-center gap-x-2 mb-2">
                                        <input 
                                            type="radio"
                                            value={c}
                                            checked={c === category}
                                            className="cursor-pointer"
                                        />
                                        <label>
                                            {c}
                                        </label>
                                    </div>
                                </Link>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Price</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link to={filteringURL({ price: 'all' })}>
                                <div className="flex items-center gap-x-2 mb-2">
                                    <input 
                                        type="checkbox"
                                        checked={price === 'all'}
                                        className="cursor-pointer"
                                    />
                                    <label>
                                        All
                                    </label>
                                </div>
                            </Link>
                            {prices.map((p) => (
                                <Link key={p.value} to={filteringURL({ price: p.value })}>
                                    <div className="flex items-center gap-x-2 mb-2">
                                        <input 
                                            type="checkbox"
                                            value={p.value}
                                            checked={p.value === price}
                                            className="cursor-pointer"
                                        />
                                        <label>
                                            {p.name}
                                        </label>
                                    </div>
                                </Link>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className="w-[100%] lg:col-span-4">
                <div className="mb-5 lg:mb-3 lg:px-4 lg:py-2 lg:bg-white lg:rounded-md lg:border lg:flex lg:justify-between lg:items-center">
                    <div className="px-3 py-4 mb-3 bg-white rounded-md shadow-CustomShadow flex items-center lg:p-0 lg:m-0 lg:bg-none lg:rounded-none lg:shadow-none">
                        <p className="">
                            Showing Results of {countItems === 0 ? 'No' : countItems}
                        </p>
                        {query !== 'all' && ' : ' + query}
                        {brand !== 'all' && ' : ' + query}
                        {category !== 'all' && ' : ' + category}
                        {price !== 'all' && ' : Price ' + price}
                        {query !== 'all' || brand !== 'all' || category !== 'all' || price !== 'all' ? (
                            <button 
                                onClick={() => navigate('/shop')}
                                className="ml-3 px-2 py-1 border border-primaryDark rounded-md"
                            >
                                <MdOutlineCancel size={20}  />
                            </button>
                        ) : (
                            null
                        )}
                    </div>
                    <div className="px-3 py-4 bg-white rounded-md shadow-CustomShadow lg:p-0 lg:bg-none lg:rounded-none lg:shadow-none lg:flex lg:items-center">
                        <p className="text-center mb-1 lg:mb-0 lg:mr-3">
                            Sort by
                        </p>
                        <select 
                            value={order}
                            onChange={(e) => {navigate(filteringURL({ order: e.target.value }))}}
                            className="w-[100%] lg:w-auto border px-2 py-1 rounded-md focus:outline-none"
                        >
                            <option value="newest">New Arrivals</option>
                            <option value="lowest">Price: Low to High</option>
                            <option value="highest">Price: High to Low</option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p className="text-sm font-semibold text-center text-[#ef233c]"> 
                        {error}
                    </p>
                ) : (
                    <div className="">
                        {items.length === 0 && (
                            <p className="font-semibold text-center">
                                No Product Found!
                            </p>
                        )}
                        <div className="mb-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {items.map(item => <Card items={item} key={item._id} />)}
                        </div>
                        <div className="flex items-center gap-x-3">
                            {[...Array(pages).keys()].map((x) => (
                                <Link 
                                    key={x + 1}
                                    to={filteringURL({ page: x + 1 })}
                                >
                                    <button 
                                        className={Number(page) === x + 1 ? "w-[30px] px-2 py-1 font-semibold rounded-md text-white bg-primaryDark" : "w-[30px] px-2 py-1 border border-primaryDark rounded-md"}
                                    >
                                        {x + 1}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
};

export default Shop;