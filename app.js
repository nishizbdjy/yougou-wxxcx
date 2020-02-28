//app.js
//引入封装的request
import request from './utils/request.js'
App({
  onLaunch: function() {
    //配置全局基准路径
    request.defaults.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
  }
})