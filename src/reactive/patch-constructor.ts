import { patchInstance, ProxyHandler } from "./observe-object"
import { createNodeId } from "./state"

export function patchConstructor<T>(Super: T): T {
  function Trapped(this: any, ...args: any[]) {
    const instance = Reflect.construct(Super as any, args, Trapped)
    return patchInstance(instance, [createNodeId()])
  }

  Trapped.prototype = new Proxy(
    Object.create((Super as any).prototype), 
    ProxyHandler(),
  )

  return Trapped as any
}
