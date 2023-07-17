import { GenericStyles } from '@/ui/styles/generic-styles'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

type LabeledIconProps = {
  label: string | number
  iconName: keyof typeof AntDesign.glyphMap
  color?: string
  size?: number
  textShadow?: boolean
}

export function LabeledIcon({ label, iconName, color = 'white', size = 18, textShadow = true }: LabeledIconProps) {
  return (
    <View style={style.iconContainer}>
      <AntDesign
        name={iconName}
        size={size}
        color={color}
        style={textShadow && GenericStyles.textShadow}
      />
      <Text style={[{ color }, style.iconLabel, textShadow && GenericStyles.textShadow]}>{label}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    marginLeft: 2,
    fontSize: 12,
    marginRight: 10,
  },
})
