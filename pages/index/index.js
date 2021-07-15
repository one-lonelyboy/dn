const db = wx.cloud.database()
Page({
  data: {
    swiperList1: [],
    goodsTypeList:[]
  },
  getdata() {
    let that = this
    db.collection("goodsList").where({
      hotswitch: true,
      newswitch: false
    }).limit(10).get({
       success(res) {
         wx.stopPullDownRefresh()
         let data =res.data
         that.setData({
          hotList:data
         })
       }
     })
     db.collection("goodsList").where({
      hotswitch: false,
      newswitch: true
    }).limit(10).get({
       success(res) {
         let data =res.data
         that.setData({
          newList:data
         })
       }
     })
     db.collection("goodsList").where({
      newswitch: true,
      hotswitch: true
    }).limit(10).get({
       success(res) {
         let data =res.data
         that.setData({
          browseList:data
         })
       }
     })
     db.collection("swiper").get({
      success(res) {
        console.log(res)
        that.setData({
         swiperList1:res.data
        })
      }
    })
    db.collection('goodsType').limit(8).get({
      success(res) {
        console.log(res)
        that.setData({
          goodsTypeList:res.data
        })
      }
    })
  },
  onLoad: function (options) {
    this.getdata()
  },
  onPullDownRefresh: function(){
    this.getdata()
  }
})
