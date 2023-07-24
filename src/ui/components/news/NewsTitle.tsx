import { StyleSheet, Text } from 'react-native'

export function NewsTitle() {
  return (
    <Text
      numberOfLines={3}
      style={style.newsTitle}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic praesentium nam nostrum voluptate blanditiis sit quasi, doloremque, fuga voluptatum dolorum totam nesciunt eum.
      Vel quis incidunt velit, laborum rem ad?
    </Text>
  )
}

const style = StyleSheet.create({
  newsTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20,
  },
})
