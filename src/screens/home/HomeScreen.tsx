import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { HeroSection } from './components/hero-section/HeroSection'
import { LatestNewsSection } from './components/lastest-news-section/LatestNewsSection'

export function HomeScreen() {
  const isFocused = useIsFocused()
  const { backgroundColor } = useTheme()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle('light')
    }
  }, [isFocused])

  return (
    <ScrollView style={[style.root, { backgroundColor }]}>
      <HeroSection />
      <LatestNewsSection />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
})
