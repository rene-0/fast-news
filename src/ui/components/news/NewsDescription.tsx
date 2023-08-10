import { useTheme } from '@/ui/hooks/useTheme'
import { StyleSheet } from 'react-native'
import { AppText } from '../app-text/AppText'

type NewsDescriptionProps = {
  descriptionText: string
}

export function NewsDescription({ descriptionText }: NewsDescriptionProps) {
  const { appTheme } = useTheme()

  return (
    <AppText
      numberOfLines={3}
      style={[style.newsPreview, { color: appTheme === 'light' ? '#808080' : '#e6e6e6' }]}
    >
      {descriptionText}
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
