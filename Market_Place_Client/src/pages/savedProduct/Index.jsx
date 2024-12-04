import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../../store/slices/userSlice";
import { getSavedProducts } from "../../apicalls/product";
import Card from "../../components/Homepage/Card";
import "ldrs/bouncy";

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
          <div className="mx-auto w-fit my-64">
            <l-bouncy size="45" speed="1.75" color="blue"></l-bouncy>
          </div>
        ) : (
          <>
            {savedProducts && savedProducts.length > 0 && (
              <>
                {savedProducts.map((product) => {
                  return (
                    <div key={product._id} className="w-96">
                      {loading ? (
                        <div className="mx-auto w-fit my-64">
                          <l-bouncy
                            size="45"
                            speed="1.75"
                            color="blue"
                          ></l-bouncy>
                        </div>
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
            {savedProducts.length === 0 && (
              <p className="font-medium text-red-600">No saved products!!!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
