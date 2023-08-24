import { createCollection, formatTimeStamp, getDocsDataWithId } from '@/remote/firebase'
import { NewsType, ViewsType } from '@/remote/types/data-types'
import { AppText } from '@/ui/components/app-text/AppText'
import { userAuthState } from '@/ui/components/atoms'
import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { useNavigation } from '@react-navigation/native'
import { DocumentData, QueryConstraint, QueryDocumentSnapshot, Timestamp, documentId, getDocs, limit, query, startAfter, where } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useRecoilValue } from 'recoil'
import { HeaderControl } from '../components/header-control/HeaderControl'

type NewsWithViewedAt = NewsType & { viewedAt: ViewsType['viewed_at'] }

const queryLimit = 6

export function NewsHistory() {
  const [newsHistory, setNewsHistory] = useState<NewsWithViewedAt[]>([])
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const navigation = useNavigation()
  const { t } = useTranslation()

  const lastVisibleDocument = useRef<QueryDocumentSnapshot<NewsType, DocumentData>>()
  const reachedEndOfSearch = useRef(false)

  const navigateToNewsDetail = (newsId: string) => {
    navigation.navigate('NewsDetailScreen', { newsId })
  }

  const getHistory = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsLoadingMoreNews(true)
      const historyCollection = createCollection<ViewsType>('views')
      const historyQuery = query(historyCollection, where('user_email', '==', userAuth.email))

      const histories = await getDocsDataWithId(historyQuery)
      const historiesId = histories.map((history) => history.news_id)

      const newsCollection = createCollection<NewsType>('news')
      const newsQueryConstraints: QueryConstraint[] = [where(documentId(), 'in', historiesId), limit(queryLimit)]

      const newsQuery = query(newsCollection, ...newsQueryConstraints)

      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot

      const newsWithViewedAt = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        viewedAt: histories.find((history) => history.news_id === doc.id)?.viewed_at || Timestamp.now(),
      }))

      setNewsHistory(newsWithViewedAt)
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = newsWithViewedAt.length < queryLimit
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsLoadingMoreNews(false)
    }
  }

  const loadMoreNews = async () => {
    try {
      if (reachedEndOfSearch.current || !userAuth) {
        return
      }

      setIsLoadingMoreNews(true)
      const historyCollection = createCollection<ViewsType>('views')
      const historyQuery = query(historyCollection, where('user_email', '==', userAuth.email))

      const histories = await getDocsDataWithId(historyQuery)
      const historiesId = histories.map((history) => history.news_id)

      const newsCollection = createCollection<NewsType>('news')

      const queryConstraints: QueryConstraint[] = [where(documentId(), 'in', historiesId), limit(queryLimit), startAfter(lastVisibleDocument.current)]

      const newsQuery = query(newsCollection, ...queryConstraints)
      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot

      const newsWithViewedAt = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        viewedAt: histories.find((history) => history.news_id === doc.id)?.viewed_at || Timestamp.now(),
      }))

      setNewsHistory((old) => [...old, ...newsWithViewedAt])
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = newsWithViewedAt.length < queryLimit
    } catch (error) {
      Alert.alert('Network Error!')
    } finally {
      setIsLoadingMoreNews(false)
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <RootView style={styles.newsHistoryContainer}>
      <HeaderControl titleText={t('History')} />
      <LoadingWrapper
        isLoading={isLoadingMoreNews}
        style={styles.loadingWrapper}
        size={48}
      >
        {newsHistory ? (
          <FlatList
            data={newsHistory}
            keyExtractor={(item) => item.id}
            style={styles.newsContainer}
            onEndReached={loadMoreNews}
            renderItem={({ item }) => (
              <News.NewsRoot onPress={() => navigateToNewsDetail(item.id)}>
                <News.NewsTitle title={item.title} />
                <View style={styles.additionalIconContainer}>
                  <News.NewsIcons
                    commentCount={item.total_comments}
                    publishDate={formatTimeStamp(item.publish_date)}
                    starCounts={item.total_stars}
                    viewCount={item.total_views}
                  />
                  <LabeledIcon
                    iconName='profile'
                    label={formatTimeStamp(item.viewedAt)}
                    size={16}
                  />
                </View>
                <News.NewsDescription descriptionText={item.description} />
              </News.NewsRoot>
            )}
          />
        ) : (
          <AppText>{t('No history yet')}</AppText>
        )}
      </LoadingWrapper>
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
  additionalIconContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loadingWrapper: {
    height: '100%',
  },
})
