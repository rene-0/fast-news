import { ScrollView, StyleSheet, View } from 'react-native'
import { NewsComment } from './components/news-comments/NewsComment'
import { NewsContent } from './components/news-content/NewsContent'
import { NewsHeader } from './components/news-header/NewsHeader'
import { NewsImageCarousel } from './components/news-image-carousel/NewsImageCarousel'

export function NewsDetailScreen() {
  return (
    <ScrollView style={style.newsDetailRoot}>
      <NewsImageCarousel />
      <View style={style.contentContainer}>
        <NewsHeader />
        <NewsContent />
        <NewsComment />
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  newsDetailRoot: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 10,
  },
})
