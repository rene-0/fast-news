import { useTheme } from '@/ui/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

type LabeledIconProps = {
  label: string | number
  iconName: keyof typeof AntDesign.glyphMap
  color?: string
  size?: number
  style?: ViewStyle
}

export function LabeledIcon({ label, iconName, color, size = 18, style = {} }: LabeledIconProps) {
  const { color: themeColor } = useTheme()

  return (
    <View style={[defaultStyle.iconContainer, style]}>
      <AntDesign
        name={iconName}
        size={size}
        color={color || themeColor}
      />
      <Text style={[{ color }, defaultStyle.iconLabel]}>{label}</Text>
    </View>
  )
}

const defaultStyle = StyleSheet.create({
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
