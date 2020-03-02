// pages/goods_list/index.js
//引入封装的request
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前搜索关键字
    keyword: '',
    //页码
    pagenum:1,
    //页显示数
    pagesize:10,
    //搜索列表数据
    searchList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //赋值当前关键字
    this.setData({
      keyword: options.keyword
    })
    //获取列表数据
    console.log(this.data.keyword)
    request({
      url:'/goods/search',
      data:{
        query: this.data.keyword,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res=>{
      //赋值
      const { goods} = res.data.message
      //将价格添加小数点
      let newgoods = goods.map((v)=>{
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v 
      })
      this.setData({
        searchList: newgoods
      })
      console.log(res)
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