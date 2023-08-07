import { AppText } from '@/ui/components/app-text/AppText'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

export function LatestNewsSection() {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  return (
    <RootView style={style.latestNewsContainer}>
      <View style={style.scrollableNewsContainer}>
        <View style={style.newsContainer}>
          <News.NewsRoot onPress={navigateToNewsDetail}>
            <News.NewsImage />
            <News.NewsTitle />
            <News.NewsIcons />
            <News.NewsDescription />
          </News.NewsRoot>
          <News.NewsRoot onPress={navigateToNewsDetail}>
            <News.NewsImage />
            <News.NewsTitle />
            <News.NewsIcons />
            <News.NewsDescription />
          </News.NewsRoot>
          <News.NewsRoot onPress={navigateToNewsDetail}>
            <News.NewsImage />
            <News.NewsTitle />
            <News.NewsIcons />
            <News.NewsDescription />
          </News.NewsRoot>
          <News.NewsRoot onPress={navigateToNewsDetail}>
            <News.NewsImage />
            <News.NewsTitle />
            <News.NewsIcons />
            <News.NewsDescription />
          </News.NewsRoot>
          <News.NewsRoot onPress={navigateToNewsDetail}>
            <News.NewsImage />
            <News.NewsTitle />
            <News.NewsIcons />
            <News.NewsDescription />
          </News.NewsRoot>
        </View>
      </View>
      <View style={style.viewMoreContainer}>
        <AppText style={style.viewMore}>{t('View more')}</AppText>
      </View>
    </RootView>
  )
}

const style = StyleSheet.create({
  latestNewsContainer: {
    flex: 1,
    paddingTop: 0,
    flexDirection: 'column',
    position: 'relative',
  },
  scrollableNewsContainer: {
    padding: 10,
    position: 'relative',
  },
  newsContainer: {
    marginBottom: 45,
  },
  viewMoreContainer: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginTop: 10,
    bottom: 0,
  },
  viewMore: {
    fontWeight: '900',
    paddingHorizontal: 25,
    paddingVertical: 4,
  },
})
