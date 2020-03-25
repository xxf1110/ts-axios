import { AxiosRequestConfig } from '../type/dataInterface'
import { isPlainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    // 此处合并有bug
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat //选择不同的合并策略, 根据属性的不同 选择不同的函数, 如果没有特制的函数, 使用默认的函数处理
    config[key] = strat(config1[key], config2![key]) //执行合并
  }
  return config
}
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

const stratKeysFromVal2 = ['url', 'params', 'data'] // 特殊信息名
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers']
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
