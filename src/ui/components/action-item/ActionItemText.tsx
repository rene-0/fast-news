import { ReactNode } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

type ActionItemTextProps = {
  children: ReactNode
} & TextProps

export function ActionItemText({ children, ...rest }: ActionItemTextProps) {
  return (
    <Text
      {...rest}
      style={[styles.actionItemText, rest.style]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  actionItemText: {
    flex: 1,
    fontWeight: '500',
    marginHorizontal: 20,
  },
})
