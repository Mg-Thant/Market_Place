import React from "react";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as Bookmark } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

import TradeHub from "../../images/TradeHub.jpg";
import { Link } from "react-router-dom";
import { message } from "antd";
import { savedProducts, unSavedProduct } from "../../apicalls/product";

const Card = ({
  product,
  saved,
  savedProduct,
  saveProducts,
  getAllProduct,
}) => {
  const { user } = useSelector((state) => state.reducer.user);

  const handleProductStatus = async (id) => {
    try {
      let res;
      if (saved) {
        res = await unSavedProduct(id);
      } else {
        res = await savedProducts(id);
      }
      if (res.isSuccess) {
        if (saved) {
          savedProduct();
        } else {
          getAllProduct();
        }
        message.success(res.message);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message || "Product has been saved!!!");
    }
  };

  const isSavedProducts = (product) => {
    return saveProducts.some((p) => p.product_id._id === product._id);
  };

  return (
    <div className={`bg-white p-4 rounded-md`}>
      {product.images[0] ? (
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-64 w-full object-fit rounded-md"
          />
        </Link>
      ) : (
        <Link to={`/products/${product._id}`}>
          <img src={TradeHub} alt={product.name} className="rounded-md h-64" />
        </Link>
      )}
      <p className="text-white text-xs bg-blue-600 rounded-md font-medium my-2 p-1 w-fit">
        {product.category.toUpperCase().replaceAll("_", " ")}
      </p>
      <div className="flex items-center justify-between">
        <Link to={`/products/${product._id}`}>
          <p className="text-xl font-bold text-gray-700">{product.name}</p>
        </Link>
        {user && (
          <>
            {saved ? (
              <BookmarkSlashIcon
                width={20}
                height={30}
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  handleProductStatus(product._id);
                }}
              />
            ) : (
              <>
                {isSavedProducts(product) ? (
                  <Bookmark
                    width={20}
                    height={30}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      return message.warning("Product has been saved!!!");
                    }}
                  />
                ) : (
                  <BookmarkIcon
                    width={20}
                    height={30}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => {
                      handleProductStatus(product._id);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <p className="text-gray-500 font-medium mb-2">
        {product.description.slice(1, 80)}
      </p>
      <hr />
      <p className="ftext-lg font-semibold my-2 text-left">${product.price}</p>
      {product && product.seller && (
        <p className="text-left">
          <span className="font-bold">Seller</span>: {product.seller.username}
        </p>
      )}
    </div>
  );
};

export default Card;
