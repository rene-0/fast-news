import { NewsType } from '@/remote/types/data-types'
import { AppText } from '@/ui/components/app-text/AppText'
import { StyleSheet, View } from 'react-native'

type NewsContentProps = {
  content: NewsType['content']
  originalLink: NewsType['original_link']
}

export function NewsContent({ content, originalLink }: NewsContentProps) {
  return (
    <View style={style.newsContentContainer}>
      <AppText style={style.newsParagrapher}>{content.replace(/\\n/g, '\n')}</AppText>
      <AppText style={style.originalLink}>{originalLink}</AppText>
    </View>
  )
}

const style = StyleSheet.create({
  newsContentContainer: {
    paddingTop: 10,
  },
  newsParagrapher: {
    textAlign: 'justify',
  },
  originalLink: {
    color: 'blue',
  },
})
