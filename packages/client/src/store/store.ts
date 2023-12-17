import { set } from '@/utils/set'
import { UserInfo } from '@/api/Auth/types'

export interface State {
  isLoggedIn: boolean
  user: UserInfo | null
}

class Store {
  private readonly state: State

  constructor() {
    const storedState = localStorage.getItem('appState')
    this.state = storedState
      ? JSON.parse(storedState)
      : {
          user: null,
          isLoggedIn: false,
        }
  }

  getState(): State {
    return this.state
  }

  set(path: string, value: unknown) {
    set(this.state, path, value)
    localStorage.setItem('appState', JSON.stringify(this.state))
  }
}

export default new Store()
