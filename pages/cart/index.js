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
    //从本地获取到购物车数据
    this.setData({
      purchase: wx.getStorageSync('goods') || []
    })
    //计算总价格
    this.calculatesum()
  },
  //数量的加
  numberjiajian(e) {
    //当前点击的索引
    const {
      index,
      jiajian
    } = e.currentTarget.dataset
    this.data.purchase[index].number += jiajian
    //判断当前的数量是否<=0是就将当前的商品删除
    if (this.data.purchase[index].number <= 0) {
      //提示用户
      wx.showModal({
        title: '提示',
        content: '你确认要删除该商品吗',
        success: (res) => {
          if (res.confirm) {
            this.data.purchase.splice(index, 1)
            //回调函数此时外面的赋值已经完成了，所以在赋值
            //改变数量
            this.setData({
              purchase: this.data.purchase
            })
            //计算总价格
            this.calculatesum()
          } else if (res.cancel) {
            this.data.purchase[index].number = 1
            //改变数量
            this.setData({
              purchase: this.data.purchase
            })
            //计算总价格
            this.calculatesum()
          }
        }
      })
    }
    //改变数量
    this.setData({
      purchase: this.data.purchase
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
      price += Number(v.goods_price) * v.number
    })
    //赋值
    this.setData({
      sumPrice: price
    })
    //修改本地数据
    wx.setStorageSync('goods', this.data.purchase)
  },
  //用户输入失焦事件
  shijiaoshijian(e){
   //当前的索引
    const { index } = e.currentTarget.dataset
    //当前的value值
    const { value } = e.detail
    //判断值是否合法
    if (value.lenght !== 0 && Math.floor(Number(value)) && Number(value)>=1){
      this.data.purchase[index].number = Number(value)
    }else{
      //不合法 =1
      this.data.purchase[index].number = 1
    }
    //赋值
    this.setData({
      purchase :this.data.purchase
    })
    //计算总价 修改本地
    this.calculatesum()
  }
})