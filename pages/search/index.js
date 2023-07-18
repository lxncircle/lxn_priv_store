/* 
1输入框绑定 值改变事件 input事件
    1获取到输入框的值
    2合法性判断
    3检验通过 把输入框的值 发送到后台
    4返回的数据打印到页面上
2防抖（防止抖动） 定时器  节流
    0防抖 一般输入框中 防止重复输入  重复发送请求
    1节流 一般是用在页面下拉和上拉
    1定义全局的定时器id
*/
import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    isValue: '',
  },
  TimeId: -1,
  // 输入框的值改变  就会触发的事件
  handleInput(e) {
    // 1获取输入框的值
    const { value } = e.detail
    // 2检测合法性
    if (!value.trim()) {
      // 值不合法
      this.setData({
        goods: [],
        isFocus: false,
      })
      return 0
    }
    this.setData({
      isFocus: true,
    })
    // 3准备发送请求获取数据
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000)
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query) {
    const res = await request({
      url: '/goods/qsearch',
      data: { query },
    })
    this.setData({
      goods: res,
    })
  },
  //点击取消按钮
  handleCancel() {
    this.setData({
      isValue: '',
      isFocus: false,
      goods: [],
    })
  },
})
