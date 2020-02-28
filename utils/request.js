//封装request
const request = (conifg) => {
  //判断用户是没有URL基准路径
  if (conifg.url.search(/^http/) === -1) {
    //拼接基准路径
    conifg.url = request.defaults.baseURL + conifg.url
  }
  //返回Promise
  return new Promise((resolve, reject) => {
    //将用户传递的数据对象
    wx.request({
      ...conifg,
      // 成功时调用.then
      success: (res) => {
        resolve(res)
      },
      //失败时调用.catch
      fail: (err) => {
        reject(err)
      },
      //不管成功失败都会执行的函数
      complete: (data) => {
        //调用错误执行函数，传入数据
        request.errors(data)
      }
    })
  })
}
//基准路径
request.defaults = {
  baseURL: ''
}
//存储错误信息的函数
request.errors = () => {

}
//错误处理函数
request.onError = (callback) => {
  //判断用户传递的是否是个函数
  if ((typeof callback) == 'function') {
    //将函数储存到errors函数里面
    request.errors = callback
  }
}
//暴露
export default request