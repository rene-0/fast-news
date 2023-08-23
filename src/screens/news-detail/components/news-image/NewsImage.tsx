import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRecoilValue } from 'recoil'
import { BookmarkButton } from './components/bookmar-button/BookmarkButton'
import { StarButton } from './components/star-button/StarButton'

type NewsImageProps = {
  imageUrl: string
  newsId: string
  changeTotalStars: (newTotalStars: number) => void
}

export function NewsImage({ imageUrl, newsId, changeTotalStars }: NewsImageProps) {
  const userAuth = useRecoilValue(userAuthState)

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }

  return (
    <View style={[style.newsImageRoot]}>
      <Image
        style={style.newsImage}
        source={{ uri: imageUrl || 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' }}
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
        {userAuth ? (
          <View>
            <StarButton
              newsId={newsId}
              changeTotalStars={changeTotalStars}
            />
            <BookmarkButton newsId={newsId} />
          </View>
        ) : (
          <></>
        )}
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
