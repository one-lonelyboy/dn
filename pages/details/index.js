// pages/goodsList/index.js
Page({

  /**
   * 页面的初始数据
   */
   getdata(id) {
    let that = this
     wx.cloud.database()
     .collection("goodsList")
     .where({
       '_id': id
     })
     .get({
       success(res) {
         const data = res.data[0]
         if(data.introduce) {
           data.introduces = data.introduce.split('/')
         }
         if(data.characteristic) {
          data.characteristics = data.characteristic.split('/')
        }
         that.setData({
          goodsList:res.data[0]
         })
       }
     })
  },
  data: {
      goodsList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getdata(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})