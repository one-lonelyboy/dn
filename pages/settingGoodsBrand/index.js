// pages/settingGoodsType/index.js
const DB = wx.cloud.database().collection('goodsBrand')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTypeList: [],
    name: '',
    id:'',
    title: '',
    modalHidden: true
  },
  opens() {
    let that = this
    that.setData({
      modalHidden: true,
      id: '',
      name: ''
    })
  },
  //添加弹窗
  addDliog(titles){
    let that = this
    let tt = titles==1 ? '品牌编辑' : "品牌新增"
    that.setData({
      title:tt,
      modalHidden: false
    })
  },
  modalConfirm(){
    const that = this
    if(that.data.name) {
      if(that.data.title ==="品牌编辑"){
        DB.doc(that.data.id).update({
          data: {
            name: that.data.name,
          },
          success(res){
            that.getList()
            that.opens()
          }
        })
      } else {
        DB.add({
          data: {
            name: that.data.name,
          },
          success(res) {
            that.getList()
            that.opens()
          }
        })
      }
      
    }
  },
  deleteType(event) {
    let that = this
    let {id} = event.currentTarget.dataset
    DB.doc(id).remove({
      success(){
        that.showToast()
        that.getList()
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
    let {id,name} = event.currentTarget.dataset
    that.setData({
      id: id,
      name: name,
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