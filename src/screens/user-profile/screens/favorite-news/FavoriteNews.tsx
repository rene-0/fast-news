import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderControl } from '../components/header-control/HeaderControl'
import { Favorite } from './components/favorite-news/FavoriteNews'

export function FavoriteNews() {
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top, paddingBottom: insets.bottom }

  return (
    <View style={[styles.favoriteNewsContainer, safeAreaPadding]}>
      <HeaderControl titleText='Favorite News' />
      <ScrollView style={styles.favoriteContentContainer}>
        <View>
          <Favorite />
          <Favorite />
          <Favorite />
          <Favorite />
          <Favorite />
          <Favorite />
          <Favorite />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  favoriteNewsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  favoriteContentContainer: {
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  appLanguagePicker: {
    display: 'none',
  },
})
