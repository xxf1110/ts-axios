const toString = Object.prototype.toString
//定义两个特殊参数数据格式的验证函数
export function isDate(val: any): val is Date {
  //验证是否是日期对象
  return toString.call(val) === '[object Date]'
}
// export function isObject(val: any): val is Object {//验证是否是普通对象
//   return val !== null && typeof val === 'object'
// }
export function isPlainObject(val: any): val is Object {
  // 是否为json对象
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
