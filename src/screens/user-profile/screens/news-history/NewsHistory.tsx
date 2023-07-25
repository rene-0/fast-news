import { News } from '@/ui/components/news'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderControl } from '../components/header-control/HeaderControl'

export function NewsHistory() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const safeAreaPadding = { paddingTop: insets.top, paddingBottom: insets.bottom }

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  return (
    <View style={[safeAreaPadding, styles.newsHistoryContainer]}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  newsHistoryContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  newsContainer: {
    paddingHorizontal: 20,
  },
})
