import React, { useEffect, useState } from "react";
import { Checkbox, Col, Form, Input, message, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";

import {
  getOldDataProduct,
  sellProduct,
  updateProduct,
} from "../../apicalls/product";

const ProductForm = ({
  setActiveTabKey,
  getAllProduct,
  editMode,
  editProductId,
}) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);

  const handleOnFinish = async (values) => {
    try {
      let res;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        res = await updateProduct(values);
      } else {
        res = await sellProduct(values);
      }
      if (res.isSuccess) {
        form.resetFields();
        message.success(res.message);
        getAllProduct();
        setActiveTabKey("1");
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getOldProduct = async () => {
    const res = await getOldDataProduct(editProductId);
    setSellerId(res.product.seller);
    if (res.isSuccess) {
      form.setFieldsValue({
        product_name: res.product.name,
        product_description: res.product.description,
        product_price: res.product.price,
        product_category: res.product.category,
        product_used_on: res.product.usedOn,
        product_details: res.product.details || [],
      });
    } else {
      message.error("Failed to fetch product details");
    }
  };

  useEffect(() => {
    if (editMode) {
      getOldProduct();
    } else {
      form.resetFields();
    }
  }, [editMode]);

  return (
    <section>
      <h1 className="text-3xl font-bold my-2">
        {editMode ? "Update Product" : " What you gonna do?"}
      </h1>
      <Form
        layout="vertical"
        onFinish={handleOnFinish}
        form={form}
        initialValues={{
          product_details: [],
        }}
      >
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product name is required!!!",
            },
          ]}
        >
          <Input placeholder="product name..."></Input>
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Product description is required!!!",
            },
            {
              min: 10,
              message: "Product description must have 10 characters!!!",
            },
          ]}
          hasFeedback
        >
          <TextArea placeholder="Product Description..." rows={6}></TextArea>
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="product_price"
              label="Product Price"
              rules={[
                {
                  required: true,
                  message: "Price is required!!!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_category"
              label="Choose a category"
              rules={[
                {
                  required: true,
                  message: "Category is required!!!",
                },
              ]}
            >
              <Select
                defaultValue=""
                options={[
                  {
                    value: "clothing_and_fashion",
                    label: "Clothing and Fashion",
                  },
                  {
                    value: "electronic_and_gadgets",
                    label: "Electronic and Gadgets",
                  },
                  {
                    value: "home_and_furnitures",
                    label: "Home and Furnitures",
                  },
                  {
                    value: "beauty_and_personal_care",
                    label: "Beauty and Personal Care",
                  },
                  {
                    value: "books_and_media",
                    label: "Books and Media",
                  },
                  {
                    value: "sports_and_fitness",
                    label: "Sports and Fitness",
                  },
                  {
                    value: "toys_and_games",
                    label: "Toys and Games",
                  },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_on"
              label="Used For"
              rules={[
                {
                  required: true,
                  message: "Product's used year is required!!!",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="eg. 3 months ago... " />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_details" label="Check if you have">
          <Checkbox.Group
            options={[
              {
                value: "accessories",
                label: "Accessories",
              },
              {
                value: "warranty",
                label: "Warranty",
              },
              {
                value: "voucher",
                label: "Voucher",
              },
            ]}
          />
        </Form.Item>
        <button className="font-medium text-lg text-center m-4 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 w-3/12 py-2 float-right">
          {editMode ? (
            <>
              {" "}
              <SquaresPlusIcon width={30} /> Update
            </>
          ) : (
            <>
              {" "}
              <SquaresPlusIcon width={30} /> Sell
            </>
          )}
        </button>
      </Form>
    </section>
  );
};

export default ProductForm;
