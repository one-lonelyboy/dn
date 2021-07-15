// pages/settingGoodsType/index.js
const DB = wx.cloud.database().collection('goodsType')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTypeList: [],
    name: '',
    id:'',
    title: '',
    url: '',
    modalHidden: true
  },
  opens() {
    let that = this
    that.setData({
      modalHidden: true,
      id: '',
      name: '',
      url: ''
    })
  },
  //删除图片
  deleteImg(url){
    wx.cloud.deleteFile({
      fileList: [url]
    })
  },
  //上传图片
  addImage(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
    }).then(res=>{
      const tempFilePaths = res.tempFilePaths[0]
      const name = tempFilePaths.split('.')
      const ddd = name[name.length -1]
      const cloudPath = `goodsType/${new Date().getTime()}.${ddd}`
      const url = that.data.url ? JSON.parse(JSON.stringify(that.data.url)) : undefined
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: tempFilePaths,
        success(res) {
          console.log(res)
          if(url) {
            wx.cloud.deleteFile({
              fileList: [url]
            })
          }
          if(that.data.id) {
            DB.doc(that.data.id).update({
              data: {
                name: that.data.name,
                url: that.data.url,
              },
              success(res){
                console.log(res)
              }
            })
          }
          that.setData({
            url: res.fileID
          })
        }
      })
    })
  },
  //添加弹窗
  addDliog(titles){
    let that = this
    let tt = titles==1 ? '种类编辑' : "种类新增"
    that.setData({
      title:tt,
      modalHidden: false
    })
  },
  modalConfirm(){
    const that = this
    if(that.data.name) {
      if(that.data.title ==="种类编辑"){
        DB.doc(that.data.id).update({
          data: {
            name: that.data.name,
            url: that.data.url,
          },
          success(res){
            console.log(res)
            that.getList()
            that.opens()
          }
        })
      } else {
        DB.add({
          data: {
            name: that.data.name,
            number: 0,
            url: that.data.url,
          },
          success(res) {
            console.log(res)
            that.getList()
            that.opens()
          }
        })
      }
      
    }
  },
  deleteType(event) {
    let that = this
    let {id, url} = event.currentTarget.dataset
    DB.doc(id).remove({
      success(){
        that.showToast()
        that.getList()
        that.deleteImg(url)
      },
      
    })
  },
  showToast(title="成功",icon='success'){
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000
    }) 
  },
  inputName(e){
    this.setData({
      "name": e.detail.value
    })
  },
  //获取数据
  getList() {
    let that =this
    DB.get({
      success(res) {
        console.log(res)
        that.setData({
          goodsTypeList: res.data
         })
      }
    })
  },
  detailsType(event) {
    let that = this
    let {id,name, url} = event.currentTarget.dataset
    that.setData({
      id: id,
      name: name,
      url: url
    })
    that.addDliog(1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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