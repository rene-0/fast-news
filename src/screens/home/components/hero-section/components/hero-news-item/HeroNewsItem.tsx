import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { StyleSheet, Text, View } from 'react-native'

type HeroNewsItemProps = {
  width: number
}

export function HeroNewsItem({ width }: HeroNewsItemProps) {
  return (
    <View style={[styles.heroNewsItemContainer, { width }]}>
      <Text style={styles.heroTitle}>Home Tab</Text>
      <View style={styles.iconLabelContainer}>
        <LabeledIcon
          iconName='eye'
          label='366'
          color='black'
          textShadow={false}
        />
        <LabeledIcon
          iconName='clockcircle'
          label='13/12/1998'
          color='black'
          size={14}
          textShadow={false}
        />
        <LabeledIcon
          iconName='message1'
          label='366'
          color='black'
          size={14}
          textShadow={false}
        />
        <LabeledIcon
          iconName='star'
          label='89'
          color='black'
          size={14}
          textShadow={false}
        />
      </View>
      <Text style={styles.heroDescription}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, recusandae blanditiis unde odio sapiente ipsum neque quibusdam? Sapiente consequatur facilis quam
        pariatur, totam odit mollitia sit nam ducimus officia ipsa?
      </Text>
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
