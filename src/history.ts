import { computed, type ComputedRef } from 'vue'
import { Persis } from './persis'

class History {
  info: Persis<{ active: string | null }>
  current: ComputedRef<string | null>

  constructor() {
    this.info = new Persis({
      active: null
    })
    this.current = computed(() => {
      return this.info.now().value.active
    })
  }

  push(v: string) {
    this.info.change(h => {
      h.active = v
    })
  }

  canUndo() {
    return this.info.canUndo
  }

  canRedo() {
    return this.info.canRedo
  }

  undo() {
    this.info.undo()
  }

  redo() {
    this.info.redo()
  }

  move(ofs: number) {
    this.info.move(ofs)
  }
}

export const history = new History()