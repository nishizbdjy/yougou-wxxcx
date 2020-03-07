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
      //  console.log(res)
       const { message} =res.data
       //赋值
       this.setData({
         categoryList : message
       })
     })
  },
  //配置自定义tab页
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
})