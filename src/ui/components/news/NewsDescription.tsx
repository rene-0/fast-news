import { useTheme } from '@/ui/hooks/useTheme'
import { StyleSheet } from 'react-native'
import { AppText } from '../app-text/AppText'

export function NewsDescription() {
  const { appTheme } = useTheme()
  return (
    <AppText
      numberOfLines={3}
      style={[style.newsPreview, { color: appTheme === 'light' ? '#808080' : '#e6e6e6' }]}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, cumque eum. Dignissimos minima veritatis quisquam. Ex cumque et ullam, sed eum dicta modi quidem porro
      beatae quasi autem error facilis.
    </AppText>
  )
}

const style = StyleSheet.create({
  newsPreview: {
    fontSize: 11,
    width: '100%',
    textAlign: 'justify',
  },
})
