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
} from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl.js";
import moment from "moment";
import "moment/locale/zh-cn";
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

  let yn_public = 0; // 暂存或者发布文章
  let id = props.match.params.id;

  useEffect(() => {
    getTypeInfo();
    console.log(id);
    if (id) {
      setArticleId(id);
      getArticleById(id);
    } else {
      getNowTime()
      setIsLoading(false);
    }
  }, []);

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
  const getArticleById = (id) => {
    axios({
      method: "get",
      url: `${servicePath.getArticleById}/${id}`,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
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
    axios({
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
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.intro = introducemd;
    dataProps.addTime = new Date(showDate).getTime() / 1000;
    dataProps.is_public = yn_public;
    dataProps.is_top = 0;
    if (articleId === 0) {
      dataProps.view_count = 0;
      axios({
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
      axios({
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

  const selectTypeHandler = (value) => {
    setSelectType(value);
  };
  // 获取带有格式的当前时间
  const getNowTime = () => {
    let now = new Date();
    setShowDate(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
  };
  // 改变Swith 的状态后的函数 设置是否发布
  const changeSwithInfo = (checked) => {
    checked ? (yn_public = 1) : (yn_public = 0);
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
                defaultChecked
                onChange={changeSwithInfo}
              />
              <Select
                value={selectedType}
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
                  <DatePicker
                    placeholder="发布日期"
                    size="large"
                    value={moment(showDate, "YYYY-MM-DD")}
                    onChange={(date, dateString) => {
                      setShowDate(dateString);
                    }}
                  />
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
