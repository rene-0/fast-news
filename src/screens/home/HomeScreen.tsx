import { ScrollView, StyleSheet } from 'react-native'
import { HeroSection } from './components/hero-section/HeroSection'
import { LatestNewsSection } from './components/lastest-news-section/LatestNewsSection'

export function HomeScreen() {
  return (
    <ScrollView style={style.root}>
      <HeroSection />
      <LatestNewsSection />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
})
