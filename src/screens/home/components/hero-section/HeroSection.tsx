import { formatTimeStamp } from '@/remote/firebase'
import { NewsType } from '@/remote/types/data-types'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { useTheme } from '@/ui/hooks/useTheme'
import { useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { DotPagination } from './components/dot-pagination/DotPagination'
import { HeroNewsItem } from './components/hero-news-item/HeroNewsItem'
import { ImageSlider } from './components/image-slider/ImageSlider'

const horizontalPaddingWidth = 20
const horizontalMarginWidth = 20
const containerMaxWidth = 600

type HeroSectionProps = {
  hightLightedNews: NewsType[]
  isHightLightedNewsLoading: boolean
}

export function HeroSection({ hightLightedNews, isHightLightedNewsLoading }: HeroSectionProps) {
  const [currentHeroNewsItemIndex, setCurrentHeroNewsItemIndex] = useState(0)

  const { width: windowWidth } = useWindowDimensions()

  const { backgroundColor, appTheme } = useTheme()
  const navigation = useNavigation()

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

  const navigateToNewsDetail = (newsId: string) => {
    navigation.navigate('NewsDetailScreen', { newsId })
  }

  return (
    <View style={styles.hero}>
      <ImageSlider
        imageSliderRef={heroImagesContainerRef}
        windowWidth={windowWidth}
        imagesUrl={hightLightedNews.map((news) => news.image_url)}
      />
      <View style={[styles.heroDescriptionContainer, { ...(appTheme === 'dark' ? styles.heroDescriptionContainerDarkTheme : {}), backgroundColor }]}>
        <LoadingWrapper isLoading={isHightLightedNewsLoading}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={setScrollItemCurrentIndex}
          >
            {hightLightedNews.map((news) => (
              <Pressable
                key={news.id}
                onPress={() => navigateToNewsDetail(news.id)}
              >
                <HeroNewsItem
                  width={heroNewsItemWidth}
                  title={news.title}
                  description={news.description}
                  messageCount={news.total_comments}
                  publishDate={formatTimeStamp(news.publish_date)}
                  starCounts={news.total_stars}
                  viewCount={news.total_views}
                />
              </Pressable>
            ))}
          </ScrollView>
          <DotPagination
            activeIndex={currentHeroNewsItemIndex}
            numberOfDots={hightLightedNews.length}
          />
        </LoadingWrapper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    zIndex: 1,
    marginBottom: 50,
  },
  heroImage: {
    height: 300,
  },
  heroDescriptionContainer: {
    width: '90%',
    height: 160,
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
    justifyContent: 'center',
  },
  heroDescriptionContainerDarkTheme: {
    elevation: 1,
    shadowColor: 'white',
  },
})
