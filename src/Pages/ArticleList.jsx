import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button, Space, Skeleton } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getList();
  }, [list]);
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
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
        axios(`${servicePath.delArticle}/${id}`, {
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
    props.history.push(`/index/add/${id}`);
  };
  const changePublicState = (aid, yn_id) => {
    let dataProps = {
      id:aid,
      yn_public:yn_id
    }
    axios({
      method: "post",
      url: `${servicePath.alterPublicState}`,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data.isOk)
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
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
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
                <Col span={4}>
                  <b>{item.typeName}</b>
                </Col>
                <Col span={4}>
                  <b>{item.addTime}</b>
                </Col>
                <Col span={4}>
                  <b>{item.view_count}</b>
                </Col>
                <Col span={6}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        updateArticle(item.id);
                      }}
                    >
                      修改
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        delArticle(item.id);
                      }}
                    >
                      删除
                    </Button>
                    {item.is_public ? (
                      <Button
                        type="primary" ghost
                        onClick={() => {
                          console.log(item);
                          changePublicState(item.id, 0);
                        }}
                      >
                        暂存
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => {
                          console.log(item);
                          changePublicState(item.id, 1);
                        }}
                      >
                        发布
                      </Button>
                    )}
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
export default ArticleList;
