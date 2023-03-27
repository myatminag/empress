import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useShop from './hook';
import { prices } from 'utils/data';
import { Card, Loading, WebTitle } from 'components';

const Shop = () => {

    const {
        navigate,
        filteringURL,
        loading,
        error,
        items,
        pages,
        page,
        countItems,
        category, categories,
        query,
        brand, brands,
        price,
        order
    } = useShop();

    return (
        <section className="px-3 py-6 lg:px-6 lg:mb-16 lg:grid lg:grid-cols-5 lg:gap-x-3">
            <WebTitle title={"Shop"} />
            <div className="lg:col-span-1">
                <div className="border rounded-md px-3 py-4 mb-4">
                    {/* ----- brands ----- */}
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
                    {/* ----- categories ----- */}
                    <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Categories</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Link to={filteringURL({ category: 'all' })}>
                                <div className="flex items-center gap-x-2 mb-2">
                                    <input 
                                        type="radio"
                                        checked={category === 'all'}
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
                    {/* ----- price ----- */}
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
                <div className="mb-5 lg:mb-3 lg:px-4 lg:py-2 lg:bg-white lg:rounded-md lg:border lg:flex lg:justify-between 
                    lg:items-center"
                >
                    {/* ----- show results ----- */}
                    <div className="px-3 py-4 mb-3 bg-white rounded-md shadow-CustomShadow flex items-center lg:p-0 lg:m-0 
                        lg:bg-none lg:rounded-none lg:shadow-none"
                    >
                        <p>
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
                    {/* ----- sorting ----- */}
                    <div className="px-3 py-4 bg-white rounded-md shadow-CustomShadow lg:p-0 lg:bg-none lg:rounded-none 
                        lg:shadow-none lg:flex lg:items-center"
                    >
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
                        {/* ----- pagination ----- */}
                        <div className="flex items-center gap-x-3">
                            {[...Array(pages).keys()].map((x) => (
                                <Link 
                                    key={x + 1}
                                    to={filteringURL({ page: x + 1 })}
                                >
                                    <button 
                                        className={Number(page) === x + 1 ? "active-pagination-btn" : "pagination-btn"}
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