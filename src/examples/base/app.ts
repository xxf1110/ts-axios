import axios from '../../index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     a: 1,
//     b: 2,
//     c: [1, 2]
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8' // 预设一个请求头部,不要忘记了charset哦
//   },
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then(res => {
//   console.log(res)
// })
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log(res)
})
