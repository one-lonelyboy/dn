// pages/swiper/index.js
const DB = wx.cloud.database().collection('swiper')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     swiperList: []
  },
  getSwiperList(){
    let that = this
     DB.get({
      success(res) {
        that.setData({
          swiperList: res.data
        })
      }
     })
  },
  getIamge(event){
    let that = this
    let { id, url } =event.currentTarget.dataset
    console.log(id, url)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths[0]
        const name = tempFilePaths.split('.')
        const ddd = name[name.length -1]
        wx.cloud.uploadFile({
          cloudPath: `swiper/${new Date().getTime()}.${ddd}`,
          filePath: tempFilePaths,
          success(res) {
            console.log(res, 'bbb')
            DB.doc(id).update({
              data: {
                url: res.fileID
              },
              success(res) {
                that.getSwiperList()
                that.deleteData(url)
                that.showToast()          
              },
              fail (res) {
                that.showToast('失败','error')
              }
            })
          },
          fail(err){
            console.log(err,'sss')
          }
        })
      }
    })
  },
  delte(event) {
    let that = this
    let { id, url } =event.currentTarget.dataset
    DB.doc(id).remove({
      success(){
        that.showToast()
        that.getSwiperList()     
        that.deleteData(url)
      }
    })
  },
  deleteData(url) {
    wx.cloud.deleteFile({
      fileList: [url],
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
  //添加
  addswiper(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths[0]
        const name = tempFilePaths.split('.')
        const ddd = name[name.length -1]
        wx.cloud.uploadFile({
          cloudPath: `swiper/${new Date().getTime()}.${ddd}`,
          filePath: tempFilePaths,
          success(res) {
            DB.add({
              data: {
                url: res.fileID
              },
              success(res) {
                that.getSwiperList()
                that.showToast()          
              },
              fail (res) {
                that.showToast('失败','error')
              }
            })
          },
          fail(err){
            console.log(err,'sss')
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getSwiperList()
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