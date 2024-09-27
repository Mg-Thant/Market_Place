import React, { useEffect, useState } from "react";
import Hero from "../../components/Homepage/Hero";
import Filter from "../../components/Homepage/Filter";
import Card from "../../components/Homepage/Card";
import { getProducts } from "../../apicalls/public";
import { message, Pagination, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/slices/userSlice";
import { FadeLoader } from "react-spinners";
import { getSavedProducts } from "../../apicalls/product";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);

  const getAllProduct = async (page = 1, perPage = 6) => {
    dispatch(setLoading(true));
    try {
      const res = await getProducts(page, perPage);
      if (res.isSuccess) {
        setProducts(res.products);
        setSuccess(true);
        setCurrentPage(res.currentPage);
        setTotalPage(res.totalPages);
      } else {
        setSuccess(false);
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  const getSearchValue = (value) => {
    setProductSearch(value);
  };

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

  const handleOnChange = (page) => {
    const perPage = 6;
    setCurrentPage(page);
    getAllProduct(page, perPage);
  };

  useEffect(() => {
    getAllProduct(1, 6);
    savedProduct();
  }, []);

  return (
    <section>
      <Hero
        setProducts={setProducts}
        getAllProduct={getAllProduct}
        getSearchValue={getSearchValue}
        setSuccess={setSuccess}
        setShowPagination={setShowPagination}
      />
      <Filter
        setProducts={setProducts}
        getAllProduct={getAllProduct}
        getSearchValue={getSearchValue}
        setSuccess={setSuccess}
        setShowPagination={setShowPagination}
      />
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
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 mb-8">
            {products && products.length > 0 && success && (
              <>
                {products.map((product) => (
                  <Card
                    key={product._id}
                    product={product}
                    saved={false}
                    saveProducts={savedProducts}
                    getAllProduct={getAllProduct}
                  />
                ))}
              </>
            )}
            {!products && !success && (
              <p className="text-center text-black font-bold text-3xl mx-auto mt-4">
                "{productSearch} is not found!!!"
              </p>
            )}
          </div>
          {showPagination && (
            <div className="flex mt-4 mb-20 justify-end max-w-7xl mx-auto">
              <Pagination
                current={currentPage}
                total={totalPage * 6}
                onChange={handleOnChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Index;
