// pages/goodsList/index.js
let DB =  wx.cloud.database().collection("goodsList")
Page({

  /**
   * 页面的初始数据
   */
   getdata() {
    let that = this
    DB.get({
       success(res) {
         console.log(res)
         that.setData({
          goodsList:res.data
         })
       }
     })
  },
  deleteItem(event) {
    let that = this
    const item = event.currentTarget.dataset.item
    const swiperList = []
    const detailsList = []
    item.swiperList.forEach(item => {
      swiperList.push(item.url)
    });
    item.detailsList.forEach(item => {
      detailsList.push(item.url)
    });
    const url = [item.url, ...swiperList, ...detailsList]
    wx.showModal({
      title: "删除",
      content: "确认删除吗",
      success(){
        DB.doc(item._id).remove({
          success(){
             that.showToast()
             that.deleteData(url)
             that.getdata()
             that.typechange(item)
          }
        })
      }
    })
  },
  deleteData(url) {
    wx.cloud.deleteFile({
      fileList: [...url],
      success(res) {
         console.log(res)
      }
    })
  },
  showToast(title="成功",icon='success'){
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    }) 
  },
  async typechange(value) {
    const numbers =await wx.cloud.database().collection('goodsType').doc(value.type).get()
    const datas =numbers && numbers.data &&numbers.data
    wx.cloud.database().collection('goodsType').doc(value.type).update({data: {number: (datas.number-1)}})
  },
  data: {
      goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
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