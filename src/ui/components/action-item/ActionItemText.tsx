import { ReactNode } from 'react'
import { StyleSheet, TextProps } from 'react-native'
import { AppText } from '../app-text/AppText'

type ActionItemTextProps = {
  children: ReactNode
} & TextProps

export function ActionItemText({ children, ...rest }: ActionItemTextProps) {
  return (
    <AppText
      {...rest}
      style={[styles.actionItemText, rest.style]}
    >
      {children}
    </AppText>
  )
}

const styles = StyleSheet.create({
  actionItemText: {
    flex: 1,
    fontWeight: '500',
    marginHorizontal: 20,
  },
})
