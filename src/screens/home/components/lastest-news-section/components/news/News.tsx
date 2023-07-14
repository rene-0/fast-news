import { Image, StyleSheet, Text, View } from 'react-native'

export function News() {
  return (
    <View style={style.newsContainer}>
      <Image
        style={style.newsImage}
        source={{
          uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
        }}
      />
      <View style={style.descriptionContainer}>
        <Text style={style.newsTitle}>Some text</Text>
        <Text
          numberOfLines={3}
          style={style.newsPreview}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, cumque eum. Dignissimos minima veritatis quisquam. Ex cumque et ullam, sed eum dicta modi quidem porro
          beatae quasi autem error facilis.
        </Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  newsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  newsImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 10,
    height: 75,
  },
  newsTitle: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 18,
  },
  newsPreview: {
    width: '100%',
    textAlign: 'justify',
    color: '#808080',
  },
})
