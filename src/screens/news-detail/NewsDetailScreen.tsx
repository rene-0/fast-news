import { RootView } from '@/ui/components/root-view/RootView'
import { useIsFocused } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { NewsComment } from './components/news-comments/NewsComment'
import { NewsContent } from './components/news-content/NewsContent'
import { NewsHeader } from './components/news-header/NewsHeader'
import { NewsImageCarousel } from './components/news-image-carousel/NewsImageCarousel'

export function NewsDetailScreen() {
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle('light')
    }
  }, [isFocused])

  return (
    <ScrollView style={style.newsDetailRoot}>
      <NewsImageCarousel />
      <RootView style={style.contentContainer}>
        <NewsHeader />
        <NewsContent />
        <NewsComment />
      </RootView>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  newsDetailRoot: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 10,
    padding: 10,
  },
})
