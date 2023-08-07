import { RootView } from '@/ui/components/root-view/RootView'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { HeaderControl } from '../components/header-control/HeaderControl'
import { Favorite } from './components/favorite-news/FavoriteNews'

export function FavoriteNews() {
  const { t } = useTranslation()

  return (
    <RootView style={styles.favoriteNewsContainer}>
      <HeaderControl titleText={t('Favorite news')} />
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
