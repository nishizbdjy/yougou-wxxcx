//引入封装的request
import request from '../../utils/request.js'
Page({
  data() {
    //轮播图数据
    carousel: []
    //商品导航栏数据
    navData: []
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
          console.log(v)
          v.url = '/pages/category/index'
        }
        return v
      })
      //赋值
      this.setData({
        navData: newData
      })
    })
  }
})