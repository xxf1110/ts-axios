import { AxiosRequestConfig } from "./type/dataInterface";

function xhr(config: AxiosRequestConfig) {
  const {method = 'get', url, data = null, params = null} = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)

}
export {xhr}
