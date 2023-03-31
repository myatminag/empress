import { useState, useReducer, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "constants/api";

/* ----- reducer ----- */
const ItemSearchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SEARCH_ITEM":
      return {
        ...state,
        loading: true,
      };
    case "SUCCESS_SEARCH_ITEM":
      return {
        ...state,
        items: action.payload.items,
        page: action.payload.page,
        pages: action.payload.pages,
        countItems: action.payload.countItems,
        loading: false,
      };
    case "FAIL_SEARCH_ITEM":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useShop = () => {
  const navigate = useNavigate();

  // search?category=laptops
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;
  const brand = searchParams.get("brand") || "all";

  /* ----- filtering ----- */
  const filteringURL = (filter) => {
    const filterPage = filter.page || page;
    const filterBrand = filter.brand || brand;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;

    return `/shop?brand=${filterBrand}&category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${sortOrder}&page=${filterPage}`;
  };

  const [{ loading, error, items, pages, countItems }, dispatch] = useReducer(
    ItemSearchReducer,
    {
      loading: true,
      error: "",
    }
  );

  useEffect(() => {
    const fetchSearchItem = async () => {
      try {
        dispatch({ type: "FETCH_SEARCH_ITEM" });

        const { data } = await axios.get(
          `${BASE_URL}/server/items/shop?brand=${brand}&category=${category}&query=${query}&price=${price}&order=${order}&page=${page}`
        );

        dispatch({
          type: "SUCCESS_SEARCH_ITEM",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FAIL_SEARCH_ITEM",
          payload:
            error.res && error.res.data.message
              ? error.res.data.message
              : error.message,
        });
        navigate("*");
      }
    };
    fetchSearchItem();
  }, [query, price, brand, category, page, order, error, navigate]);

  /* ----- categories ----- */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/server/items/categories`);
        setCategories(data);
      } catch (error) {
        navigate("*");
      }
    };
    fetchCategories();
  }, [navigate]);

  /* ----- brands ----- */
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/server/items/brands`);
        setBrands(data);
      } catch (error) {
        navigate("*");
      }
    };
    fetchBrands();
  }, [navigate]);

  return {
    navigate,
    filteringURL,
    loading,
    error,
    items,
    pages,
    page,
    countItems,
    category,
    categories,
    query,
    brand,
    brands,
    price,
    order,
  };
};

export default useShop;
