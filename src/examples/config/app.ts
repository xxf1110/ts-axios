import axios from '../../index'

axios.defaults.headers.common['test2'] = 123
axios.defaults.headers.post['Content-Type'] = 'application/x-www-formurlencoded'
axios.defaults.timeout = 2000

axios({
  url: '/config/post',
  method: 'post',
  data: {
    a: 2
  }
}).then(res => {
  console.log(res.data)
})

// axios({
//     url: '/config/post',
//     method: 'post',
//     data: {
//         a: 1
//     },
//     headers: {
//         test: '321',
//     }
// }).then((res) => {
//     console.log(res.data)
// })
