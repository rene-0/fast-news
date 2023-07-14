import { StyleSheet, View } from 'react-native'
import { HeroSection } from './components/hero-section/HeroSection'
import { LatestNewsSection } from './components/lastest-news-section/LatestNewsSection'

export function Home() {
  return (
    <View style={style.root}>
      <HeroSection />
      <LatestNewsSection />
    </View>
  )
}

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
})
