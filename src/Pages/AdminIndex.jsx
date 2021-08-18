import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
} from "antd";
import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import AddArticle from "./AddArticle";
import { Route } from "react-router-dom";
import ArticleList from "./ArticleList";
import RecycleList from "./RecycleList";
import AdTypeModal from "../component/AdTypeModal";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false); // Modal 是否可见

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const handleTypeMenu = (e) => {
    // eslint-disable-next-line default-case
    switch (e.key) {
      case "addArticleType":
        setVisible(true);
        break;
      case "2":
        break;
    }
  };

  const handleArticleMenu = (e) => {
    // eslint-disable-next-line default-case
    switch (e.key) {
      case "addArticle":
        props.history.push("/home/add");
        break;
      case "articleList":
        props.history.push("/home/list");
        break;
      case "recycleList":
        props.history.push("/home/recycle");
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
   
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdTypeModal visible={visible} setVisible={setVisible} />
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="文章类型"
            onClick={handleTypeMenu}
          >
            <Menu.Item key="addArticleType">添加类型</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<UserOutlined />}
            title="文章管理"
            onClick={handleArticleMenu}
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
            <Menu.Item key="recycleList">回收站</Menu.Item>
          </SubMenu>

          <Menu.Item key="9" icon={<FileOutlined />}>
            <span>留言管理</span>
          </Menu.Item>
        <Menu.Item key="logout" icon={<UserOutlined />} onClick={handleLogout}>
            <span>登出</span>
          </Menu.Item>
    
        </Menu>
          
        
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Route path="/home" exact component={AddArticle}></Route>
            <Route path="/home/add" exact component={AddArticle}></Route>
            <Route path="/home/list/" component={ArticleList}></Route>
            <Route path="/home/add/:id" exact component={AddArticle}></Route>
            <Route path="/home/recycle" exact component={RecycleList}></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design + React</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
