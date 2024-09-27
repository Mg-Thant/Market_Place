import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../../store/slices/userSlice";
import { getSavedProducts } from "../../apicalls/product";
import Card from "../../components/Homepage/Card";
import { FadeLoader } from "react-spinners";

const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);

  const savedProduct = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getSavedProducts();
      if (res.isSuccess) {
        setSavedProducts(res.savedProducts);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    savedProduct();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold my-4 text-center text-blue-600">
        Saved Product List
      </h1>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {loading ? (
          <FadeLoader
            color={"#0000ff"}
            loading={loading}
            size={15}
            speedMultiplier={1}
            className="mx-auto mt-44"
          />
        ) : (
          <>
            {savedProducts && savedProducts.length > 0 && (
              <>
                {savedProducts.map((product) => {
                  return (
                    <div key={product._id} className="w-96">
                      {loading ? (
                        <FadeLoader
                          color={"#0000ff"}
                          loading={loading}
                          size={15}
                          speedMultiplier={1}
                          className="mx-auto mt-44"
                        />
                      ) : (
                        <Card
                          product={product.product_id}
                          saved={true}
                          savedProduct={savedProduct}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}
            {savedProducts.length === 0 && <p className="font-medium text-red-600">No saved products!!!</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
