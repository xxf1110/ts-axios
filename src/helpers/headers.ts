import { isPlainObject, deepMerge } from './util'
import { Method } from '../type/dataInterface'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
    }
    delete headers[name]
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  if (!headers) {
    return
  }
  let parse = Object.create(null)
  headers.split('\r\n').forEach(line => {
    let lineArr = line.split(':')
    let [key, value] = lineArr
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim().replace(/"|'/g, '')
    }
    if (key === 'date') {
      lineArr.splice(0, 1)
      lineArr = lineArr.map(val => val.trim())
      parse[key] = lineArr.join(':')
    } else {
      parse[key] = value
    }
  })
  return parse
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers
  headers = deepMerge(headers.commom || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
