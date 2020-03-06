// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址信息
    usersite: {},
    //本地购物车数据
    purchase:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //从本地获取地址
    this.setData({
      usersite: wx.getStorageSync('site') || {}
    })
  },
  //获取用户地址
  huoqudizhi() {
    wx.chooseAddress({
      success: (res) => {
        console.log(res)
        //赋值
        this.setData({
          usersite: res
        })
        //存储到本地
        wx.setStorageSync('site', res)
      },
      fail: () => {
        wx.showToast({
          title: '获取地址失败',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   //从本地获取到购物车数据
    this.setData({
      purchase: wx.getStorageSync('goods')||[]
    })
  },
  //数量的加
  numberjiajian(e){
  //当前点击的索引
    const { index } = e.currentTarget.dataset
    this.data.purchase[index].number+=1
    console.log(this.data.purchase)
    //改变数量
    this.setData({
      purchase: this.data.purchase
    })
  }
})