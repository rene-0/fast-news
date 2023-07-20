import { Button } from '@/ui/components/button/Button'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function NewsImageCarousel() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }

  return (
    <View style={[style.newsImageRoot]}>
      <Image
        style={style.newsImage}
        source={{
          uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
        }}
      />
      <View style={[style.newsImageHeadControl, safeAreaPadding]}>
        <Button
          style={style.newsImageHeadButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name='arrowleft'
            size={24}
            color='white'
          />
        </Button>
        <Button style={style.newsImageHeadButton}>
          <AntDesign
            name='staro'
            size={24}
            color='white'
          />
        </Button>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  newsImageRoot: {
    position: 'relative',
  },
  newsImage: {
    width: '100%',
    height: 300,
  },
  newsImageHeadControl: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
  },
  newsImageHeadButton: {
    backgroundColor: 'transparent',
  },
})
