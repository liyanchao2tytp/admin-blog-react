/*
 * @Author: lyc
 * @Date: 2020-10-28 21:33:58
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-17 10:45:52
 * @Description: file content
 */
const ipUrl = 'http://localhost:7001/'

const servicePath = {
  checkLogin: ipUrl + 'admin/login',    // 检查用户名和密码 登录页面
  Logout: ipUrl + "admin/logout",       // 登出
  getTypeInfo: ipUrl + 'admin/getTypeInfo', //获取文章类型
  addArticle: ipUrl + 'admin/addArticle',  //添加文章
  addArticleType: ipUrl + 'admin/addArticleType',   //添加文章类型
  updateArticle: ipUrl + 'admin/updateArticle',//更新文章 
  getArticleList: ipUrl + 'admin/getArticleList',//获取文章列表
  delArticle: ipUrl + 'admin/delArticle',  // 删除文章
  getArticleById: ipUrl + 'admin/getArticleById',  //根据id获取文章
  alterPublicState: ipUrl + 'admin/alterPubState',    //改变发布状态
  alterTopState: ipUrl + 'admin/alterTopState',    // 是否置顶
  getRecycleArticleList: ipUrl + 'admin/getRecycleList',  //获取回收站文章列表
  delArticleToRecycle: ipUrl + 'admin/deleteToRecycle',  //删除文章到回收站
}

export default servicePath