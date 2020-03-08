// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地址信息
    usersite: {},
    //本地购物车数据
    purchase: [],
    //总价格
    sumPrice: 0,
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
    ///////////////
    //从本地获取到购物车数据
    this.setData({
      purchase: wx.getStorageSync('goods') || []
    })
    //计算总价格
    this.calculatesum()
  },

  //计算总价格
  calculatesum() {
    //价格变量
    let price = 0
    //将数组循环
    this.data.purchase.forEach(v => {
      //判断状态为选中才计算
      if (v.select) {
        price += Number(v.goods_price) * v.number
      }
    })
    //赋值
    this.setData({
      sumPrice: price.toFixed(2)
    })
    //修改本地数据
    wx.setStorageSync('goods', this.data.purchase)
  },
})