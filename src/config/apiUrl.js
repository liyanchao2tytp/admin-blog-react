let ipUrl = 'http://127.0.0.1:7001/'

let servicePath = {
  checkLogin: ipUrl + 'admin/login',    // 检查用户名和密码 登录页面
  getTypeInfo: ipUrl + 'admin/getTypeInfo', //获取文章类型
  addArticle: ipUrl + 'admin/addArticle',  //添加文章
  updateArticle: ipUrl + 'admin/updateArticle',//更新文章 
}

export default servicePath