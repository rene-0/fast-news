import { StyleSheet, View } from 'react-native'
import { LabeledIcon } from '../labeled-icon/LabeledIcon'

type NewsIconsProps = {
  viewCount: number
  publishDate: string
  commentCount: number
  starCounts: number
}

export function NewsIcons({ viewCount, commentCount, publishDate, starCounts }: NewsIconsProps) {
  return (
    <View style={style.iconLabelContainer}>
      <LabeledIcon
        iconName='eye'
        label={viewCount}
      />
      <LabeledIcon
        iconName='clockcircle'
        label={publishDate}
        size={14}
      />
      <LabeledIcon
        iconName='message1'
        label={commentCount}
        size={14}
      />
      <LabeledIcon
        iconName='star'
        label={starCounts}
        size={14}
      />
    </View>
  )
}

const style = StyleSheet.create({
  iconLabelContainer: {
    flexDirection: 'row',
  },
})
