import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

type LabeledIconProps = {
  label: string | number
  iconName: keyof typeof AntDesign.glyphMap
  color?: string
  size?: number
}

export function LabeledIcon({ label, iconName, color = 'white', size = 18 }: LabeledIconProps) {
  return (
    <View style={style.iconContainer}>
      <AntDesign
        name={iconName}
        size={size}
        color={color}
        style={style.textShadow}
      />
      <Text style={[style.iconLabel, style.textShadow]}>{label}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textShadow: {
    textShadowColor: '#00000050',
    textShadowRadius: 1,
    textShadowOffset: { height: 1, width: 1 },
  },
  iconLabel: {
    color: 'white',
    marginLeft: 2,
    fontSize: 12,
    marginRight: 10,
  },
})
