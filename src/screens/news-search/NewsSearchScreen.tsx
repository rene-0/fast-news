import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { SearchInput } from '@/ui/components/search-input/SearchInput'
import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet } from 'react-native'

export function NewsSearchScreen() {
  const navigation = useNavigation()
  const { statusbarColor } = useTheme()
  const { t } = useTranslation()

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle(statusbarColor)
    }
  }, [isFocused, statusbarColor])

  return (
    <RootView style={styles.newsSearchScreenContainer}>
      <SearchInput
        placeholder={t('Search a title')}
        style={styles.searchInput}
      />
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
    </RootView>
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
