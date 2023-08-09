import { useRefHistory } from '@vueuse/core'
import { ref } from 'vue'

import type { PathKey } from '@/filesystem'

class History {
  cur
  info

  constructor() {
    this.cur = ref<PathKey | null>(null)
    this.info = useRefHistory(this.cur)
  }

  push(v: PathKey) {
    this.cur.value = v
  }
}

export const history = new History()
