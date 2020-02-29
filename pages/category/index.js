import request from '../../utils/request.js'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前分类左边点击的索引
    pitch: 0,
    // 分类商品数据
    categoryList:[]
  },
  //点击左边分类触发
  xuanzhong(e) {
    //当前点击的索引
    const {
      index
    } = e.currentTarget.dataset
    //赋值 
    this.setData({
      pitch:index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     //获取分类
     request({
       url:'/categories',
     }).then(res=>{
       console.log(res)
       const { message} =res.data
       //赋值
       this.setData({
         categoryList : message
       })
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})