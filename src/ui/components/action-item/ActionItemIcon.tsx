import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'

type ActionItemIconProps = {
  name: keyof typeof AntDesign.glyphMap
  size?: number
  color?: string
}

export function ActionItemIcon({ size = 24, color = 'black', name }: ActionItemIconProps) {
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
      style={styles.actionItemIcon}
    />
  )
}

const styles = StyleSheet.create({
  actionItemIcon: {
    marginRight: 20,
  },
})
