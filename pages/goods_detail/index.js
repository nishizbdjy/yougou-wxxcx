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
  },
  // 点击展示大图
  handleimage(e){
    //当前索引
    const { index } = e.currentTarget.dataset
    console.log(e)
    //将当前图片数据改造
    let arr = this.data.detailsData.pics.map(v=>{
      return v.pics_big
    })
    wx.previewImage({
      current: this.data.detailsData.pics[index].pics_big,//当前的http链接
      urls: arr,//需要预览的图片的http链接列表
    })
  }
})
//客服 blue  bug 跳转购物车