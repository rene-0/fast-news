import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet } from 'react-native'
import { HeaderControl } from '../components/header-control/HeaderControl'

export function NewsHistory() {
  const navigation = useNavigation()

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  return (
    <RootView style={styles.newsHistoryContainer}>
      <HeaderControl titleText='News History' />
      <ScrollView style={styles.newsContainer}>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <News.NewsIcons />
          <News.NewsDescription />
        </News.NewsRoot>
      </ScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  newsHistoryContainer: {
    flex: 1,
  },
  newsContainer: {
    paddingHorizontal: 20,
  },
})
