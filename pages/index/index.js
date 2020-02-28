//引入封装的request
import request from '../../utils/request.js'
Page({
  data() {
    //轮播图数据
    carousel: []
  },
  onLoad() {
    //获取轮播图数据
    request({
      url: '/home/swiperdata'
    }).then(res => {
      console.log(res)
      //解构数据
      const {
        message
      } = res.data
      //赋值
      this.setData({
        carousel: message
      })
    })
  }
})