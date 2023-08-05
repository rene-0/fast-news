import { useTheme } from '@/ui/hooks/useTheme'
import React, { useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { DotPagination } from './components/dot-pagination/DotPagination'
import { HeroNewsItem } from './components/hero-news-item/HeroNewsItem'
import { ImageSlider } from './components/image-slider/ImageSlider'

const horizontalPaddingWidth = 20
const horizontalMarginWidth = 20
const containerMaxWidth = 600

export function HeroSection() {
  const [currentHeroNewsItemIndex, setCurrentHeroNewsItemIndex] = useState(0)
  const { width: windowWidth } = useWindowDimensions()

  const { backgroundColor } = useTheme()

  const paddingWhitespaceWidth = horizontalPaddingWidth * 2
  const marginWhitespaceWidth = horizontalMarginWidth * 2
  const combinedWitheSpaceWidth = paddingWhitespaceWidth + marginWhitespaceWidth
  const innerContainerWidth = Math.floor(windowWidth - combinedWitheSpaceWidth)
  const heroNewsItemWidth = innerContainerWidth > containerMaxWidth ? containerMaxWidth - paddingWhitespaceWidth : innerContainerWidth

  const setScrollItemCurrentIndex = (scrollEvent: NativeSyntheticEvent<NativeScrollEvent>) => {
    const momentumScrollEndWidth = Math.floor(scrollEvent.nativeEvent.contentOffset.x)
    const heroNewsItemIndex = Math.floor((momentumScrollEndWidth + combinedWitheSpaceWidth) / heroNewsItemWidth)

    if (heroNewsItemIndex != currentHeroNewsItemIndex) {
      setCurrentHeroNewsItemIndex(heroNewsItemIndex)
      heroImagesContainerRef.current?.scrollTo({ x: windowWidth * heroNewsItemIndex })
    }
  }

  const heroImagesContainerRef = useRef<ScrollView | null>(null)

  return (
    <View style={styles.hero}>
      <ImageSlider
        imageSliderRef={heroImagesContainerRef}
        windowWidth={windowWidth}
        imagesUrl={[
          'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
          'https://s2-g1.glbimg.com/M2mtMAagxfS2z1EwR3ebuOhrvng=/0x0:1024x683/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/A/J/MAnAB6Q3mrsyrXyouOqg/1112-agencias.jpg',
          'https://t.ctcdn.com.br/GPw9Gvy72xp8XEpTOhA8SQTQ4iM=/1200x675/smart/filters:format(webp)/i713012.jpeg',
          'https://icdn.football-espana.net/wp-content/uploads/2023/07/Oriol-Romeu-Barca-1.jpeg',
          'https://dynaimage.cdn.cnn.com/cnn/digital-images/org/ff9cc4af-d583-4cad-8205-a970b8faa9c2.JPG',
        ]}
      />
      <View style={[styles.heroDescriptionContainer, { backgroundColor }]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={setScrollItemCurrentIndex}
        >
          <HeroNewsItem width={heroNewsItemWidth} />
          <HeroNewsItem width={heroNewsItemWidth} />
          <HeroNewsItem width={heroNewsItemWidth} />
          <HeroNewsItem width={heroNewsItemWidth} />
          <HeroNewsItem width={heroNewsItemWidth} />
        </ScrollView>
        <DotPagination
          activeIndex={currentHeroNewsItemIndex}
          numberOfDots={5}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    zIndex: 1,
    marginBottom: 40,
  },
  heroImage: {
    height: 300,
  },
  heroDescriptionContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: -50,
    paddingHorizontal: horizontalPaddingWidth,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 12,
    marginHorizontal: horizontalMarginWidth,
    maxWidth: 600,
  },
})
