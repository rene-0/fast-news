import { AppText } from '@/ui/components/app-text/AppText'
import { News } from '@/ui/components/news'
import { StyleSheet, View } from 'react-native'

export function NewsHeader() {
  return (
    <View>
      <AppText style={style.newsTitle}>Lorem ipsum dolor sit amet consectetur</AppText>
      <News.NewsIcons />
    </View>
  )
}

const style = StyleSheet.create({
  newsTitle: {
    fontWeight: '700',
    fontSize: 22,
  },
  iconLabelContainer: {
    flexDirection: 'row',
  },
})
