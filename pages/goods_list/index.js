// pages/goods_list/index.js
//引入封装的request
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前搜索关键字
    keyword: '',
    //页码
    pagenum: 1,
    //页显示数
    pagesize: 10,
    //搜索列表数据
    searchList: [],
    //底部的提示状态
    hintState: true,
    //请求的状态
    zhuangtai: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //赋值当前关键字
    this.setData({
      keyword: options.keyword
    })
    //获取列表数据
    console.log(this.data.keyword)
    //调用获取列表数据
    this.searchData()
  },
  //页面触底时触发
  onReachBottom() {
    //状态为true，说明加载完成后才执行
    if (this.data.zhuangtai) {
      //将当前页面加一
      this.setData({
        pagenum: this.data.pagenum + 1
      })
      //调用获取列表数据
      this.searchData()
    }
  },
  //封装的请求数据
  searchData() {
    //每次请求前将状态设为false
    this.setData({
      //将状态赋为false
      zhuangtai: false
    })
    //定时器模拟网络差
    setTimeout(() => {
      request({
        url: '/goods/search',
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
          pagesize: this.data.pagesize
        }
      }).then(res => {
        //赋值
        let {
          goods,
          total
        } = res.data.message
        //将数据添加到原来数组里面
        goods = [...this.data.searchList, ...goods]
        //将价格添加小数点
        let newgoods = goods.map((v) => {
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })
        this.setData({
          searchList: newgoods,
          //将当前状态设为true
          zhuangtai: true
        })
        //判断长度等于总长，将底部状态设为没数据
        if (this.data.searchList.length >= total) {
          this.setData({
            hintState: false,
            //将状态赋为false
            zhuangtai: false
          })
        }
      })
    }, 2000)
  }
})