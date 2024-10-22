
import { Button,  Col, Row, Select, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    showAllProducts();
   
  }, []);

  function showAllProducts() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=> setLoading(false));
  }

  const onChange = (value) => {
    axios
      .get(`https://fakestoreapi.com/products/category/${value}`) 
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching", error); 
      });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); 
  };

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "2rem" }}>
        <Col span={4}>
          <Button type="primary" onClick={showAllProducts}>
            All Products
          </Button>
        </Col>
        <Col span={4}>
          <Select
            allowClear
            style={{ width: "100%" }}
            showSearch
            placeholder="Select a category"
            optionFilterProp="value"
            onChange={onChange}
          >
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category.toUpperCase()}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <div
          style={{
            margin: "2rem 3rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      </Spin>
    </>
  );
};

export default HomePage;
