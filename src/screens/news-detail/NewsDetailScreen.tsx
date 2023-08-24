import { RootStackParamList } from '@/navigation/navigation-types'
import { createCollection, fireStoreDatabase, formatTimeStamp } from '@/remote/firebase'
import { NewsType, ViewsType } from '@/remote/types/data-types'
import { userAuthState } from '@/ui/components/atoms'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { RootView } from '@/ui/components/root-view/RootView'
import { useIsFocused } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { setStatusBarStyle } from 'expo-status-bar'
import { Timestamp, doc, getDoc, getDocs, query, runTransaction, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'
import { NewsComment } from './components/news-comments/NewsComment'
import { NewsContent } from './components/news-content/NewsContent'
import { NewsHeader } from './components/news-header/NewsHeader'
import { NewsImage } from './components/news-image/NewsImage'

type NewsDetailScreenProps = StackScreenProps<RootStackParamList, 'NewsDetailScreen', 'NewsDetailScreen'>

export function NewsDetailScreen({ route }: NewsDetailScreenProps) {
  const [news, setNews] = useState<NewsType>({
    id: '',
    content: '',
    description: '',
    image_url: '',
    language: '',
    original_link: '',
    publish_date: Timestamp.now(),
    title: '',
    total_comments: 0,
    total_stars: 0,
    total_views: 0,
  })
  const [isNewsLoading, setIsNewsLoading] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const newsId = route.params.newsId

  const isFocused = useIsFocused()
  const windowHeight = Dimensions.get('window').height

  const getNews = async () => {
    try {
      setIsNewsLoading(true)
      const newsCollection = createCollection<NewsType>('news')
      const docRef = doc(newsCollection, '/', newsId)

      const newsDoc = await getDoc(docRef)
      if (newsDoc.exists()) {
        setNews({ ...newsDoc.data(), id: newsDoc.id })
      }
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsNewsLoading(false)
    }
  }

  const markAsViewed = async () => {
    try {
      if (!userAuth) {
        return
      }
      const viewsCollection = createCollection<Omit<ViewsType, 'id'>>('views')
      const isViewedQuery = query(viewsCollection, where('news_id', '==', newsId), where('user_email', '==', userAuth.email))
      const viewDocs = await getDocs(isViewedQuery)
      if (!viewDocs.empty) {
        return
      }
      const viewDoc = doc(viewsCollection)

      const newsCollection = createCollection<NewsType>('news')
      const newsDoc = doc(newsCollection, '/', newsId)

      await runTransaction(fireStoreDatabase, async (transaction) => {
        const news = await transaction.get(newsDoc)
        if (!news.exists()) {
          throw new Error("News doesn't exists")
        }
        transaction.set(viewDoc, { news_id: newsId, user_email: userAuth.email, viewed_at: Timestamp.now() })
        transaction.update(newsDoc, { total_views: news.data().total_views + 1 })
      })
      setNews((old) => ({ ...old, total_views: old.total_views + 1 }))
    } catch (error) {
      Alert.alert('Network error!')
    }
  }

  const changeTotalStars = (newTotalStars: number) => {
    setNews((old) => ({ ...old, total_stars: newTotalStars }))
  }

  const changeTotalComments = (newTotalComments: number) => {
    setNews((old) => ({ ...old, total_comments: newTotalComments }))
  }

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle('light')
    }
  }, [isFocused])

  useEffect(() => {
    getNews()
    markAsViewed()
  }, [newsId, userAuth])

  return (
    <ScrollView style={style.newsDetailRoot}>
      <LoadingWrapper
        size='large'
        isLoading={isNewsLoading}
        style={{ height: windowHeight }}
      >
        <NewsImage
          newsId={newsId}
          imageUrl={news.image_url}
          changeTotalStars={changeTotalStars}
        />
        <RootView style={style.contentContainer}>
          <NewsHeader
            newsTitle={news.title}
            newsPublishDate={formatTimeStamp(news.publish_date)}
            newsCommentCount={news.total_comments}
            newsStarCount={news.total_stars}
            newsViewsCount={news.total_views}
          />
          <NewsContent
            content={news.content}
            originalLink={news.original_link}
          />
          <NewsComment
            changeTotalComments={changeTotalComments}
            newsId={newsId}
          />
        </RootView>
      </LoadingWrapper>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  newsDetailRoot: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 10,
    padding: 10,
  },
})
