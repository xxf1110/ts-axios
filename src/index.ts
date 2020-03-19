import { AxiosRequestConfig } from './type/dataInterface'
import { xhr } from './xhr'
import { bulidURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): void {
  return transformRequest(config.data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  console.log(111)
}

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  // 发送基本数据
  xhr(config)
}

export { axios }
