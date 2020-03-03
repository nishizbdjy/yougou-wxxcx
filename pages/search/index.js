// pages/search/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前输入框的值
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //input事件
  inputshijian(e) {
    //获取赋值当前输入框的值
    this.setData({
      inputValue: e.detail.value
    })
    //搜索建议查询
    request({
      url: '/goods/qsearch',
      data: {
        query: this.data.inputValue
      }
    }).then(res => {
      console.log(res)
    })
  },
  //点击取消按钮事件
  cancel() {
    //将当前输入框绑定的值清空
    this.setData({
      inputValue: ''
    })
  }
})