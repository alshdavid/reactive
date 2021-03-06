import { Subject, Observable } from "@alshdavid/rxjs";
import { globalObject } from './global'

export enum ChangeEventType {
  Update,
  Add,
  Remove,
}

export class ChangeEvent {
  constructor(
    public type: ChangeEventType,
    public node: number,
    public childNode?: number,
  ) {}
}

export class State {
  public onEvent = new Subject<ChangeEvent>()
  public ignoreList: any[] = []
  public ignoreInstanceOfList: any[] = [Observable]

  pushEvent(changeEvent: ChangeEvent): void {
    setTimeout(() => this.onEvent.next(changeEvent))
  }

  isIgnored(target: any): boolean {
    for (const item of this.ignoreList) {
      if (target === item) return true
    }
    for (const item of this.ignoreInstanceOfList) {
      if (target instanceof item) return true
    }
    return false
  }
}

export const getState = (): State => {
  if (!globalObject['__REACTIVE_STATE_STATE__']) {
    globalObject['__REACTIVE_STATE_STATE__'] = new State()
  }
  return globalObject['__REACTIVE_STATE_STATE__']  
}

export const createNodeId = (): number => Math.round((Math.random() * 1000000000))

export const KEY = '__REACTIVE_STATE__'

