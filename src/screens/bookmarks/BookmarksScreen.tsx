import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { News } from '@/ui/components/news'
import { SearchInput } from '@/ui/components/search-input/SearchInput'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function BookmarksScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const safeAreaPadding = { paddingTop: insets.top }

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  return (
    <View style={[styles.bookmarksScreenContainer, safeAreaPadding]}>
      <View style={styles.headContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <LabeledIcon
            iconName='book'
            label=''
            color='black'
            size={24}
          />
          <Text style={styles.screenTitle}>Bookmarked news</Text>
        </View>
        <SearchInput onChangeText={(text) => console.log('pressed', text)} />
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
    </View>
  )
}

const styles = StyleSheet.create({
  bookmarksScreenContainer: {
    flex: 1,
    // paddingHorizontal: 10,
    backgroundColor: 'white',
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
})
