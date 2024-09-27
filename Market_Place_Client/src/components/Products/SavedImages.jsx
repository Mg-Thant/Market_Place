import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { delSavedImages } from "../../apicalls/product";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "../../store/slices/userSlice";

const SavedImages = ({ savedImages, setSavedImages, editProductId }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);

  const removeHandler = async (image) => {
    dispatch(setLoading(true));
    setSavedImages(savedImages.filter((img) => img !== image));
    try {
      const res = await delSavedImages({
        productId: editProductId,
        imgUrl: image,
      });
      if (res.isSuccess) {
        message.success("Product image removed!!!");
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
    <div className="mb-4">
      {loading && message.loading("Action in progress", [1.5])}
      <h1 className="text-xl font-bold">Saved Images in Cloud</h1>
      <section className="my-4 m-4 flex items-center justify-center gap-4 flex-wrap">
        {savedImages.map((image, index) => (
          <div key={index} className="w-80 h-48 my-4 basis-1/4 relative">
            <img
              src={image}
              alt={`Product ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="bg-black w-6 h-6 absolute z-20 -top-2 -right-3 cursor-pointer rounded-full">
              <XCircleIcon
                width={25}
                height={25}
                className="text-red-600 w-full h-full"
                onClick={() => {
                  removeHandler(image);
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SavedImages;
