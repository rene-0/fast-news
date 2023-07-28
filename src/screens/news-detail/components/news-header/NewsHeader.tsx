import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { StyleSheet, Text, View } from 'react-native'

export function NewsHeader() {
  return (
    <View>
      <Text style={style.newsTitle}>Lorem ipsum dolor sit amet consectetur</Text>
      <View style={style.iconLabelContainer}>
        <LabeledIcon
          iconName='eye'
          label='366'
          color='black'
        />
        <LabeledIcon
          iconName='clockcircle'
          label='13/12/1998'
          color='black'
          size={14}
        />
        <LabeledIcon
          iconName='message1'
          label='366'
          color='black'
          size={14}
        />
        <LabeledIcon
          iconName='star'
          label='89'
          color='black'
          size={14}
        />
      </View>
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
