import { createCollection, formatTimeStamp, getDocsDataWithId } from '@/remote/firebase'
import { BookmarksType, NewsType } from '@/remote/types/data-types'
import { AppText } from '@/ui/components/app-text/AppText'
import { userAuthState } from '@/ui/components/atoms'
import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { DocumentData, QueryConstraint, QueryDocumentSnapshot, Timestamp, documentId, getDocs, limit, onSnapshot, query, startAfter, where } from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, RefreshControl, StyleSheet, View } from 'react-native'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRecoilValue } from 'recoil'

type BookmarkedNews = NewsType & { bookmarkedAt: BookmarksType['bookmarked_at'] }

const queryLimit = 5

export function BookmarksScreen() {
  const [bookMarkedNews, setBookMarkedNews] = useState<BookmarkedNews[]>([])
  const [isLoadingBookMarks, setIsLoadingBookmarks] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const navigation = useNavigation()
  const { statusbarColor } = useTheme()
  const { t } = useTranslation()

  const lastVisibleDocument = useRef<QueryDocumentSnapshot<NewsType, DocumentData>>()
  const reachedEndOfSearch = useRef(false)

  const navigateToNewsDetail = (newsId: string) => {
    navigation.navigate('NewsDetailScreen', { newsId })
  }

  const isFocused = useIsFocused()

  const getBookMarks = async () => {
    try {
      if (!userAuth) {
        return
      }

      setIsLoadingBookmarks(true)

      const bookmarksCollection = createCollection<BookmarksType>('bookmarks')
      const userBookmarksQuery = query(bookmarksCollection, where('user_email', '==', userAuth.email))
      const bookmarks = await getDocsDataWithId(userBookmarksQuery)
      const bookmarksIds = bookmarks.map((bookmark) => bookmark.news_id)

      if (bookmarksIds.length <= 0) {
        setBookMarkedNews([])
        return
      }

      const newsCollection = createCollection<NewsType>('news')
      const newsQueryConstraints: QueryConstraint[] = [where(documentId(), 'in', bookmarksIds), limit(queryLimit)]

      const newsQuery = query(newsCollection, ...newsQueryConstraints)

      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot
      const newsWithBookmarkedAt = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        bookmarkedAt: bookmarks.find((bookmark) => bookmark.news_id === doc.id)?.bookmarked_at || Timestamp.now(),
      }))

      setBookMarkedNews(newsWithBookmarkedAt)
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = false
    } catch (error) {
      Alert.alert('Network Error!')
    } finally {
      setIsLoadingBookmarks(false)
    }
  }

  const loadMoreNews = async () => {
    try {
      if (reachedEndOfSearch.current || !userAuth) {
        return
      }

      setIsLoadingBookmarks(true)
      const bookmarksCollection = createCollection<BookmarksType>('bookmarks')
      const userBookmarksQuery = query(bookmarksCollection, where('user_email', '==', userAuth.email))
      const bookmarks = await getDocsDataWithId(userBookmarksQuery)
      const bookmarksIds = bookmarks.map((bookmark) => bookmark.news_id)

      const newsCollection = createCollection<NewsType>('news')

      const queryConstraints: QueryConstraint[] = [where(documentId(), 'in', bookmarksIds), limit(queryLimit), startAfter(lastVisibleDocument.current)]

      const newsQuery = query(newsCollection, ...queryConstraints)
      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot

      const newsWithBookmarkedAt = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        bookmarkedAt: bookmarks.find((bookmark) => bookmark.news_id === doc.id)?.bookmarked_at || Timestamp.now(),
      }))

      setBookMarkedNews((old) => [...old, ...newsWithBookmarkedAt])
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = newsWithBookmarkedAt.length < queryLimit
    } catch (error) {
      Alert.alert('Network Error!')
    } finally {
      setIsLoadingBookmarks(false)
    }
  }

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle(statusbarColor)
    }
  }, [isFocused, statusbarColor])

  useEffect(() => {
    if (userAuth) {
      const bookmarksCollection = createCollection<BookmarksType>('bookmarks')
      const userBookmarksQuery = query(bookmarksCollection, where('user_email', '==', userAuth.email))
      const unsubscribe = onSnapshot(userBookmarksQuery, getBookMarks)
      return () => {
        unsubscribe()
      }
    } else {
      setBookMarkedNews([])
    }
  }, [userAuth])

  return (
    <RootView style={styles.bookmarksScreenContainer}>
      <View style={styles.headContainer}>
        <View style={styles.headLabeledIcons}>
          <LabeledIcon
            iconName='book'
            label=''
            size={24}
          />
          <AppText style={styles.screenTitle}>{t('Bookmarked news')}</AppText>
        </View>
      </View>
      <View style={styles.newsContainer}>
        {userAuth ? (
          <GestureHandlerRootView>
            <LoadingWrapper isLoading={isLoadingBookMarks}>
              <FlatList
                data={bookMarkedNews}
                keyExtractor={(item) => item.id}
                onEndReached={loadMoreNews}
                refreshControl={
                  <RefreshControl
                    enabled={true}
                    refreshing={isLoadingBookMarks}
                    onRefresh={getBookMarks}
                  />
                }
                renderItem={({ item }) => (
                  <News.NewsRoot onPress={() => navigateToNewsDetail(item.id)}>
                    <News.NewsTitle title={item.title} />
                    <View style={styles.combinedNewsIconContainer}>
                      <News.NewsIcons
                        commentCount={item.total_comments}
                        publishDate={formatTimeStamp(item.publish_date)}
                        starCounts={item.total_stars}
                        viewCount={item.total_stars}
                      />
                      <LabeledIcon
                        iconName='book'
                        label={formatTimeStamp(item.bookmarkedAt)}
                        color='black'
                        size={14}
                      />
                    </View>
                    <News.NewsDescription descriptionText={item.description} />
                  </News.NewsRoot>
                )}
              />
            </LoadingWrapper>
          </GestureHandlerRootView>
        ) : (
          <AppText style={styles.loginToSeeBookmarks}>{t('Login to see bookmarked news')}</AppText>
        )}
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  bookmarksScreenContainer: {
    flex: 1,
  },
  combinedNewsIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsContainer: {
    padding: 10,
  },
  headContainer: {
    paddingHorizontal: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
  },
  headLabeledIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  loginToSeeBookmarks: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
})
