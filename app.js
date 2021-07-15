// app.js
App({
  onLaunch() {
    // 云开发环境初始化
    wx.cloud.init({
      env:"dingneng-ldsdp"
    })
  //  ; wx.login({ success:function(){ wx.getUserInfo({  success:function(res){  var simpleUser = res.userInfo;  console.log(simpleUser.nickName);  } }); }})
  },
 
})
