/*
*@Author:lyc
*@Date:2020-10-2821:33:58
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-18 21:12:14
*@Description:filecontent
*/


const servicePath = {
checkLogin:'admin/login',//检查用户名和密码登录页面
Logout:"admin/logout",//登出
getTypeInfo:'admin/getTypeInfo',//获取文章类型
addArticle:'admin/addArticle',//添加文章
addArticleType:'admin/addArticleType',//添加文章类型
updateArticle:'admin/updateArticle',//更新文章
getArticleList:'admin/getArticleList',//获取文章列表
delArticle:'admin/delArticle',//删除文章
getArticleById:'admin/getArticleById',//根据id获取文章
alterPublicState:'admin/alterPubState',//改变发布状态
alterTopState:'admin/alterTopState',//是否置顶
getRecycleArticleList:'admin/getRecycleList',//获取回收站文章列表
delArticleToRecycle:'admin/deleteToRecycle',//删除文章到回收站
}

export default servicePath;