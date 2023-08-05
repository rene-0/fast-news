import { RootView } from '@/ui/components/root-view/RootView'
import { ScrollView, StyleSheet, View } from 'react-native'
import { HeaderControl } from '../components/header-control/HeaderControl'
import { Favorite } from './components/favorite-news/FavoriteNews'

export function FavoriteNews() {
  return (
    <RootView style={styles.favoriteNewsContainer}>
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
    </RootView>
  )
}

const styles = StyleSheet.create({
  favoriteNewsContainer: {
    flex: 1,
  },
  favoriteContentContainer: {
    paddingHorizontal: 20,
  },
})
