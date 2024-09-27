import moment from "moment";
import { deleteProduct } from "../../apicalls/product";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { setLoading, setError } from "../../store/slices/userSlice";
import { BeatLoader } from "react-spinners";

const Products = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getAllProduct,
  setManageTabKey,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);

  const handleOnClick = (id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(id);
    setManageTabKey("1");
  };

  const handleUpload = (id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(id);
    setManageTabKey("2");
  };

  const handleDelete = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await deleteProduct(id);
      if (res.isSuccess) {
        message.success(res.message);
        getAllProduct();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      dispatch(setError(err.message));
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  return (
    <section>
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
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "pending" ? (
                        <span className="bg-yellow-300 text-white text-sm font-semibold p-1 rounded-md">
                          {product.status}
                        </span>
                      ) : (
                        <span className="bg-green-400 text-white text-sm font-semibold p-1 rounded-md">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {loading ? (
                        <div className="w-fit h-fit mx-auto">
                          <BeatLoader
                            color={"#0000ff"}
                            loading={loading}
                            size={7}
                            speedMultiplier={1}
                          />
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="font-medium text-yellow-600 hover:underline"
                            onClick={() => {
                              handleUpload(product._id);
                            }}
                          >
                            Upload
                          </button>
                          <button
                            type="button"
                            className="font-medium text-blue-600 ms-4 hover:underline"
                            onClick={() => {
                              handleOnClick(product._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="font-medium text-red-600 ms-4 hover:underline"
                            onClick={() => {
                              handleDelete(product._id);
                            }}
                          >
                            Delete
                          </button>
                        </>
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
      </div>
    </section>
  );
};

export default Products;
