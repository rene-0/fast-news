import { Image, StyleSheet } from 'react-native'

type NewsImageProps = {
  uri: string
}

export function NewsImage({ uri }: NewsImageProps) {
  return (
    <Image
      style={style.newsImage}
      source={{ uri }}
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
