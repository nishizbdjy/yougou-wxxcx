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
    lastKeyword: '',
    //推荐列表
    suggestList: [],
    //搜索历史
    search_history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取历史记录
    let arr = wx.getStorageSync('history')
    //判断arr是否等于数组
    if (!Array.isArray(arr)) {
      arr = []
    }
    //赋值
    this.setData({
      search_history: arr
    })
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
          nowState: false,
          //推荐列表赋值
          suggestList: res.data.message
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
    //判断有值才搜索
    if (!this.data.inputValue) {
      //将最后一次的数组清空(之前不用是因为它请求了空数据赋值,加了判断有值才搜索,要加上 )
      this.setData({
        suggestList: []
      })
      return
    }
    //搜索建议查询
    this.searchKeyword()
  },
  //input失焦事件
  inputshijiao() {
    //将推荐列表隐藏
    this.setData({
      //将推荐列表数据清空
      suggestList: []
    })
  },
  //用户回车事件
  huicheEnter() {
    //有值才执行
    if (!this.data.inputValue) return
    //将新数据添加到获取的数组前面
    this.data.search_history.unshift(this.data.inputValue)
    //数组去重
    let arr = [...new Set(this.data.search_history)]
    //将搜索历史存储到本地
    wx.setStorageSync('history', arr)
    //用户搜索回车跳转到商品列表页
    wx.redirectTo({
      url: '/pages/goods_list/index?keyword=' + this.data.inputValue
    })
  },
  //点击清空历史事件
  qingkongls() {
    //清空展示的
    this.setData({
      search_history: []
    })
    //清空本地
    wx.removeStorageSync('history')
  },
  //点击取消按钮事件
  cancel() {
    //将当前输入框绑定的值清空
    this.setData({
      inputValue: '',
      //将推荐列表数据清空
      suggestList: []
    })
  }
})