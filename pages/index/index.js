//引入封装的request
import request from '../../utils/request.js'
Page({
  data() {
    //轮播图数据
    carousel: []
    //商品导航栏数据
    navData: []
    //楼层数据
    floorData: []
    //返回顶部的显示
    inshow: false
  },
  onLoad() {
    //获取轮播图数据
    request({
      url: '/home/swiperdata'
    }).then(res => {
      //解构数据
      const {
        message
      } = res.data
      //赋值
      this.setData({
        carousel: message
      })
    })
    // 获取商品导航栏数据
    request({
      url: '/home/catitems'
    }).then(res => {
      //解构数据
      const {
        message
      } = res.data
      //改造数据添加路由
      let newData = message.map((v, i) => {
        // 第一个分类
        if (i === 0) {
          v.url = '/pages/category/index'
        }
        return v
      })
      //赋值
      this.setData({
        navData: newData
      })
    })
    // 获取楼层部分
    request({
      url: '/home/floordata',
    }).then(res => {
      console.log(res)
      //解构数据
      const {
        message
      } = res.data
      //赋值
      this.setData({
        floorData: message
      })
    })
  },
  // 返回顶部
  fanhuidb() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //页面滚动事件
  onPageScroll(e) {
    //不能频繁调用setData
    //将当前的状态赋值
    let inshow = this.data.inshow
    if (e.scrollTop > 150) {
      //赋true
      inshow = true
    } else {
      //赋false
      inshow = false
    }
    //判断值是否改变，没改变就return
    if(this.data.inshow === inshow) return
    //改变值
    this.setData({
      inshow: inshow
    })
  }
})