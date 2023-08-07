import { useTheme } from '@/ui/hooks/useTheme'
import { Text, TextProps } from 'react-native'

type AppTextProps = TextProps

export function AppText({ ...rest }: AppTextProps) {
  const { color } = useTheme()

  return (
    <Text
      {...rest}
      style={[{ color }, rest.style]}
    >
      {rest.children}
    </Text>
  )
}
