import { atom } from 'recoil'

type AppConfigStates = {
  appTheme: 'light' | 'dark'
}

export const appConfigStates = atom<AppConfigStates>({
  key: 'appConfigStates',
  default: {
    appTheme: 'light',
  },
})
