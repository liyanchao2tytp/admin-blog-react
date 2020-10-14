import React, { useState } from "react";
import { Button, Input, Card, Spin, message } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import "../static/css/login.css";
import servicePath from "../config/apiUrl";
import axios from "axios";
export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error("用户名不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return false;
    } else if (!passWord) {
      message.error("密码不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return false;
    }

    let dataProps = {
      userName: userName,
      passWord: passWord,
    };
    console.log(dataProps);
    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.message === "登陆成功") {
        localStorage.setItem("openId", res.data.openId);
        props.history.push("/index");
      } else {
        console.log(res.data.message)
        message.error("用户名密码错误");
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Login Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  );
}
