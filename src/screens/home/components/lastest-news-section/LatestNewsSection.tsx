import { GenericStyles } from '@/ui/styles/generic-styles'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { News } from './components/news/News'

export function LatestNewsSection() {
  return (
    <View style={style.latestNewsContainer}>
      <ScrollView style={style.scrollableNewsContainer}>
        <Text style={style.latestNewsTitle}>Latest news</Text>
        <View style={style.newsContainer}>
          <News />
          <News />
          <News />
          <News />
          <News />
          <News />
        </View>
      </ScrollView>
      <LinearGradient
        style={style.viewMoreContainer}
        colors={['transparent', '#0000001a', '#00000033', '#0000004d']}
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
    marginBottom: 5,
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
