import { createCollection, getDocsDataWithId } from '@/remote/firebase'
import { NewsType } from '@/remote/types/data-types'
import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { limit, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { HeroSection } from './components/hero-section/HeroSection'
import { LatestNewsSection } from './components/lastest-news-section/LatestNewsSection'

export function HomeScreen() {
  const [frontPageNews, setFrontPageNews] = useState<NewsType[]>([])
  const [isFrontPageNewsLoading, setIsFrontPageNewsLoading] = useState(false)

  const isFocused = useIsFocused()
  const { backgroundColor } = useTheme()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle('light')
    }
  }, [isFocused])

  const getFrontPageNews = async () => {
    try {
      setIsFrontPageNewsLoading(true)
      const newsCollection = createCollection<NewsType>('news')
      const filteredDocs = query(newsCollection, orderBy('publish_date'), limit(10))

      const newLatestNews = await getDocsDataWithId(filteredDocs)

      setFrontPageNews(newLatestNews)
    } catch (error) {
      Alert.alert('Network error')
    } finally {
      setIsFrontPageNewsLoading(false)
    }
  }

  useEffect(() => {
    getFrontPageNews()
  }, [])

  return (
    <ScrollView style={[style.root, { backgroundColor }]}>
      <HeroSection
        hightLightedNews={frontPageNews.slice(0, 4)}
        isHightLightedNewsLoading={isFrontPageNewsLoading}
      />
      <LatestNewsSection
        isLatestNews={isFrontPageNewsLoading}
        latestNews={frontPageNews.slice(4)}
      />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
})
