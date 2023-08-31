import { createCollection, formatTimeStamp } from '@/remote/firebase'
import { NewsType } from '@/remote/types/data-types'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { SearchInput } from '@/ui/components/search-input/SearchInput'
import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { DocumentData, QueryConstraint, QueryDocumentSnapshot, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList, RefreshControl, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export function NewsSearchScreen() {
  const [searchedNews, setSearchedNews] = useState<NewsType[]>([])
  const [isLoadingNews, setIsLoadingNews] = useState(false)
  const [searchText, setSearchText] = useState('')

  const lastVisibleDocument = useRef<QueryDocumentSnapshot<NewsType, DocumentData>>()
  const reachedEndOfSearch = useRef(false)

  const navigation = useNavigation()
  const { statusbarColor } = useTheme()
  const { t } = useTranslation()

  const navigateToNewsDetail = (newsId: string) => {
    navigation.navigate('NewsDetailScreen', { newsId })
  }

  const isFocused = useIsFocused()

  const searchNews = async () => {
    try {
      setIsLoadingNews(true)
      const newsCollection = createCollection<NewsType>('news')

      const queryConstraints: QueryConstraint[] = [orderBy(searchText ? 'title' : 'publish_date'), limit(5)]

      if (searchText) {
        queryConstraints.push(where('title', '>=', searchText), where('title', '<=', searchText))
      }

      const newsQuery = query(newsCollection, ...queryConstraints)
      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot
      const news = docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      setSearchedNews(news)
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = false
    } catch (error) {
      Alert.alert('Network Error!')
    } finally {
      setIsLoadingNews(false)
    }
  }

  const loadMoreNews = async () => {
    try {
      if (reachedEndOfSearch.current) {
        return
      }

      setIsLoadingNews(true)
      const newsCollection = createCollection<NewsType>('news')

      const queryConstraints: QueryConstraint[] = [orderBy(searchText ? 'title' : 'publish_date'), limit(5), startAfter(lastVisibleDocument.current)]

      if (searchText) {
        queryConstraints.push(where('title', '>=', searchText), where('title', '<=', searchText))
      }

      const newsQuery = query(newsCollection, ...queryConstraints)
      const snapshot = await getDocs(newsQuery)
      const { docs } = snapshot
      const news = docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      setSearchedNews((old) => [...old, ...news])
      lastVisibleDocument.current = docs[docs.length - 1]
      reachedEndOfSearch.current = news.length < 5
    } catch (error) {
      Alert.alert('Network Error!')
    } finally {
      setIsLoadingNews(false)
    }
  }

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle(statusbarColor)
    }
  }, [isFocused, statusbarColor])

  useEffect(() => {
    searchNews()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootView style={styles.newsSearchScreenContainer}>
        <SearchInput
          isLoading={isLoadingNews}
          placeholder={t('Search a title')}
          style={styles.searchInput}
          onPress={searchNews}
          onChangeText={setSearchText}
          textValue={searchText}
        />
        <FlatList
          style={styles.newsSearchItemsContainer}
          data={searchedNews}
          keyExtractor={(item) => item.id}
          onEndReached={loadMoreNews}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={isLoadingNews}
              onRefresh={searchNews}
            />
          }
          renderItem={({ item: news }) => (
            <News.NewsRoot
              key={news.id}
              onPress={() => navigateToNewsDetail(news.id)}
            >
              <News.NewsImage uri={news.image_url} />
              <News.NewsTitle title={news.title} />
              <News.NewsIcons
                commentCount={news.total_comments}
                publishDate={formatTimeStamp(news.publish_date)}
                starCounts={news.total_stars}
                viewCount={news.total_views}
              />
              <News.NewsDescription descriptionText={news.description} />
            </News.NewsRoot>
          )}
        />
      </RootView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  newsSearchScreenContainer: {
    flex: 1,
  },
  newsSearchItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInput: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
})
