import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CategoryItem } from './components/category-item/CategoryItem'
import { CategorySearch } from './components/category-search/CategorySearch'

export function CategoriesScreen() {
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top }

  return (
    <View style={[styles.categoriesScreenContainer, safeAreaPadding]}>
      <CategorySearch />
      <ScrollView style={styles.categoryItemsContainer}>
        <CategoryItem
          textColor='white'
          backgroundColor='#161616'
          iconName='pushpino'
          categoryName='Technology'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='green'
          iconName='home'
          categoryName='Retail'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#581845'
          iconName='pushpino'
          categoryName='Politics'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#C70039'
          iconName='pushpino'
          categoryName='Science'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#b30a0a'
          iconName='medicinebox'
          categoryName='Health & Lifestyle'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#419e60'
          iconName='enviroment'
          categoryName='Environment'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#1a0faa'
          iconName='play'
          categoryName='Entertainment'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#FFD700'
          iconName='pushpino'
          categoryName='Sports'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#1eb1a5'
          iconName='lock'
          categoryName='Crime'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#3d3c3c'
          iconName='areachart'
          categoryName='Finance & Business'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#881666'
          iconName='pushpino'
          categoryName='Arts & Culture'
        />
        <CategoryItem
          textColor='white'
          backgroundColor='#ff9100'
          iconName='earth'
          categoryName='Travel'
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  categoriesScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  categoryItemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
})
