import { Pressable, StyleSheet, View } from 'react-native'

export type NewsProps = {
  onPress: () => void
  children: React.ReactNode
}

export function NewsRoot({ onPress, children }: NewsProps) {
  return (
    <Pressable
      onPress={onPress}
      style={style.newsContainer}
    >
      <View style={style.descriptionContainer}>{children}</View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  newsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  descriptionContainer: {
    flex: 1,
  },
})
