import { Form, Input, message } from "antd";

import { loginUser, registerUser } from "../../apicalls/auth";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setUser } from "../../store/slices/userSlice";

const AuthForm = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.reducer.user.loading);

  const handleOnFinish = async (values) => {
    dispatch(setLoading(true));
    if (isLogin) {
      try {
        const res = await loginUser(values);
        if (res.isSuccess) {
          message.success(res.message);
          localStorage.setItem("token", res.token);
          dispatch(setUser(res.token));
          navigate("/");
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        dispatch(setError(err.message))
        message.error(err.message);
      }
    } else {
      try {
        const res = await registerUser(values);
        if (res.isSuccess) {
          message.success(res.message);
          dispatch(setError(null));
          navigate("/login");
        } else {
          throw new Error(res.message.msg);
        }
      } catch (err) {
        message.error(err.message);
        dispatch(setError(err.message));
      }
    }
    dispatch(setLoading((false)));
  };


  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className=" w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          POINT.IO - {isLogin ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLogin && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter username!!!",
                },
                {
                  min: 3,
                  message: "Name must have 3 characters",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your username..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email!!!",
              },
              {
                type: "email",
                message: "Emaul must be email format!!!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your email..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password!!!",
              },
              {
                min: 4,
                message: "Password must have 4 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter password..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full outline-none bg-blue-600 text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <BeatLoader
                  color={"#ffffff"}
                  loading={loading}
                  size={7}
                  speedMultiplier={1}
                />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </Form.Item>
          <div>
            {isLogin ? (
              <p>
                Don't have an account?
                <Link
                  to={"/register"}
                  className="font-medium text-blue-600 hover:text-blue-600 ml-1"
                >
                  Register here...
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:text-blue-600 ml-1"
                >
                  Login here...
                </Link>
              </p>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
