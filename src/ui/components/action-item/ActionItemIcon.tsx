import { useTheme } from '@/ui/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'

type ActionItemIconProps = {
  name: keyof typeof AntDesign.glyphMap
  size?: number
}

export function ActionItemIcon({ size = 24, name }: ActionItemIconProps) {
  const { color } = useTheme()
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
    />
  )
}
