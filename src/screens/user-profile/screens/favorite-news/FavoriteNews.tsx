import { createCollection, fireStoreDatabase, getDocsDataWithId } from '@/remote/firebase'
import { NewsType, StarType, ViewsType } from '@/remote/types/data-types'
import { userAuthState } from '@/ui/components/atoms'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { RootView } from '@/ui/components/root-view/RootView'
import {
  DocumentData,
  QueryConstraint,
  QueryDocumentSnapshot,
  Timestamp,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  startAfter,
  where,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useRecoilValue } from 'recoil'
import { HeaderControl } from '../components/header-control/HeaderControl'
import { Favorite } from './components/favorite-news/FavoriteNews'

type FavoriteNews = NewsType & { staredAt: StarType['stared_at']; favoriteId: string }

const queryLimit = 6

export function FavoriteNews() {
  const [favoriteNews, setFavoriteNews] = useState<FavoriteNews[]>([])
  const [isLoadingMoreNews, setIsLoadingMoreNews] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const { t } = useTranslation()

  const lastVisibleDocument = useRef<QueryDocumentSnapshot<NewsType, DocumentData>>()
  const reachedEndOfSearch = useRef(false)

  const getFavorites = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsLoadingMoreNews(true)
      const favoriteCollection = createCollection<StarType>('stars')
      const favoriteQuery = query(favoriteCollection, where('user_email', '==', userAuth.email))

      const favoriteNews = await getDocsDataWithId(favoriteQuery)
      const favoriteNewsId = favoriteNews.map((star) => star.news_id)
      if (favoriteNewsId.length <= 0) {
        return
      }

      const newsCollection = createCollection<NewsType>('news')
      const newsQueryConstraints: QueryConstraint[] = [where(documentId(), 'in', favoriteNewsId), limit(queryLimit)]

      const newsQuery = query(newsCollection, ...newsQueryConstraints)

      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot

      const newsWithViewedAt = docs.map((doc): FavoriteNews => {
        const favorite = favoriteNews.find((star) => star.news_id === doc.id)
        return {
          ...doc.data(),
          id: doc.id,
          staredAt: favorite?.stared_at || Timestamp.now(),
          favoriteId: favorite?.id || '',
        }
      })

      setFavoriteNews(newsWithViewedAt)
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
      const favoriteCollection = createCollection<ViewsType>('stars')
      const favoriteQuery = query(favoriteCollection, where('user_email', '==', userAuth.email))

      const favorites = await getDocsDataWithId(favoriteQuery)
      const favoritesId = favorites.map((favorite) => favorite.news_id)

      const newsCollection = createCollection<NewsType>('news')

      const queryConstraints: QueryConstraint[] = [where(documentId(), 'in', favoritesId), limit(queryLimit), startAfter(lastVisibleDocument.current)]

      const newsQuery = query(newsCollection, ...queryConstraints)
      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot

      const newsWithViewedAt = docs.map((doc): FavoriteNews => {
        const favorite = favorites.find((star) => star.news_id === doc.id)
        return {
          ...doc.data(),
          id: doc.id,
          staredAt: favorite?.viewed_at || Timestamp.now(),
          favoriteId: favorite?.id || '',
        }
      })

      setFavoriteNews((old) => [...old, ...newsWithViewedAt])
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = newsWithViewedAt.length < queryLimit
    } catch (error) {
      Alert.alert('Network Error!')
    } finally {
      setIsLoadingMoreNews(false)
    }
  }

  const deleteFavorite = async (newsId: string) => {
    try {
      if (!userAuth) {
        return
      }
      setIsLoadingMoreNews(true)

      const newsToBeDeleted = favoriteNews.find((news) => news.id === newsId)

      if (!newsToBeDeleted) {
        return
      }

      const starsCollection = createCollection<Omit<StarType, 'id'>>('stars')
      const hasStarQuery = query(
        starsCollection,
        where('user_email', '==', userAuth.email),
        where('news_id', '==', newsId),
        where(documentId(), '==', newsToBeDeleted.favoriteId),
        limit(1),
      )
      const stars = await getDocs(hasStarQuery)

      const newsCollection = createCollection<NewsType>('news')
      const newsDoc = doc(newsCollection, '/', newsId)
      const news = await getDoc(newsDoc)
      if (!news.exists()) {
        throw new Error("Document doesn't exits!")
      }
      const starsNumber = news.data().total_stars - 1
      if (stars.empty) {
        return
      }

      await runTransaction(fireStoreDatabase, async (transaction) => {
        transaction.delete(doc(fireStoreDatabase, 'stars', newsToBeDeleted.favoriteId))
        transaction.update(newsDoc, { total_stars: starsNumber })
      })
      setFavoriteNews((old) => old.filter((news) => news.favoriteId !== newsToBeDeleted.favoriteId))
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsLoadingMoreNews(false)
    }
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <RootView style={styles.favoriteNewsContainer}>
      <HeaderControl titleText={t('Favorite news')} />
      <LoadingWrapper
        style={styles.loadingWrapper}
        size={36}
        isLoading={isLoadingMoreNews}
      >
        <FlatList
          style={styles.favoriteContentContainer}
          data={favoriteNews}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreNews}
          renderItem={({ item }) => (
            <Favorite
              title={item.title}
              description={item.description}
              onDelete={() => deleteFavorite(item.id)}
            />
          )}
        />
      </LoadingWrapper>
    </RootView>
  )
}

const styles = StyleSheet.create({
  favoriteNewsContainer: {
    flex: 1,
  },
  favoriteContentContainer: {
    paddingHorizontal: 20,
  },
  loadingWrapper: {
    height: '100%',
  },
})
