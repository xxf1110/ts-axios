import { AxiosRequestConfig, AxiosResponse } from '../type/dataInterface'

export class AxiosError extends Error {
  //定义基本参数
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  constructor(
    message: string, //报错信息
    config: AxiosRequestConfig, //axios请求的配置文件
    code?: string | null, //错误状态代码
    request?: any, //XHR请求的实例对象
    response?: AxiosResponse //请求返回的数据信息
  ) {
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
