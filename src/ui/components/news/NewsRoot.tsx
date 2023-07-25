import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native'

export type NewsProps = {
  onPress?: () => void
  children: React.ReactNode
  style?: ViewStyle
} & PressableProps

export function NewsRoot({ onPress, children, style = {}, ...rest }: NewsProps) {
  return (
    <Pressable
      onPress={onPress}
      {...rest}
      style={[defaultStyle.newsContainer, style]}
    >
      <View style={defaultStyle.descriptionContainer}>{children}</View>
    </Pressable>
  )
}

const defaultStyle = StyleSheet.create({
  newsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    position: 'relative',
  },
  descriptionContainer: {
    flex: 1,
  },
})
