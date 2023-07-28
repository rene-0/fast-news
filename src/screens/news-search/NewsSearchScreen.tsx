import { News } from '@/ui/components/news'
import { SearchInput } from '@/ui/components/search-input/SearchInput'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function NewsSearchScreen() {
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top }

  const navigation = useNavigation()

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle('dark')
    }
  }, [isFocused])

  return (
    <View style={[styles.newsSearchScreenContainer, safeAreaPadding]}>
      <SearchInput style={styles.searchInput} />
      <ScrollView style={styles.newsSearchItemsContainer}>
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  newsSearchScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  newsSearchItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInput: {
    paddingHorizontal: 20,
  },
})
