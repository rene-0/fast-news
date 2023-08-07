import { Button } from '@/ui/components/button/Button'
import { useTheme } from '@/ui/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { GestureResponderEvent, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'

type SearchInputProps = {
  onChangeText?: ((text: string) => void) | undefined
  onPress?: (((event: GestureResponderEvent) => void) & ((event: GestureResponderEvent) => void)) | null | undefined
  style?: StyleProp<ViewStyle>
  placeholder?: string | undefined
}

export function SearchInput({ onChangeText, onPress, style, placeholder }: SearchInputProps) {
  const { appTheme } = useTheme()
  return (
    <View style={[defaultStyles.searchContainer, style]}>
      <TextInput
        onChangeText={onChangeText}
        style={defaultStyles.searchInput}
        placeholder={placeholder}
      />
      <Button onPress={onPress}>
        <AntDesign
          name='search1'
          size={18}
          color={appTheme === 'light' ? 'white' : 'black'}
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
