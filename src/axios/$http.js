/*
 * @Author: lyc
 * @Date: 2021-08-18 20:59:17
 * @LastEditors: lyc
 * @LastEditTime: 2021-08-18 21:13:18
 * @Description: file content
 */
import axios from "axios";
//设置请求得基准地址
axios.defaults.baseURL = 'http://localhost:7001/'
const $http = axios.create();
//设置请求头
$http.interceptors.request.use(config => {
    
    // 给请求头加上Authorization,authJWT的字段,值为token
    config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}`
    config.headers.authJWT = `Bearer ${localStorage.getItem('token')}`
    return config
})
  
//导出
export default $http;
