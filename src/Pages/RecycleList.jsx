import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Space, Skeleton } from "antd";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";
import {
  DeleteOutlined,
  EditOutlined,
  InteractionFilled,
} from "@ant-design/icons";
import $http from "../axios/$http";
const { confirm } = Modal;

function RecycleList(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh,setRe] = useState(0)
  useEffect(() => {
    getList();
  }, [refresh]);
  const getList = () => {
    $http({
      method: "get",
      url: servicePath.getRecycleArticleList,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      setList(res.data.articleList);
      setIsLoading(false);
    });
  };
  const delArticle = (id) => {
    confirm({
      title: "确定要删除这篇博客文章吗？",
      content: "删除后，你的博客文章将在首页不再显示",
      onOk() {
        $http(`${servicePath.delArticle}/${id}`, {
          withCredentials: true,
        }).then((res) => {
          message.success("文章删除成功");
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


  const changeIsRecycle = (id, yn_id) => {
    let dataProps = {
      id,
      yn_goto_recycle: yn_id,
    };
    $http({
      method: "post",
      url: `${servicePath.delArticleToRecycle}`,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      refresh?setRe(0):setRe(1)
    });
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={5}>
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
            <Col span={3}>
              <b>删除时间</b>
            </Col>
            <Col span={2}>
              <center>
                <b>还原</b>
              </center>
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
                <Col span={5}>
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

                <Col span={3}>
                  <b>{item.delTime}</b>
                </Col>
                <Col span={2}>
                  <Button ghost onClick={() => changeIsRecycle(item.id, 0)}>
                    <InteractionFilled
                      style={{ fontSize: "16px", color: "#008B00" }}
                    />
                    还原
                  </Button>
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
    </div>
  );
}
export default RecycleList;
