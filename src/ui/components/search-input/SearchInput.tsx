import { Button } from '@/ui/components/button/Button'
import { useTheme } from '@/ui/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { GestureResponderEvent, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import { LoadingWrapper } from '../loading-wrapper/LoadingWrapper'

type SearchInputProps = {
  onChangeText?: ((text: string) => void) | undefined
  onPress?: (((event: GestureResponderEvent) => void) & ((event: GestureResponderEvent) => void)) | null | undefined
  style?: StyleProp<ViewStyle>
  placeholder?: string | undefined
  isLoading: boolean
  textValue: string
}

export function SearchInput({ onChangeText, onPress, style, placeholder, isLoading, textValue }: SearchInputProps) {
  const { appTheme } = useTheme()
  return (
    <View style={[defaultStyles.searchContainer, style]}>
      <TextInput
        onChangeText={onChangeText}
        style={defaultStyles.searchInput}
        placeholder={placeholder}
        value={textValue}
      />
      <Button onPress={onPress}>
        <LoadingWrapper
          isLoading={isLoading}
          color={appTheme === 'light' ? 'white' : 'black'}
        >
          <AntDesign
            name='search1'
            size={18}
            color={appTheme === 'light' ? 'white' : 'black'}
          />
        </LoadingWrapper>
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
