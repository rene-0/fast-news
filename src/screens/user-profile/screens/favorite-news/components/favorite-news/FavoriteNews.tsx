import { LabeledIcon } from '@/ui/components/labeled-icon/LabeledIcon'
import { News } from '@/ui/components/news'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, Pressable, StyleSheet } from 'react-native'

type FavoriteType = {
  title: string
  description: string
  onDelete: () => void
}

export function Favorite({ title, description, onDelete }: FavoriteType) {
  const [isToggled, setIsToggled] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const { t } = useTranslation()

  const toggleAnimation = () => {
    setIsToggled((oldIsToggled) => !oldIsToggled)
    Animated.timing(fadeAnim, {
      toValue: !isToggled ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }

  const handleDeleteFavoriteNews = () => {
    onDelete()
    toggleAnimation()
  }

  return (
    <News.NewsRoot onPress={toggleAnimation}>
      <Animated.View style={[styles.animatedControllerContainer, { opacity: fadeAnim, zIndex: isToggled ? 10 : -10 }]}>
        <Pressable
          onPress={toggleAnimation}
          style={[styles.favoriteNewsControls, { backgroundColor: '#ffffff' }]}
        >
          <LabeledIcon
            iconName='close'
            label={t('Cancel')}
            color='black'
            size={26}
            style={{ flexDirection: 'column' }}
          />
        </Pressable>
        <Pressable
          onPress={handleDeleteFavoriteNews}
          style={[styles.favoriteNewsControls, { backgroundColor: '#161616' }]}
        >
          <LabeledIcon
            iconName='delete'
            label={t('Remove favorite')}
            color='white'
            size={26}
            style={{ flexDirection: 'column' }}
          />
        </Pressable>
      </Animated.View>
      <News.NewsTitle title={title} />
      <News.NewsDescription descriptionText={description} />
    </News.NewsRoot>
  )
}

const styles = StyleSheet.create({
  animatedControllerContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  favoriteNewsControls: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffffc9',
    flex: 1,
  },
})
