import { useTheme } from '@/ui/hooks/useTheme'
import React from 'react'
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { AppText } from '../app-text/AppText'

type ButtonProp = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined
} & PressableProps

export function Button({ children, style, onPress, ...rest }: ButtonProp) {
  const { appTheme, detailColor } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={[defaultStyles.buttonRoot, { backgroundColor: appTheme === 'light' ? '#161616' : '#ffffff' }, style]}
      {...rest}
      android_ripple={{ color: rest?.android_ripple?.color || detailColor }}
    >
      <AppText style={{ color: appTheme === 'light' ? 'white' : '#161616' }}>{children}</AppText>
    </Pressable>
  )
}

const defaultStyles = StyleSheet.create({
  buttonRoot: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
})
