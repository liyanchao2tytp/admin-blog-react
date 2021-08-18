/*
 * @Author: lyc
 * @Date: 2020-10-28 21:33:58
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-18 21:17:26
 * @Description: file content
 */
import React, { useEffect, useState } from "react";
import "../static/css/AddArticle.css";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Space,
  DatePicker,
  message,
  Skeleton,
  Switch,
  ConfigProvider,
} from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import servicePath from "../config/apiUrl.js";
import { Type } from "../config/type.js";
import moment from "moment";
import "moment/locale/zh-cn";
import $http from "../axios/$http";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("文章类型"); //选择的文章类别

  const [isLoading, setIsLoading] = useState(true);

  const [yn_public, setYnPublic] = useState(1); // 暂存或者发布文章 0 是暂存  1 是发布
  let yn_top = 0; // 是否置顶文章  0 不置顶   1 置顶
  let id = props.match.params.id; //获取文章id，如果有就是修改，没有就是插入
  /**
   * @description: 根据id是否存在来判断是插入还是更新
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    getTypeInfo();
    if (id) {
      setArticleId(id);
      getArticleById(id);
    } else {
      getNowTime();
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  /**
   * @description: 配置 marked 插件
   * @param {*}
   * @return {*}
   */
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getArticleById = (id) => {
    $http({
      method: "get",
      url: `${servicePath.getArticleById}/${id}`,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      yn_top = res.data.data[0].is_top;
      setYnPublic(res.data.data[0].is_public);
      console.log("axios:" + res.data.data[0].is_public);
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].content);
      let html = marked(res.data.data[0].content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].intro);
      let tmpInt = marked(res.data.data[0].intro);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeName);

      setIsLoading(false);
    });
  };

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };
  const changeIntro = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {

    $http({
      method: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      // if (res.data.message === "没有登录") {
      //   localStorage.removeItem("openId");
      //   props.history.push("/");
      // } else {
      //   setTypeInfo(res.data.data);
      // }
      
      console.log("--------------",typeInfo);
      console.log(res);

      setTypeInfo(res.data.data);
   
    });
  };

  const saveArticle = () => {
    if (selectedType === "文章类型") {
      message.error("必须选择文章类型");
      return false;
    } else if (!articleTitle) {
      message.error("文章标题不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }

    // let dateText = showDate.replace(/-/g, "/");

    let dataProps = {};
    // 根据selectedType的类型确定 type_id的值
    // eslint-disable-next-line default-case
    switch (selectedType) {
      case Type.TYPE_ONE:
        dataProps.type_id = 1;
        break;
      case Type.TYPE_TWO:
        dataProps.type_id = 2;
        break;
      case Type.TYPE_THREE:
        dataProps.type_id = 3;
        break;
    }

    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.intro = introducemd;
    dataProps.addTime = new Date(showDate).getTime() / 1000;
    dataProps.is_public = yn_public;
    console.log(yn_public);
    console.log("is_pub" + dataProps.is_public);
    // dataProps.is_top = 0;
    // 如果为0，则说明是新增的文章
    if (articleId === 0) {
      dataProps.view_count = 0;
      $http({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isOk) {
          message.success("文章保存成功");
        } else {
          message.error("文章保存失败");
        }
      });
    } else {
      dataProps.id = articleId;
      $http({
        method: "post",
        url: servicePath.updateArticle,
        header: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isOk) {
          message.success("文章修改成功");
        } else {
          message.error("文章修改失败");
        }
      });
    }
  };

  const selectTypeHandler = (value, option) => {
    setSelectType(option.children);
  };
  // 获取带有格式的当前时间
  const getNowTime = () => {
    let now = new Date();
    setShowDate(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  };
  // 改变Swith 的状态后的函数 设置是否发布
  const changeSwithInfo = (checked) => {
    checked ? setYnPublic(1) : setYnPublic(0);
    console.log("状态改变后----" + yn_public);
  };

  return (
    <div>
      <Skeleton active loading={isLoading} title paragraph>
        <Row gutter={10}>
          <Col span={15}>
            <Input
              placeholder="博客标题"
              size="large"
              value={articleTitle}
              onChange={(e) => {
                setArticleTitle(e.target.value);
              }}
            />
          </Col>
          <Col span={4} push={1}>
            <Space size={"middle"}>
              <Switch
                checkedChildren="发"
                unCheckedChildren="存"
                defaultChecked={yn_public ? true : false}
                onChange={changeSwithInfo}
              />
              <Select 
                defaultValue={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>

              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
            </Space>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={18}>
            <br />
            <Row gutter={10}>
              <Col span={12}>
                <TextArea
                  className="markdown-content"
                  rows={35}
                  value={articleContent}
                  placeholder="文章内容"
                  onChange={changeContent}
                />
              </Col>
              <Col span={12}>
                <div
                  className="show-html"
                  dangerouslySetInnerHTML={{ __html: marked(markdownContent) }}
                ></div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <br />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="文章简介"
                  onChange={changeIntro}
                  value={introducemd}
                  autoSize={{ minRows: 5 }}
                />
                <br />
                <br />
                <div
                  className="introduce-html"
                  dangerouslySetInnerHTML={{ __html: introducehtml }}
                ></div>
              </Col>
              <Col span={12}>
                <div className="date-select">
                  <ConfigProvider locale={zhCN}>
                    <DatePicker
                      placeholder="发布日期"
                      size="large"
                      value={moment(showDate, "YYYY-MM-DD")}
                      onChange={(date, dateString) => {
                        setShowDate(dateString);
                      }}
                    />
                  </ConfigProvider>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Skeleton>
    </div>
  );
}

export default AddArticle;
