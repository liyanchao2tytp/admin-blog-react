import React, { useState } from "react";
import "../static/css/AddArticle.css";
import marked from "marked";
// import hljs from "highlight";
// import "highlight.js/styles/monokai-sublime.css";
import { Row, Col, Input, Select, Button, Space, DatePicker } from "antd";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle() {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

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
    // highlight: function (code) {
    //   return hljs.highlightAuto(code).value;
    // },
  });
  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };
  const changeIntro = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" />
            </Col>
            <Col span={4} push={1}>
              <Space size={"middle"}>
                <Select defaultValue="1" size="large">
                  <Option value="1">视频教程</Option>
                </Select>
                <Button size="large" >暂存文章</Button>
                <Button type="primary" size="large" >
                  发布文章
                </Button>
              </Space>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <br />
              <br />
              <br />
            </Col>
            <Col span={24}>
              <TextArea
                placeholder="文章简介"
                onChange={changeIntro}
                autoSize={{ minRows: 5 }}
              />
              <br />
              <br />
              <div className="introduce-html"
                dangerouslySetInnerHTML={{__html:introducehtml}}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker placeholder="发布日期" size="large" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
