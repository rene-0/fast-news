import React from 'react'
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

type ButtonProp = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined
}

export function Button({ children, style, onPress }: ButtonProp) {
  return (
    <Pressable
      onPress={onPress}
      style={[defaultStyles.buttonRoot, style]}
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
  },
  buttonText: {
    color: 'white',
  },
})
