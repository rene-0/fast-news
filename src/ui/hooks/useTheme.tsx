import { useRecoilValue } from 'recoil'
import { appConfigStates } from '../components/atoms'

type ThemeConfig = {
  appTheme: 'dark' | 'light'
  statusbarColor: 'dark' | 'light'
  color: string
  backgroundColor: string
  detailColor: string
}

export function useTheme(): ThemeConfig {
  const { appTheme } = useRecoilValue(appConfigStates)

  const isLight = appTheme === 'light'

  return {
    appTheme,
    statusbarColor: isLight ? 'dark' : 'light',
    color: isLight ? 'black' : 'white',
    backgroundColor: isLight ? 'white' : '#161616',
    detailColor: isLight ? '#16161620' : '#ffffff20',
  }
}
