import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setLoading } from "../../store/slices/userSlice";
import { getProductsByFilter } from "../../apicalls/public";

const Hero = ({ setProducts, getAllProduct, getSearchValue, setSuccess, setShowPagination }) => {
  const [searchKey, setSearchKey] = useState("");
  const dispatch = useDispatch();

  const searchHandler = async () => {
    setShowPagination(false);
    if(searchKey.trim().length === 0) {
      return message.error("Search keyword must have!!!")
    }
    dispatch(setLoading(true));
    const res = await getProductsByFilter("searchKey", searchKey);
    if (res.isSuccess) {
      setProducts(res.products);
      setSuccess(true);
    } else {
      setProducts(res.products);
      setSuccess(false);
    }

    dispatch(setLoading(false));
  };

  const inputClear = () => {
    setSearchKey("");
    getAllProduct();
    setShowPagination(true);
  };

  return (
    <div className="w-full text-center mb-2 mt-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        "Discover, Connect, and Thrive with TradeHub"
      </h1>
      <p className="text-lg font-medium text-gray-500 max-w-xl mx-auto mb-2">
        Bings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className="max-w-[250px] mx-auto flex items-center gap-2">
        <div className="bg-white px-2 py-1 rounded-md flex items-center">
          <input
            type="text"
            className="w-full bg-transparent outline-none px-2"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <MagnifyingGlassIcon
            width={22}
            height={22}
            className="text-blue-600 z-0 cursor-pointer"
            onClick={() => {
              searchHandler();
              getSearchValue(searchKey);
            }}
          />
        </div>
        {searchKey && (
          <button
            type="button"
            className="text-sm font-medium text-white bg-blue-600 p-1 rounded-md"
            onClick={inputClear}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
