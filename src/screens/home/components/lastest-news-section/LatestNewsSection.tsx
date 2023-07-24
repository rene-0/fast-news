import { News } from '@/ui/components/news'
import { GenericStyles } from '@/ui/styles/generic-styles'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export function LatestNewsSection() {
  const navigation = useNavigation()

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  return (
    <View style={style.latestNewsContainer}>
      <ScrollView style={style.scrollableNewsContainer}>
        <Text style={style.latestNewsTitle}>Latest news</Text>
        <View style={style.newsContainer}>
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
        </View>
      </ScrollView>
      <LinearGradient
        style={style.viewMoreContainer}
        colors={['transparent', '#00000020', '#00000040', '#00000050', '#00000060']}
      >
        <Text style={[style.viewMore, GenericStyles.textShadow]}>View more</Text>
      </LinearGradient>
    </View>
  )
}

const style = StyleSheet.create({
  latestNewsContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    position: 'relative',
  },
  latestNewsTitle: {
    fontSize: 26,
    fontWeight: '700',
  },
  scrollableNewsContainer: {
    padding: 10,
    position: 'relative',
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
    color: 'white',
  },
  newsContainer: {
    marginBottom: 45,
  },
})
