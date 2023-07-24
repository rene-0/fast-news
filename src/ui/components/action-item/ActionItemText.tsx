import { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

type ActionItemTextProps = {
  children: ReactNode
}

export function ActionItemText({ children }: ActionItemTextProps) {
  return <Text style={styles.actionItemText}>{children}</Text>
}

const styles = StyleSheet.create({
  actionItemText: {
    flex: 1,
    fontWeight: '500',
  },
})
