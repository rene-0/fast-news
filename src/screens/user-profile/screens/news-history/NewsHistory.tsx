import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { News } from '@/ui/components/news'
import { RootView } from '@/ui/components/root-view/RootView'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View } from 'react-native'
import { HeaderControl } from '../components/header-control/HeaderControl'

export function NewsHistory() {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const navigateToNewsDetail = () => {
    navigation.navigate('NewsDetailScreen', { newsId: 1 })
  }

  return (
    <RootView style={styles.newsHistoryContainer}>
      <HeaderControl titleText={t('History')} />
      <ScrollView style={styles.newsContainer}>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
        <News.NewsRoot onPress={navigateToNewsDetail}>
          <News.NewsTitle />
          <View style={styles.additionalIconContainer}>
            <News.NewsIcons />
            <LabeledIcon
              iconName='profile'
              label='13/03/2023'
              size={16}
            />
          </View>
          <News.NewsDescription />
        </News.NewsRoot>
      </ScrollView>
    </RootView>
  )
}

const styles = StyleSheet.create({
  newsHistoryContainer: {
    flex: 1,
  },
  newsContainer: {
    paddingHorizontal: 20,
  },
  additionalIconContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
