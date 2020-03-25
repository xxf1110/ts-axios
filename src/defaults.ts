import { AxiosRequestConfig } from './type/dataInterface'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const defaults: AxiosRequestConfig = {
  method: 'get', //默认采用get方法请求数据
  timeout: 0, //默认实时提交
  headers: {
    common: {
      //每次提交都要加上该参数数据
      Accept: 'application/json, text/plain, */*' //定义接受的参数格式
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export { defaults }
