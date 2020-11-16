/*
 * @Author: lyc
 * @Date: 2020-10-28 21:33:58
 * @LastEditors: lyc
 * @LastEditTime: 2020-11-15 21:34:55
 * @Description: 文章列表
 */
import React, { useState, useEffect } from "react";
import {
  List,
  Row,
  Col,
  Modal,
  message,
  Button,
  Space,
  Skeleton,
  ConfigProvider,
} from "antd";
import zhCN from 'antd/lib/locale/zh_CN';

import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRe] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    getList();
  }, [refresh]);

  /**
   * @description: 获取所有文章列表
   */
  const getList = () => {
    axios({
      method: "get",
      url: `${servicePath.getArticleList}/1/10`,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      setList(res.data.data.article);
      setNum(res.data.data.num[0].total);
      setIsLoading(false);
    });
  };
  /**
   * @description: 修改文章的is_recycle字段
   * @param {id}  文章id
   * @param {deid}  1代表在回收站  0代表在文章列表
   */
  const delArticle = (id, deid = 1) => {
    confirm({
      title: "确定要删除这篇博客文章吗？",
      content: "删除后，你的博客文章将在首页不再显示",
      onOk() {
        axios({
          method: "post",
          url: `${servicePath.delArticleToRecycle}`,
          data: {
            id,
            yn_goto_recycle: deid,
            time: new Date().getTime() / 1000,
          },
          withCredentials: true,
        }).then((res) => {
          message.success("文章放入回收站");
          getList();
        });
      },
      onCancel() {
        message.info("取消成功");
      },
    });
  };
  const updateArticle = (id) => {
    props.history.push(`/home/add/${id}`);
  };
  
  const changePublicState = (aid, yn_id) => {
    let dataProps = {
      id: aid,
      yn_public: yn_id,
    };
    axios({
      method: "post",
      url: `${servicePath.alterPublicState}`,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      refresh ? setRe(0) : setRe(1);
    });
  };
  /**
   * @description: 改变文章是否置顶
   * @param {tid} 文章的id号，对应数据库中文章的主键id
   * @param {yn_id} 是否置顶，0代表不置顶，1代表置顶
   * @return {*}
   */
  const changeTopState = (tid, yn_id) => {
    let dataProps = {
      id: tid,
      yn_top: yn_id,
    };
    axios({
      method: "post",
      url: `${servicePath.alterTopState}`,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      refresh ? setRe(0) : setRe(1);
    });
  };

  /**
   * @description: 分页 页面改变时调用的函数
   * @param {page} 改变后的页码
   * @param {pageSize} 每页的条数
   * @return {*}
   */
  const gotoPage = (page, pageSize) => {
    axios({
      method: "get",
      url: `${servicePath.getArticleList}/${page}/${pageSize}`,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      setList(res.data.data.article);
    });
  };
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={6}>
              <b>标题</b>
            </Col>
            <Col span={2}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={2}>
              <b>浏览量</b>
            </Col>
            <Col span={2}>
              <b>置顶</b>
            </Col>
            <Col span={2}>
              <b>是否发布</b>
            </Col>
            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <Skeleton loading={isLoading}>
            <List.Item>
              <Row className="list-div">
                <Col span={6}>
                  <b>{item.title}</b>
                </Col>
                <Col span={2}>
                  <b>{item.typeName}</b>
                </Col>
                <Col span={4}>
                  <b>{item.addTime}</b>
                </Col>
                <Col span={2}>
                  <b>{item.view_count}</b>
                </Col>
                <Col span={2}>
                  {item.is_top ? (
                    <Button onClick={() => changeTopState(item.id, 0)}>
                      <DislikeOutlined
                        style={{ fontSize: "16px", color: "#008B00" }}
                      />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        changeTopState(item.id, 1);
                      }}
                    >
                      <LikeOutlined
                        style={{ fontSize: "16px", color: "#FF69B4" }}
                      />
                    </Button>
                  )}
                </Col>

                <Col span={2}>
                  {item.is_public ? (
                    <Button
                      type="primary"
                      ghost
                      shape="round"
                      onClick={() => {
                        console.log(item);
                        changePublicState(item.id, 0);
                      }}
                    >
                      <EyeInvisibleOutlined />
                      暂存
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => {
                        console.log(item);
                        changePublicState(item.id, 1);
                      }}
                    >
                      <EyeOutlined />
                      发布
                    </Button>
                  )}
                </Col>
                <Col span={4}>
                  <Space>
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => {
                        updateArticle(item.id);
                      }}
                    >
                      <EditOutlined />
                      修改
                    </Button>
                    <Button
                      type="primary"
                      danger
                      shape="round"
                      onClick={() => {
                        delArticle(item.id);
                      }}
                    >
                      <DeleteOutlined />
                      删除
                    </Button>
                  </Space>
                </Col>
              </Row>
            </List.Item>
          </Skeleton>
        )}
      />
      <ConfigProvider locale = {zhCN}>
        <Pagination
          total={num}
          hideOnSinglePage={true}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={(page, pageSize) => gotoPage(page, pageSize)}
          style={{ textAlign: "center", paddingTop: "20px" }}
        />
      </ConfigProvider>
    </div>
  );
}
export default ArticleList;
