import { MutableRefObject } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'

type ImageSliderProps = {
  windowWidth: number
  imageSliderRef: MutableRefObject<ScrollView | null>
  imagesUrl: string[]
  isLoading: boolean
}

export function ImageSlider({ imageSliderRef, windowWidth, imagesUrl, isLoading }: ImageSliderProps) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      ref={(ref) => (imageSliderRef.current = ref)}
      pagingEnabled
    >
      {imagesUrl.length > 0 && !isLoading ? (
        imagesUrl.map((uri) => (
          <Image
            key={uri}
            style={[styles.sliderImage, { width: windowWidth }]}
            source={{ uri }}
          />
        ))
      ) : (
        <Image
          style={[styles.sliderImage, { width: windowWidth }]}
          source={require('assets/placeholder-image.png')}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sliderImage: {
    height: 300,
  },
})
