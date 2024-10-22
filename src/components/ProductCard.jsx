import { Card } from "antd";
import React from "react";

const { Meta } = Card;

function ProductCard({ title, image, onClick }) {
  return (
    <div
      style={{
        margin: "1rem",
        width: "20rem",
        height: "20rem",
      }}
    >
      <Card
        hoverable
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        cover={
          <img
            alt="product"
            src={image}
            style={{
              width: "10rem",
              height: "15rem",
              objectFit: "scale-down",
            }}
          />
        }
        onClick={onClick}
      >
        <Meta
          description={
            <div
              style={{ fontWeight: "500", color: "black", textAlign: "center" }}
            >
              {title}
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default ProductCard;
