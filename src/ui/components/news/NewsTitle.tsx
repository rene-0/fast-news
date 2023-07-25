import { StyleSheet, Text, TextProps } from 'react-native'

type NewsTitleProps = TextProps

export function NewsTitle({ ...rest }: NewsTitleProps) {
  return (
    <Text
      numberOfLines={rest.numberOfLines || 3}
      style={[style.newsTitle, rest.style]}
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
