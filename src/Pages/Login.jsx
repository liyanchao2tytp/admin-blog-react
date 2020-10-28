import React, { useState } from "react";
import { Button, Input, Card, Spin, message } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import "../static/css/login.css";
import servicePath from "../config/apiUrl";
import axios from "axios";
import png from "../assets/image/hawaii-water-small.png"
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
        props.history.push("/home");
      } else {
        console.log(res.data.message);
        message.error("用户名密码错误");
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div style={{height:'100vh'}}>
      <div>
        <svg
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <filter id="water">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".05 .05"
              numOctaves="1"
              result="noise1"
            ></feTurbulence>
            <feColorMatrix
              in="noise1"
              type="hueRotate"
              values="0"
              result="noise2"
            >
              <animate
                attributeName="values"
                from="0"
                to="360"
                dur="1s"
                repeatCount="indefinite"
              />
            </feColorMatrix>
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="7"
              in="SourceGraphic"
              in2="noise2"
            />
          </filter>
        </svg>
        <img
          style={{
            width: "100vw",
            height: "100%",
            position: "absolute",
            top: "-5 vh",
            left: "-5 vw",
            objectFit: "cover",
            filter: "url(#water)",
            overflow:'hidden'
          }}
          src={png}
          alt="Hawaiian water crashes against the rocks"
        />
      </div>
      <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading} style={{backgroundColor:"rgb(255,255,255,0.3)"}}>
          <div>
          <Card
            title="Login Blog System"
            bordered={true}
            style={{ width: 400,backgroundColor:"rgb(255,255,255,0.3)"}}
          >
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
          </div>
        </Spin>
      </div>
    </div>
  );
}
