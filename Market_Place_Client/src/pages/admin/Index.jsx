import { message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import Users from "./Users";
import { getAllUser, getProducts } from "../../apicalls/admin";
import General from "./General";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import {
  BellAlertIcon,
  ChartBarIcon,
  SwatchIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { getAllNoti } from "../../apicalls/notification";
import Notification from "./Notification";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState(0);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.reducer.user);

  const getAllProduct = async (page = 1, perPage = 10) => {
    try {
      const res = await getProducts(page, perPage);
      if (res.isSuccess) {
        setProducts(res.products);
        setCurrentPage(res.currentPage);
        setTotalPage(res.totalPages);
        setTotalProducts(res.totalProducts);
        setPendingProducts(res.pendingProducts);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
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

  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };

  const getUsers = async () => {
    try {
      const res = await getAllUser();
      if (res.isSuccess) {
        setUsers(res.users);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    isAdmin();
    getAllProduct(1, 10);
    getUsers();
    getNoti();
  }, [activeTabKey]);

  const handleOnChange = (key) => {
    setActiveTabKey(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <ChartBarIcon width={20} />
          Dashboard
        </span>
      ),
      children: (
        <Dashboard
          products={products}
          users={users}
          totalProducts={totalProducts}
          pendingProducts={pendingProducts}
          setActiveTabKey={setActiveTabKey}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Manage Products
        </span>
      ),
      children: (
        <Products
          products={products}
          getAllProduct={getAllProduct}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <UsersIcon width={20} />
          Manage Users
        </span>
      ),
      children: <Users users={users} getUsers={getUsers} />,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: <Notification notifications={notifications} />,
    },
    {
      key: "5",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => handleOnChange(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
};

export default Index;
