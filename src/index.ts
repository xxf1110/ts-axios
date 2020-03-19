import { AxiosRequestConfig, AxiosPromise } from './type/dataInterface'
import { xhr } from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): void {
  return transformRequest(config.data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  // 发送基本数据
  return xhr(config)
}

export { axios }
