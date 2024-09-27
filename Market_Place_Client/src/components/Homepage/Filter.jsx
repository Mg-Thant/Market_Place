import React, { useState } from "react";
import { getProductsByFilter } from "../../apicalls/public";
import { message } from "antd";
import { useDispatch } from "react-redux";

import { setLoading } from "../../store/slices/userSlice";

const Filter = ({
  setProducts,
  getAllProduct,
  getSearchValue,
  setSuccess,
  setShowPagination,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  const Category = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronic_and_gadgets",
      label: "Electronic and Gadgets",
    },
    {
      value: "home_and_furnitures",
      label: "Home and Furnitures",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "books_and_media",
      label: "Books and Media",
    },
    {
      value: "sports_and_fitness",
      label: "Sports and Fitness",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
  ];

  const productsFilter = async (index) => {
    setShowPagination(false);
    dispatch(setLoading(true));
    setSelectedCategory(index);
    const res = await getProductsByFilter("category", Category[index].value);
    if (res.isSuccess) {
      setProducts(res.products);
      setSuccess(true);
    } else {
      setProducts(res.products);
      setSuccess(false);
    }
    dispatch(setLoading(false));
  };

  const clearHandler = () => {
    setSelectedCategory("");
    setShowPagination(true);
    getAllProduct();
  };

  return (
    <div className="flex items-center flex-wrap gap-2 my-8 max-w-4xl mx-auto justify-center">
      {Category.map((category, index) => (
        <p
          key={category.value}
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-blue-600 ${
            index === selectedCategory && "border-dashed"
          }`}
          onClick={() => {
            productsFilter(index);
            getSearchValue(
              Category[index].value.toUpperCase().replaceAll("_", " ")
            );
          }}
        >
          {category.label}
        </p>
      ))}
      {selectedCategory !== "" && (
        <button
          type="button"
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-white bg-blue-600 `}
          onClick={clearHandler}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Filter;
