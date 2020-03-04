// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //存储详情信息的数组
    detailsData: [],
    //tab索引
    tabindex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const {
      id
    } = options
    //说去商品详情信息
    request({
      url: '/goods/detail',
      data: {
        goods_id: id
      }
    }).then(res => {
      console.log(res)
      let {
        message
      } = res.data
      //将价格添加小数
      message.goods_price = Number(message.goods_price).toFixed(2)
      //赋值
      this.setData({
        detailsData: message
      })
    })
  },
  //点击tab更换索引
  handletab(e) {
    //更换当前索引
    this.setData({
      tabindex: e.currentTarget.dataset.index
    })
  }
})