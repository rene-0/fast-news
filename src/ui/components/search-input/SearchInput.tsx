import { Button } from '@/ui/components/button/Button'
import { AntDesign } from '@expo/vector-icons'
import { GestureResponderEvent, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'

type SearchInputProps = {
  onChangeText?: ((text: string) => void) | undefined
  onPress?: (((event: GestureResponderEvent) => void) & ((event: GestureResponderEvent) => void)) | null | undefined
  style?: StyleProp<ViewStyle>
}

export function SearchInput({ onChangeText, onPress, style }: SearchInputProps) {
  return (
    <View style={[defaultStyles.searchContainer, style]}>
      <TextInput
        onChangeText={onChangeText}
        style={defaultStyles.searchInput}
      />
      <Button
        onPress={onPress}
        android_ripple={{ color: '#ffffff' }}
      >
        <AntDesign
          name='search1'
          size={18}
          color='white'
        />
      </Button>
    </View>
  )
}

const defaultStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderRadius: 8,
    padding: 5,
    fontSize: 18,
  },
})
