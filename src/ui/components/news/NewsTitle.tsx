import { StyleSheet, TextProps } from 'react-native'
import { AppText } from '../app-text/AppText'

type NewsTitleProps = TextProps & { title: string }

export function NewsTitle({ title, ...rest }: NewsTitleProps) {
  return (
    <AppText
      numberOfLines={rest.numberOfLines || 3}
      style={[style.newsTitle, rest.style]}
    >
      {title}
    </AppText>
  )
}

const style = StyleSheet.create({
  newsTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20,
  },
})
