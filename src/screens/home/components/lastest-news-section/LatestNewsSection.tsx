import { NewsType } from '@/remote/types/data-types'
import { AppText } from '@/ui/components/app-text/AppText'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

type LatestNewsSectionProps = {
  latestNews: NewsType[]
  isLatestNews: boolean
}

export function LatestNewsSection({ isLatestNews, latestNews }: LatestNewsSectionProps) {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const navigateToNewsDetail = (newsId: string) => {
    navigation.navigate('NewsDetailScreen', { newsId })
  }

  return (
    <RootView style={style.latestNewsContainer}>
      <LoadingWrapper
        isLoading={isLatestNews}
        style={style.indicator}
      >
        <View style={style.scrollableNewsContainer}>
          <View style={style.newsContainer}>
            {latestNews.map((news) => (
              <News.NewsRoot
                key={news.id}
                onPress={() => navigateToNewsDetail(news.id)}
              >
                <News.NewsImage uri={news.image_url} />
                <News.NewsTitle title={news.title} />
                <News.NewsIcons
                  commentCount={news.total_comments}
                  publishDate={''}
                  starCounts={news.total_stars}
                  viewCount={news.total_stars}
                />
                <News.NewsDescription descriptionText={news.description} />
              </News.NewsRoot>
            ))}
          </View>
        </View>
        <View style={style.viewMoreContainer}>
          <AppText style={style.viewMore}>{t('View more')}</AppText>
        </View>
      </LoadingWrapper>
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
  indicator: {
    marginTop: 80,
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
