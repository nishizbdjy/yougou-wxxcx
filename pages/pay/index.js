import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //授权
  handleUserInfo(e){
    console.log(e)
    //判断是否成功授权
    const { errMsg, encryptedData, rawData, iv, signature,} =e.detail
    if (errMsg =='getUserInfo:ok'){
    //将获取token的参数保存到本地
      //获取code
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求,获取token
            request({
              url:'/users/wxlogin',
              method:"POST",
              data:{
                encryptedData,
                rawData,
                iv,
                signature,
                code:res.code
              }
            }).then(res=>{
              console.log(res)
              //存储token到本地
              if(res.data.meta.msg=='登录成功'){
                wx.setStorageSync('token', res.data.message.token)
                wx.showToast({
                  title: '授权成功'
                })
                //返回上一个页面
                wx.navigateBack()
              }else{
                wx.showToast({
                  title: '请求失败'
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }else{
      wx.showToast({
        title:'取消授权'
      })
    }
  }
})