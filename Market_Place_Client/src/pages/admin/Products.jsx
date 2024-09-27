import moment from "moment";
import React from "react";

import {
  approveProduct,
  rejectProduct,
  rollBackProduct,
} from "../../apicalls/admin";
import { message, Pagination } from "antd";

const Products = ({ products, getAllProduct, setCurrentPage, currentPage, totalPage  }) => {
  const handleApprove = async (id, status) => {
    const handlePayload = {
      id,
      status,
    };
    try {
      const res = await approveProduct(handlePayload);
      if (res.isSuccess) {
        message.success("Product has approved!!!");
        getAllProduct();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleReject = async (id, status) => {
    const handlePayload = {
      id,
      status,
    };
    try {
      const res = await rejectProduct(handlePayload);
      if (res.isSuccess) {
        message.success("Product has rejected!!!");
        getAllProduct();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleRollBack = async (id, status) => {
    const handlePayload = {
      id,
      status,
    };
    try {
      const res = await rollBackProduct(handlePayload);
      if (res.isSuccess) {
        message.success("Product has roll back!!!");
        getAllProduct();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleOnChange = (page) => {
    const perPage = 6;
    setCurrentPage(page);
    getAllProduct(page, perPage);
  };

  return (
    <section className="mr-4">
      <h1 className="text-3xl font-semibold my-2">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm rtl:text-right text-gray-500 text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Seller
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr
                    className="odd:bg-white even:bg-gray-50 border-b"
                    key={product._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 text-center">
                      {product.seller.username}
                    </td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "pending" ? (
                        <span className="bg-yellow-300 text-white text-sm font-semibold p-1 rounded-md">
                          {product.status}
                        </span>
                      ) : product.status === "approve" ? (
                        <span className="bg-green-400 text-white text-sm font-semibold p-1 rounded-md">
                          {product.status}
                        </span>
                      ) : (
                        <span className="bg-red-600 text-white text-sm font-semibold p-1 rounded-md">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.status === "approve" ? (
                        <button
                          type="button"
                          className="font-medium bg-sky-600 text-white py-1 px-2 me-2 rounded-md hover:underline"
                          onClick={() => {
                            handleRollBack(product._id, "pending");
                          }}
                        >
                          Roll Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium bg-green-500 text-white py-1 px-2 rounded-md me-2 hover:underline"
                          onClick={() => {
                            handleApprove(product._id, "approve");
                          }}
                        >
                          Approve
                        </button>
                      )}
                      {product.status === "reject" ? (
                        <button
                          type="button"
                          className="font-medium bg-sky-600 text-white py-1 px-2 rounded-md hover:underline"
                          onClick={() => {
                            handleRollBack(product._id, "pending");
                          }}
                        >
                          Roll Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium bg-red-600 text-white py-1 px-2 rounded-md hover:underline"
                          onClick={() => {
                            handleReject(product._id, "reject");
                          }}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  No Products added to sell list!!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex mt-4 mb-20 justify-end max-w-7xl mx-auto">
          <Pagination
            current={currentPage}
            total={totalPage * 10}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
