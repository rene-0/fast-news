import { useTheme } from '@/ui/hooks/useTheme'
import { View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type RootViewProps = ViewProps

export function RootView({ ...rest }: RootViewProps) {
  const { backgroundColor } = useTheme()
  const insets = useSafeAreaInsets()
  const safeAreaPadding = { paddingTop: insets.top }

  return (
    <View
      {...rest}
      style={[{ backgroundColor }, safeAreaPadding, rest.style]}
    >
      {rest.children}
    </View>
  )
}
