import { AppText } from '@/ui/components/app-text/AppText'
import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { SearchInput } from '@/ui/components/search-input/SearchInput'
import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'

export function BookmarksScreen() {
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
        <SearchInput
          placeholder={t('Search a title')}
          onChangeText={(text) => console.log('pressed', text)}
        />
      </View>
      <ScrollView style={styles.newsContainer}>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.combinedNewsIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='book'
              label='13/03/1998'
              color='black'
              size={14}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.combinedNewsIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='book'
              label='13/03/1998'
              color='black'
              size={14}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.combinedNewsIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='book'
              label='13/03/1998'
              color='black'
              size={14}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.combinedNewsIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='book'
              label='13/03/1998'
              color='black'
              size={14}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.combinedNewsIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='book'
              label='13/03/1998'
              color='black'
              size={14}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.combinedNewsIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='book'
              label='13/03/1998'
              color='black'
              size={14}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
      </ScrollView>
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
    paddingHorizontal: 10,
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
    justifyContent: 'center',
  },
})
