import { CancelExeutor, CancelTokenSource, Canceler } from '../type/dataInterface'
import Cancel from './Cancel'

interface ResolvePromise {
  (reson?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(excutor: CancelExeutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })
    excutor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
  thorwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
