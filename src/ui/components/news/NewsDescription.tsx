import { StyleSheet, Text } from 'react-native'

export function NewsDescription() {
  return (
    <Text
      numberOfLines={3}
      style={style.newsPreview}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, cumque eum. Dignissimos minima veritatis quisquam. Ex cumque et ullam, sed eum dicta modi quidem porro
      beatae quasi autem error facilis.
    </Text>
  )
}

const style = StyleSheet.create({
  newsPreview: {
    fontSize: 11,
    width: '100%',
    textAlign: 'justify',
    color: '#808080',
  },
})
