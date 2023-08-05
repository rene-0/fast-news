import { AppText } from '@/ui/components/app-text/AppText'
import { News } from '@/ui/components/news'
import { StyleSheet, View } from 'react-native'

type HeroNewsItemProps = {
  width: number
}

export function HeroNewsItem({ width }: HeroNewsItemProps) {
  return (
    <View style={[styles.heroNewsItemContainer, { width }]}>
      <AppText style={styles.heroTitle}>Home Tab</AppText>
      <News.NewsIcons />
      <AppText style={styles.heroDescription}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, recusandae blanditiis unde odio sapiente ipsum neque quibusdam? Sapiente consequatur facilis quam
        pariatur, totam odit mollitia sit nam ducimus officia ipsa?
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  heroNewsItemContainer: {
    paddingHorizontal: 3,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
  },
  heroDescription: {
    fontSize: 12,
    textAlign: 'justify',
  },
  iconLabelContainer: {
    flexDirection: 'row',
  },
})
