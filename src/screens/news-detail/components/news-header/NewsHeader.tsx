import { AppText } from '@/ui/components/app-text/AppText'
import { News } from '@/ui/components/news'
import { StyleSheet, View } from 'react-native'

type NewsHeaderProps = {
  newsTitle: string
  newsPublishDate: string
  newsCommentCount: number
  newsViewsCount: number
  newsStarCount: number
}

export function NewsHeader({ newsCommentCount, newsPublishDate, newsTitle, newsViewsCount, newsStarCount }: NewsHeaderProps) {
  return (
    <View>
      <AppText style={style.newsTitle}>{newsTitle}</AppText>
      <News.NewsIcons
        commentCount={newsCommentCount}
        publishDate={newsPublishDate}
        starCounts={newsStarCount}
        viewCount={newsViewsCount}
      />
    </View>
  )
}

const style = StyleSheet.create({
  newsTitle: {
    fontWeight: '700',
    fontSize: 22,
  },
  iconLabelContainer: {
    flexDirection: 'row',
  },
})
