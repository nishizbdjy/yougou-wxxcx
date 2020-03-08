// pages/cart/index.js
import request from '../../utils/request.js'
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
  //点击支付
  payment() {
    //判断本地是否有token，及地址
    //获取本地token
    const token = wx.getStorageSync('token')
    if (token) {
      //判断本地是否有地址
      const site = wx.getStorageSync('site')
      if (!site) {
        //提示用户请选择收货地址
        wx.showToast({
          title: '请选择收货地址'
        })
      } else {
        const {
          sumPrice,
          usersite,
          purchase
        } = this.data
        //改造商品数据
        const goods = purchase.map(v => {
          return {
            goods_id: v.goods_id,
            goods_number: v.number,
            goods_price: v.goods_price
          }
        })
        //创建订单
        request({
          url: '/my/orders/create',
          method: "POST",
          header: {
            Authorization: token
          },
          data: {
            order_price: sumPrice, //价格
            consignee_addr: usersite.userName + usersite.telNumber + usersite.provinceName +
              usersite.cityName + usersite.countyName + usersite.detailInfo, //地址
            goods //商品数据
          }
        }).then(res => {
          wx.showToast({
            title: '创建订单成功'
          })
          //订单编号
          const {
            order_number
          } = res.data.message
          //获取支付参数
          request({
            url: '/my/orders/req_unifiedorder',
            method: "post",
            header: {
              Authorization: token
            },
            data: {
              order_number
            }
          }).then(res => {
            //支付参数
            const {
              pay
            } = res.data.message
            //支付成功的回调(自己写的)
            pay.success=((res)=>{
              // console.log(res)
              wx.showToast({
                title: '支付成功'
              })
              // //将本地购物车数据中的本条数据删除
              // const purchase= this.data.purchase.map(v=>{
              //   //勾选的说明买了
              //   if(v.select===false){
              //     return {v}
              //   }
              // })
              //赋值到本地
              // wx.setStorageSync('goods', purchase)
              //跳转到购物车页
              wx.switchTab({
                url:'/pages/cart/index'
              })
            })
            //支付失败的回调(自己写的)
            pay.fail =((res)=>{
              wx.showToast({
                title: '取消支付'
              })
            })
            //调用支付
            wx.requestPayment(pay)
          })

        })
      }
    } else {
      //没有,跳转到授权页
      wx.navigateTo({
        url: '/pages/pay/index'
      })
    }
  }
})