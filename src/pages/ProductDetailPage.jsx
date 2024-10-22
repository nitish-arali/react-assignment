import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Col, Divider, Row, Spin } from "antd";
import { useDispatch } from "react-redux";
import { increment } from "../ReduxStore/features/cartCounterSlice";

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(increment());
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); 
  if (!product) return <Spin style={{ margin: "auto" }} spinning={true} />; 

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "1rem" }}>Product Details</h1>
      <div style={{ display: "flex", margin: "1rem 3rem" }}>
        <Row justify={"center"}>
          <Col span={10}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                border: "1px solid lavender",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                width: "25rem",
                height: "30rem",
                objectFit: "contain",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                margin: "2rem 0 0.5rem 0",
              }}
            />
          </Col>
          <Col span={10}>
            <h1 style={{ margin: "2rem 0 0.5rem 0" }}>
              {product.title.charAt(0).toUpperCase() + product.title.slice(1)}
            </h1>
            <p>
              Category :{" "}
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
            <Divider />
            <p style={{ fontSize: "1.5rem" }}>
              {product.description.charAt(0).toUpperCase() +
                product.description.slice(1)}
            </p>
            <Divider />
            <p style={{ fontSize: "2rem" }}>Price: ${product.price}</p>
            <Divider />
            <Button
              size="large"
              color="default"
              variant="outlined"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetailPage;
