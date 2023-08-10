import { AppText } from '@/ui/components/app-text/AppText'
import { News } from '@/ui/components/news'
import { StyleSheet, View } from 'react-native'

type HeroNewsItemProps = {
  width: number
  title: string
  description: string
  messageCount: number
  publishDate: string
  starCounts: number
  viewCount: number
}

export function HeroNewsItem({ width, description, messageCount, publishDate, starCounts, title, viewCount }: HeroNewsItemProps) {
  return (
    <View style={[styles.heroNewsItemContainer, { width }]}>
      <AppText
        numberOfLines={1}
        style={styles.heroTitle}
      >
        {title}
      </AppText>
      <News.NewsIcons
        messageCount={messageCount}
        publishDate={publishDate}
        starCounts={starCounts}
        viewCount={viewCount}
      />
      <AppText
        numberOfLines={4}
        style={styles.heroDescription}
      >
        {description}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  heroNewsItemContainer: {
    paddingHorizontal: 3,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
  },
  heroDescription: {
    fontSize: 12,
    textAlign: 'justify',
  },
  iconLabelContainer: {
    flexDirection: 'row',
  },
})
