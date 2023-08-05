import { useTheme } from '@/ui/hooks/useTheme'
import { StyleSheet, View } from 'react-native'
import { LabeledIcon } from '../labeled-icon/LabeledIcon'

export function NewsIcons() {
  const { color } = useTheme()

  return (
    <View style={style.iconLabelContainer}>
      <LabeledIcon
        iconName='eye'
        label='366'
        color={color}
      />
      <LabeledIcon
        iconName='clockcircle'
        label='13/12/1998'
        color={color}
        size={14}
      />
      <LabeledIcon
        iconName='message1'
        label='366'
        color={color}
        size={14}
      />
      <LabeledIcon
        iconName='star'
        label='89'
        color={color}
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
