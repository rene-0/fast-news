import { useTheme } from '@/ui/hooks/useTheme'
import { ReactNode } from 'react'
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native'

type LoadingWrapperProps = {
  isLoading: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export function LoadingWrapper({ isLoading, children, style }: LoadingWrapperProps): JSX.Element {
  const { color: themeColor } = useTheme()
  return isLoading ? (
    <ActivityIndicator
      size='large'
      color={themeColor}
      style={style}
    />
  ) : (
    <>{children}</>
  )
}
