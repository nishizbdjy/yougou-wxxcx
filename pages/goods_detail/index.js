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
      // console.log(res)
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
  handleimage(e) {
    //当前索引
    const {
      index
    } = e.currentTarget.dataset
    // console.log(e)
    //将当前图片数据改造
    let arr = this.data.detailsData.pics.map(v => {
      return v.pics_big
    })
    wx.previewImage({
      current: this.data.detailsData.pics[index].pics_big, //当前的http链接
      urls: arr, //需要预览的图片的http链接列表
    })
  },
  //点击跳转到购物车页
  handlegwc() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  //点击加入购物车
  jiarugwc() {
    //将当前的商品添加到购物车
    //获取本地的购物车数据
    let goods = wx.getStorageSync('goods') || []
    //本地如果有数据就判断是否有相同的
    console.log(goods)
    const exit = goods.some(v => {
      if (v.goods_id === this.data.detailsData.goods_id) {
        //将当前的数量加一
        v.number+=1
        //提示用户
        wx.showToast({
          title:'该商品已存在+1'
        })
      }
      return v.goods_id === this.data.detailsData.goods_id
    })
    console.log(this.data.detailsData)
    //本地没有
    if (!exit) {
      //添加到本地数组中
      goods.unshift({
        goods_id: this.data.detailsData.goods_id, //id
        goods_name: this.data.detailsData.goods_name, //标题
        goods_price: this.data.detailsData.goods_price, //价格
        goods_small_logo: this.data.detailsData.goods_small_logo, //图片
        number: 1,
        select:true//商品默认的状态
      })
      //提示用户
      //提示用户
      wx.showToast({
        title: '添加成功'
      })
    }
    //添加到本地
    wx.setStorageSync('goods', goods)
  }
})
//客服 blue  bug 跳转购物车