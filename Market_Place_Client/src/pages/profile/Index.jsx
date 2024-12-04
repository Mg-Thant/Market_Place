import { Tabs } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "../../store/slices/userSlice";
import { getProducts } from "../../apicalls/product";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import General from "./General";
import "ldrs/bouncy";
import { getAllNoti } from "../../apicalls/notification";
import {
  BellAlertIcon,
  UserIcon,
  SwatchIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import Notification from "./Notification";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [manageTabKey, setManageTabKey] = useState("1");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reducer.user.loading);
  const notiCount = notifications.filter((noti) => !noti.isRead).length;

  const getAllProduct = async () => {
    dispatch(setLoading(true));
    try {
      const res = await getProducts();
      if (!res.isSuccess) {
        throw new Error(res.message);
      } else {
        setProducts(res.products);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoading(false));
  };

  const getNoti = async () => {
    try {
      const res = await getAllNoti();
      if (res.isSuccess) {
        setNotifications(res.notis);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (activeTabKey === "1") {
      setEditMode(false);
      setEditProductId(null);
      setManageTabKey("1");
    }
    getAllProduct();
    getNoti();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Products
        </span>
      ),
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getAllProduct={getAllProduct}
          setManageTabKey={setManageTabKey}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SquaresPlusIcon width={20} />
          Manage Products
        </span>
      ),
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getAllProduct={getAllProduct}
          editMode={editMode}
          editProductId={editProductId}
          manageTabKey={manageTabKey}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
          {notifications.length > 0 && notiCount > 0 && (
            <span className="bg-blue-600 font-medium w-4 h-4 rounded-full text-xs text-white text-center -ml-1">
              {notiCount}
            </span>
          )}
        </span>
      ),
      children: (
        <Notification notifications={notifications} getNoti={getNoti} />
      ),
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  const handleOnChange = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
  };

  return (
    <>
      {loading ? (
        <div className="mx-auto w-fit m-16">
          <l-bouncy size="45" speed="1.75" color="blue"></l-bouncy>
        </div>
      ) : (
        <Tabs
          activeKey={activeTabKey}
          onChange={(key) => handleOnChange(key)}
          items={items}
          tabPosition="left"
          size="large"
        />
      )}
    </>
  );
};

export default Index;
