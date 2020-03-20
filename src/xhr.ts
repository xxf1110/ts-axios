import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './type/dataInterface'
import { parseHeaders } from './helpers/headers'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null, headers, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
        return
      }
      //以字符串的形式返回所有用 CRLF(回车换行符) 分隔的响应头，如果没有收到响应，则返回 null
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }
  })
}
export { xhr }
