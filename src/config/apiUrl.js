let ipUrl = 'http://127.0.0.1:7001/'

let servicePath = {
  checkLogin: ipUrl + 'admin/login',    // 检查用户名和密码 登录页面
  getTypeInfo: ipUrl + 'admin/getTypeInfo', //获取文章类型
}

export default servicePath