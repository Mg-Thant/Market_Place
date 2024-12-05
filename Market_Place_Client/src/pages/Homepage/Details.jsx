import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, FadeLoader } from "react-spinners";
import "ldrs/bouncy";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { getProductDetails } from "../../apicalls/public";
import TradeHub from "../../images/TradeHub.jpg";
import { setLoading } from "../../store/slices/userSlice";
import { getAllComment, savedNewComment } from "../../apicalls/comment";
import SavedComments from "../../components/comments/SavedComments";
import { notify } from "../../apicalls/notification";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [comments, setComments] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);
  const user = useSelector((state) => state.reducer.user.user);
  const [form] = Form.useForm();

  const productDetails = async () => {
    dispatch(setLoading(true));
    const { id } = params;
    try {
      const res = await getProductDetails(id);
      if (res.isSuccess) {
        setProduct(res.product);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      navigate("/");
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  const getComments = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getAllComment(params.id);
      if (res.isSuccess) {
        setComments(res.comments);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  const handleSubmit = async (values) => {
    setProcessing(true);
    values.product_id = product._id;
    values.seller_id = product.seller._id;
    values.bider_id = user._id;

    try {
      const res = await savedNewComment(values);
      if (res.isSuccess) {
        getComments();
        form.resetFields();
        message.success(res.message);

        await notify({
          title: "New Comments",
          comment: `New comments is commented on ${product.name} by ${user.username}`,
          owner_id: product.seller._id,
          product_id: product._id,
          phone_number: values.phone,
        });
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    setProcessing(false);
  };

  useEffect(() => {
    productDetails();
    getComments();
  }, []);

  return (
    <section className="flex items-center justify-between mt-[40px]">
      {loading ? (
        <div className="w-fit h-fit mx-auto my-64">
          <l-bouncy size="45" speed="1.75" color="blue"></l-bouncy>
        </div>
      ) : (
        <>
          {product && product.category && product.seller && (
            <>
              <div className={`w-1/3 ml-8 h-screen sticky top-0`}>
                {product && product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-[380px] object-cover object-center rounded-md overflow-hidden"
                    />
                    <div className="flex items-center gap-3 mt-3">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className={`border-2 overflow-hidden border-blue-400 rounded-lg p-2 ${
                            selectedImage === index && "border-dashed"
                          }`}
                        >
                          <img
                            src={image}
                            alt={product.name}
                            className=" w-24 h-24 object-cover cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={TradeHub}
                      alt={product.name}
                      className="w-full h-[380px]  object-fill object-center rounded-xl overflow-hidden"
                    />
                    <p className=" font-medium my-2 text-red-600">
                      This product does not include images.
                    </p>
                  </>
                )}
              </div>
              <div className="w-2/3 px-20 h-screen">
                <div className="flex items-center justify-between">
                  <div className="w-4/5">
                    <h1 className=" text-4xl font-bold my-1">{product.name}</h1>
                    <p className=" text-gray-500 font-medium leading-6 mb-4">
                      {product.description}
                    </p>
                  </div>
                  <ArrowLeftIcon
                    width={35}
                    height={30}
                    className="cursor-pointer text-blue-600"
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Infomations</h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Category</p>
                    <p>Used On</p>
                    <p>Price</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                    <p>{product.usedOn}</p>
                    <p>{product.price}</p>
                  </div>
                </div>
                <hr />
                <div className=" mb-4">
                  <h1 className="text-2xl font-semibold my-2">Details</h1>
                  {product.details.map((data, index) => (
                    <div className="flex justify-between" key={index}>
                      <div className=" font-medium space-y-2">
                        <p>{data}</p>
                      </div>
                      <div className=" text-gray-600 space-y-2">
                        <p>Include</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">
                  Seller Infomation
                </h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Name</p>
                    <p>E-mail</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.seller.username}</p>
                    <p>{product.seller.email}</p>
                  </div>
                </div>
                <div className="bg-gray-900 h-[2px] rounded-lg opacity-10 w-full"></div>
                <div>
                  {comments && comments.length > 0 ? (
                    <>
                      {comments.map((comment) => (
                        <SavedComments key={comment._id} comment={comment} />
                      ))}
                    </>
                  ) : (
                    <p className="text-red-600 my-2 font-medium">
                      No comment found for this product!!!
                    </p>
                  )}
                </div>
                {user && user._id !== product.seller._id && (
                  <div className="my-4">
                    <h1 className="text-2xl font-semibold my-2">
                      Place your Comments
                    </h1>
                    <Form onFinish={handleSubmit} layout="vertical">
                      <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[
                          {
                            required: true,
                            message: "Comment must contain!!!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="Write a comment..."></Input>
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            message: "Phone number must contain!!!",
                          },
                          {
                            min: 11,
                            message: "Phone number must have 11 characters",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          placeholder="Phone number..."
                        ></Input>
                      </Form.Item>
                      <button className="text-white font-medium text-base p-2 rounded-md bg-blue-600 w-full">
                        {processing ? (
                          <l-bouncy
                            size="25"
                            speed="1.75"
                            color="blue"
                          ></l-bouncy>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </Form>
                  </div>
                )}
                {!user && (
                  <p className="font-medium text-red-600">
                    <Link to={"/login"} className="underline">
                      Login
                    </Link>{" "}
                    or{" "}
                    <Link to={"/register"} className="underline">
                      Register
                    </Link>{" "}
                    to bid this product
                  </p>
                )}
                {user?._id === product.seller._id && (
                  <p className="font-medium text-red-600">
                    You are the product owner/seller. You can't place bid.
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
