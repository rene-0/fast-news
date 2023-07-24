import { Image, StyleSheet } from 'react-native'

export function NewsImage() {
  return (
    <Image
      style={style.newsImage}
      source={{
        uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
      }}
    />
  )
}

const style = StyleSheet.create({
  newsImage: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 5,
  },
})
