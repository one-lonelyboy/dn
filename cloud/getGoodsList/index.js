// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database()
  .collection("goodsList")
  .limit(20)
  .skip(20 * event.pageNumber)
  .where(
    cloud.database().command.or([
      {
        name: cloud.database().RegExp({
          regexp: event.name,
          options: 'i'
        })
      }
    ])
  ).get()
}