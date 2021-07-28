// pages/update/index.js
const DB = wx.cloud.database().collection('goodsList')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     goodsData:{
       name: '',
       price: undefined,
       url: '',
       type: '',
       typeName: '',
       introduce:'',
       characteristic: '',
       swiperList: [],
       detailsList: [],
       newswitch: false,
       hotswitch: false,
       browse: 0,
       brand: '',
       brandname: '',
       specificationList: []
     },
     title: '',
     goodsId: undefined,
     url:'',
     options: [],
     optionsbrand: [],
     urlD: '',
     type: undefined,
     modalHidden: true,
     modalHiddenSp: true,
     titlesp: '规格新增',
     defaultOption:{},
     defaultOption1:{},
     typeId: undefined,
     spdata: {
       name:'',
       price: undefined
     }
  },
  //编辑产品规格
  updatesp(e){
    console.log(e.currentTarget.dataset)
    let data = e.currentTarget.dataset.item
    this.setData({
      'spdata': data,
      'modalHiddenSp': false,
      'titlesp': '规格编辑'
    })
  },
  deletes(e){
    let that = this
    let id = e.currentTarget.dataset.id
    let data = that.data.goodsData.specificationList.filter(item=>{
      return item.id !==id
    })
    that.setData({
      "goodsData.specificationList": data
    })
  },
  addspecification(){
    this.setData({
      'modalHiddenSp': false,
      titlesp: '规格新增'
    })
  },
  modalConfirmsp(){
    this.setData({
      'modalHiddenSp': true
    })
  },
  //删除轮播图图片
  deleteImage: function (e) {
    var that = this;
    var {id,url} = e.currentTarget.dataset;//获取当前长按图片下标
    wx.showModal({
     title: '提示',
     content: '确定要删除此图片吗？',
     success: function (res) {
      if (res.confirm) {
      that.deleteData(url)
       let list = that.data.goodsData.swiperList.filter(item=>{
           return item.id !== id
       })
       that.setData({
         "goodsData.swiperList": list
       })
      } else if (res.cancel) {
        console.log('点击取消了');
        return false;    
       }
     }
    })
   },
  //上传轮播图的视频和图片，支持多张上传
  getDetailsIamge(event){
    let that = this
    const {type,detype} = event.currentTarget.dataset
    const length = detype ? that.data.goodsData.detailsList.length : that.data.goodsData.swiperList.length
    if(length >= 6) return
    if(type && type ==="1") {
      const num = Number((6-length))
      wx.chooseImage({
        count: num,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
      }).then(res=>{
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach((item,index)=>{
          const name = item.split('.')
          const ddd = name[name.length -1]
          const cloudPath = `${new Date().getTime()}${index}.${ddd}`
          const id = `${new Date().getTime()}${index}`
          that.upImage(cloudPath,item,id, type,detype)
        })
      })
    } else if(type && type ==="2") {
      console.log('sss')
      wx.chooseVideo({
        sourceType: ['album','camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          const tempFilePaths = res.tempFilePath
          const name = tempFilePaths.split('.')
          const ddd = name[name.length -1]
          const cloudPath = `${new Date().getTime()}.${ddd}`
          const id = `${new Date().getTime()}`
          that.upImage(cloudPath,tempFilePaths,id,type,detype)
        }
      })
    }

  },
  upImage(cloudPath,filePath, id,type,detype) {
    let that = this
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
      success(res) {
        if(detype == 1) {
          that.data.goodsData.detailsList.push({
            id: id,
            url: res.fileID,
            type: type
          })
          that.setData({
            "goodsData.detailsList": that.data.goodsData.detailsList
          })
        } else {
          that.data.goodsData.swiperList.push({
            id: id,
            url: res.fileID,
            type: type
          })
          that.setData({
            "goodsData.swiperList": that.data.goodsData.swiperList
          })
        }
        
      },
      fail(err){
        console.log(err,'sss')
      }
    })
  },
  imgDilog(event){
    let that = this
    console.log(event)
    var image_path = event.currentTarget.dataset.url;
    let type = event.currentTarget.dataset.type || 1
    that.setData({
        urlD: image_path,
        type: type,
        modalHidden: false
      })
  },
  modalConfirm(){
    this.setData({
      modalHidden: true,
      spdata: {}
    })
  },
  modalConfirmOk(){
    let that = this
    let data = JSON.parse(JSON.stringify(that.data.goodsData.specificationList))
    if(that.data.spdata.name && that.data.spdata.price) {
      if(that.data.titlesp === '规格新增'){
        data.push({
          name: that.data.spdata.name,
          price: that.data.spdata.price,
          id: new Date().getTime()
        })
      } else {
        that.data.goodsData.specificationList.forEach((item,index)=>{
          if(item.id === that.data.spdata.id) {
            data[index] = that.data.spdata
          }
        })
      }
      that.setData({
        'goodsData.specificationList': data,
        'modalHiddenSp': true,
        'spdata': {}
      })

    }
  },
  //拿到商品种类
  change(event){
     let that = this
     that.data.defaultOption = event.detail
     that.setData({
       "goodsData.type": event.detail.id,
       "goodsData.typeName": event.detail.name,
       "defaultOption": that.data.defaultOption
     })
  },
  change1(event){
    let that = this
    that.data.defaultOption1 = event.detail
    that.setData({
      "goodsData.brand": event.detail.id,
      "goodsData.brandname": event.detail.name,
      "defaultOption1": that.data.defaultOption1
    })
 },
  //获取商品分类
  gettype() {
    let that = this
    wx.cloud.database().collection('goodsType').get({
      success(res){
        let data = res.data
        data.forEach(item => {
          item.id = item._id
        });
        that.setData({
          options: res.data
        })
      }
    })
    wx.cloud.database().collection('goodsBrand').get({
      success(res){
        console.log(res, 'optionsbrand')
        let data = res.data
        data.forEach(item => {
          item.id = item._id
        });
        that.setData({
          optionsbrand: res.data
        })
      }
    })
  },
  getIamge(){
    let that = this
    let url = JSON.parse(JSON.stringify(that.data.goodsData.url))
    that.setData({
      url: url
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        const name = tempFilePaths.split('.')
        const ddd = name[name.length -1]
        wx.cloud.uploadFile({
          cloudPath: `${new Date().getTime()}.${ddd}`,
          filePath: tempFilePaths,
          success(res) {
            that.setData({
              'goodsData.url':res.fileID
            })
          },
          fail(err){
            console.log(err,'sss')
          }
        })
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
  inputName(e){
    this.setData({
      "goodsData.name": e.detail.value
    })
  },
  inputspName(e){
    this.setData({
      "spdata.name": e.detail.value
    })
  },
  inputPrice(e){
    this.setData({
      "goodsData.price": e.detail.value
    })
  },
  inputspPrice(e){
    this.setData({
      "spdata.price": e.detail.value
    })
  },
  switch1Change(e) {
    this.setData({
      "goodsData.newswitch": e.detail.value
    })
  },
  switch2Change(e) {
    this.setData({
      "goodsData.hotswitch": e.detail.value
    })
  },
  bindTextAreaBlur(e){
    this.setData({
      "goodsData.introduce": e.detail.value
    })
  },
  bindTextAreaBlur2(e){
    console.log(e)
    this.setData({
      "goodsData.characteristic": e.detail.value
    })
  },
  async uploudData() {
    let that = this
      const numbers =await wx.cloud.database().collection('goodsType').doc(that.data.goodsData.type).get()
      const datas =numbers && numbers.data &&numbers.data
    if(that.data.title ==="新增") {
      const addData = datas ? await DB.add({data: that.data.goodsData}) : undefined
      if (addData){
        console.log(datas.number+1)
        const res = await wx.cloud.database().collection('goodsType').doc(that.data.goodsData.type).update({data: {number: (datas.number+1)}})
        console.log(res)
        wx.showModal({
          title: "成功",
          content: "新增成功",
          showCancel: false,
          success() {
            wx.navigateTo({
              url:'/pages/goodsSetUp/index'
            })
          }
        })
      }
    } else {
      that.data.goodsData['_openid'] = undefined
      that.data.goodsData['_id'] = undefined
      const updata = datas ? await DB.doc(that.data.goodsId).update({data: that.data.goodsData}) : undefined
      if(that.data.goodsData.type !== that.data.typeId && updata) {
        const numbers1 =await wx.cloud.database().collection('goodsType').doc(that.data.typeId).get()
        const datas1 =numbers && numbers.data &&numbers.data
         wx.cloud.database().collection('goodsType').doc(that.data.typeId).update({data: {number: (datas.number-1)}})
         wx.cloud.database().collection('goodsType').doc(that.data.goodsData.type).update({data: {number: (datas.number+1)}})
      }
      wx.showModal({
        title: "成功",
        content: "编辑成功",
        showCancel: false,
        success() {
          wx.navigateTo({
            url:'/pages/goodsSetUp/index'
          })
        }
      })
    }
   
  },
  //获取单个商品
  getGoods(id) {
    let that =this
    DB.where({
      '_id': id
    }).get({
      success(res) {
        console.log(res)
        const data = res.data[0]
        that.setData({
          "goodsData": data,
          "defaultOption.id":data.type,
          "defaultOption1.id":data.brand,
          "defaultOption.name":data.typeName,
          "defaultOption1.name":data.brandname,
          typeId: data.type
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that =this
    that.gettype()
    that.setData({
      goodsId: options.id
    })
    let title = options.type === "1" ? "新增" : "编辑"
    that.setData({
      title: title
    })
    if(title === "编辑")that.getGoods(options.id)
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