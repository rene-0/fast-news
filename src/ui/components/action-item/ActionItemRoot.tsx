import { ReactNode } from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

type ActionItemRootProps = {
  children: ReactNode
} & PressableProps

export function ActionItemRoot({ children, ...rest }: ActionItemRootProps) {
  return (
    <Pressable
      android_ripple={{ color: '#16161620' }}
      style={styles.actionItemRoot}
      {...rest}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  actionItemRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderColor: '#16161640',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
})
