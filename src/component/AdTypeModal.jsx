/*
 * @Author: lyc
 * @Date: 2021-02-16 18:23:39
 * @LastEditors: lyc
 * @LastEditTime: 2021-02-16 22:06:33
 * @Description: 添加文章类型弹窗
 */
import React from "react";
import { Modal, Input, Button, message, Form } from "antd";
import Axios from "axios";
import servicePath from "../config/apiUrl";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function AdTypeModal(props) {
  const onFinish = async (value) => {
    const data = await Axios({
      method: "post",
      url: servicePath.addArticleType,
      data: value,
    });
    !data.isOk && message.error("添加文章类型未成功");
  };

  const onFinishFailed = (error) => {
    message.error(error);
  };
  const { visible, setVisible } = props;
  return (
    <Modal
      title="添加文章类型"
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={[
        <Button form="addTypeForm" key="submit" htmlType="submit">
          添加
        </Button>,
      ]}
      width={700}
    >
      <Form
        {...layout}
        id="addTypeForm"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="ArticleType"
          name="articleType"
          rules={[
            {
              required: true,
              message: "Please input a new article type !",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
