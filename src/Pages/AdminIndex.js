import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle'
import { Route } from 'react-router-dom'
import { OmitProps } from 'antd/lib/transfer/ListBody';
import ArticleList from "./ArticleList";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  const handleArticleMenu = (e) => {
    switch (e.key) {
      case 'addArticle': props.history.push('/index/add')
        break;
      case 'articleList': props.history.push('/index/list')
        break;
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={handleArticleMenu}>
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>

          <Menu.Item key="9" icon={<FileOutlined />}>
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

            <Route path='/index'  exact component={AddArticle}></Route>
            <Route path='/index/add' strict exact component={AddArticle}></Route>
            <Route path='/index/add/:id' exact component={AddArticle}></Route>
            <Route path='/index/list/'  component={ArticleList}></Route>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design + React</Footer>
      </Layout>
    </Layout>
  );
}


export default AdminIndex