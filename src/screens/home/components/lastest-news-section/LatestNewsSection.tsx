import { StyleSheet, Text, View } from 'react-native'
import { News } from './components/news/News'

export function LatestNewsSection() {
  return (
    <View style={style.latestNewsContainer}>
      <Text style={style.latestNewsTitle}>Latest news</Text>
      <View>
        <News />
        <News />
        <News />
        <News />
      </View>
      <View style={style.viewMoreContainer}>
        <Text style={style.viewMore}>View more</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  latestNewsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  latestNewsTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  viewMoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginTop: 10,
  },
  viewMore: {
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderColor: '#00000030',
    // elevation: 20,
  },
})
