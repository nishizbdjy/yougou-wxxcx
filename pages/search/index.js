// pages/search/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前输入框的值
    inputValue: '',
    //当前请求的状态
    nowState: false,
    //存储上次请求的关键字
    lastKeyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //封装的搜索推荐关键字
  searchKeyword() {
    //判断状态是否为false
    if (this.data.nowState == false) {
      //进来后将门关上
      this.setData({
        nowState: true,
        lastKeyword: this.data.inputValue
      })
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.inputValue
        }
      }).then(res => {
        console.log(res)
        //将状态设为false
        this.setData({
          nowState: false
        })
        //判断当前请求的关键字与当前输入框的值是否一致
        if (this.data.lastKeyword !== this.data.inputValue) {
          //不一致就再请求一次
          this.searchKeyword()
        }
      })
    }
  },
  //input事件
  inputshijian(e) {
    //获取赋值当前输入框的值
    this.setData({
      inputValue: e.detail.value
    })
    //搜索建议查询
    this.searchKeyword()
  },
  //点击取消按钮事件
  cancel() {
    //将当前输入框绑定的值清空
    this.setData({
      inputValue: '',
    })
  }
})