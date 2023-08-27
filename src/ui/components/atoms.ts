import { User } from 'firebase/auth'
import { atom } from 'recoil'

type AppConfigStates = {
  appTheme: 'light' | 'dark'
}

type UserAuth = {
  photoURL: User['photoURL']
  displayName: User['displayName']
  email: User['email']
}

export const appConfigStates = atom<AppConfigStates>({
  key: 'appConfigStates',
  default: {
    appTheme: 'light',
  },
})

export const userAuthState = atom<UserAuth | null>({
  key: 'userAuthState',
  default: null,
})
