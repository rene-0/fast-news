import { AntDesign } from '@expo/vector-icons'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

type UserActionsProps = {
  text: string
  icon: keyof typeof AntDesign.glyphMap
} & PressableProps

export function UserActions({ text, icon, ...rest }: UserActionsProps) {
  return (
    <Pressable
      android_ripple={{ color: '#16161620' }}
      style={styles.userActionsContainer}
      {...rest}
    >
      <AntDesign
        name={icon}
        size={24}
        color='black'
        style={styles.userActionsIcon}
      />
      <Text style={styles.userActionsText}>{text}</Text>
      <AntDesign
        name='right'
        size={24}
        color='black'
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  userActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#16161640',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
  userActionsIcon: {
    marginRight: 20,
  },
  userActionsText: {
    flex: 1,
    fontWeight: '500',
  },
})
