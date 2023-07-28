import { MutableRefObject } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'

type ImageSliderProps = {
  windowWidth: number
  imageSliderRef: MutableRefObject<ScrollView | null>
  imagesUrl: string[]
}

export function ImageSlider({ imageSliderRef, windowWidth, imagesUrl }: ImageSliderProps) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      ref={(ref) => (imageSliderRef.current = ref)}
      pagingEnabled
    >
      {imagesUrl.map((uri) => (
        <Image
          key={uri}
          style={[styles.sliderImage, { width: windowWidth }]}
          source={{
            uri,
          }}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sliderImage: {
    height: 300,
  },
})
