import { Button } from '@/ui/components/button/Button'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

export function CategorySearch() {
  return (
    <View style={styles.categoriesSearchContainer}>
      <TextInput style={styles.categorySearchInput} />
      <Button android_ripple={{ color: '#ffffff' }}>
        <AntDesign
          name='search1'
          size={24}
          color='white'
        />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  categoriesSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categorySearchInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
  },
})
