import { useTheme } from '@/ui/hooks/useTheme'
import { ReactNode } from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

type LoadingWrapperProps = ActivityIndicatorProps & {
  isLoading: boolean
  children: ReactNode
}

export function LoadingWrapper({ isLoading, children, ...rest }: LoadingWrapperProps): JSX.Element {
  const { color: themeColor } = useTheme()
  return isLoading ? (
    <ActivityIndicator
      size={rest.size || 'small'}
      color={rest.color || themeColor}
      style={rest.style}
    />
  ) : (
    <>{children}</>
  )
}
