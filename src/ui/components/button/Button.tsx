import React from 'react'
import { GestureResponderEvent, Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

type ButtonProp = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined
} & PressableProps

export function Button({ children, style, onPress, ...rest }: ButtonProp) {
  return (
    <Pressable
      onPress={onPress}
      style={[defaultStyles.buttonRoot, style]}
      {...rest}
    >
      <Text style={defaultStyles.buttonText}>{children}</Text>
    </Pressable>
  )
}

const defaultStyles = StyleSheet.create({
  buttonRoot: {
    padding: 10,
    backgroundColor: '#161616',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
})
