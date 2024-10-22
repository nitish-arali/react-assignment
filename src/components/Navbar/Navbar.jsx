import React, { useEffect, useState } from "react";
import { Layout, Menu, Badge, Drawer, Button, Input, List, Select } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import axios from "axios";

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    showAllProducts();
  }, []);

  function showAllProducts() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((data) => {
        setSearchProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const cartCount = useSelector((state) => state.counter);

  const navigate = useNavigate();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      const filtered = searchProducts.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const onSelectProduct = (value) => {
    navigate(`/product/${value}`);
    setSearchQuery("");
    setFilteredProducts([]);
  };

  return (
    <Layout>
      <Header className="navbar">
        <div className="logo">
          <Link to="/">ZEEE-Commerce</Link>
        </div>
        <div style={{ width: "50%", marginRight: "2rem" }}>
          <Select
            showSearch
            value={searchQuery}
            placeholder="Search products"
            allowClear
            size="large"
            onSearch={onSearch}
            onChange={onSelectProduct}
            style={{ width: "100%" }}
            filterOption={false}
            dropdownRender={(menu) => (
              <div>
                {filteredProducts.length > 0 ? (
                  menu
                ) : (
                  <div style={{ padding: 10, textAlign: "center" }}>
                    No products found / Enter Valid Search Criteria
                  </div>
                )}
              </div>
            )}
          >
            {filteredProducts.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          className="desktop-menu"
          defaultSelectedKeys={["home"]}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key="cart"
            icon={
              <Badge color="blue" size="small" count={cartCount}>
                <ShoppingCartOutlined />
              </Badge>
            }
          >
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">My Profile</Link>
          </Menu.Item>
        </Menu>

        <Button
          className="mobile-menu-button"
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>

        <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
          <Menu mode="vertical" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="cart"
              icon={
                <Badge count={cartCount}>
                  <ShoppingCartOutlined />
                </Badge>
              }
            >
              <Link to="/cart">Cart</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="/profile">My Profile</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
