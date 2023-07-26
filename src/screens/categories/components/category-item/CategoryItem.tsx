import { AntDesign } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text } from 'react-native'

type CategoryItemProps = {
  iconName: keyof typeof AntDesign.glyphMap
  categoryName: string
  textColor: string
  backgroundColor: string
}

export function CategoryItem({ iconName, categoryName, textColor, backgroundColor }: CategoryItemProps) {
  return (
    <Pressable
      android_ripple={{ color: '#ffffff' }}
      style={[styles.categoryItem, { backgroundColor }]}
    >
      <AntDesign
        name={iconName}
        size={24}
        color={textColor}
        style={styles.categoryItemIcon}
      />
      <Text style={[styles.categoryItemLabel, { color: textColor }]}>{categoryName}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  categoryItemIcon: {
    marginRight: 15,
  },
  categoryItemLabel: {
    color: 'white',
    fontWeight: '900',
  },
})
