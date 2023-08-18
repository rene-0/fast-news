import { createCollection, fireStoreDatabase } from '@/remote/firebase'
import { NewsType, StarType } from '@/remote/types/data-types'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { doc, getDoc, getDocs, limit, query, runTransaction, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRecoilValue } from 'recoil'

type NewsImageProps = {
  imageUrl: string
  newsId: string
  changeTotalStars: (newTotalStars: number) => void
}

export function NewsImage({ imageUrl, newsId, changeTotalStars }: NewsImageProps) {
  const [isMarked, setIsMarked] = useState(false)
  const [isStarLoading, setIsStarLoading] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }

  const isStarMarked = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsStarLoading(true)
      const starsCollection = createCollection('stars')
      const hasStarQuery = query(starsCollection, where('user_email', '==', userAuth.email), where('news_id', '==', newsId), limit(1))
      const stars = await getDocs(hasStarQuery)
      setIsMarked(!stars.empty)
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsStarLoading(false)
    }
  }

  const toggleStar = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsStarLoading(true)

      const starsCollection = createCollection<Omit<StarType, 'id'>>('stars')
      const hasStarQuery = query(starsCollection, where('user_email', '==', userAuth.email), where('news_id', '==', newsId), limit(1))
      const stars = await getDocs(hasStarQuery)

      const newsCollection = createCollection<NewsType>('news')
      const newsDoc = doc(newsCollection, '/', newsId)
      const news = await getDoc(newsDoc)
      if (!news.exists()) {
        throw new Error("Document doesn't exits!")
      }
      let starsNumber = news.data().total_stars
      let newIsMarked = false

      await runTransaction(fireStoreDatabase, async (transaction) => {
        if (stars.empty) {
          starsNumber++
          newIsMarked = true
          transaction.set(doc(starsCollection), { news_id: newsId, user_email: userAuth.email })
        } else {
          starsNumber--
          newIsMarked = false
          transaction.delete(doc(fireStoreDatabase, 'stars', stars.docs[0].id))
        }
        transaction.update(newsDoc, { total_stars: starsNumber })
      })
      setIsMarked(newIsMarked)
      changeTotalStars(starsNumber)
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsStarLoading(false)
    }
  }

  useEffect(() => {
    isStarMarked()
  }, [])

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
          <Button
            onPress={toggleStar}
            style={style.newsImageHeadButton}
          >
            <LoadingWrapper
              color='white'
              size={24}
              isLoading={isStarLoading}
            >
              <AntDesign
                name={isMarked ? 'star' : 'staro'}
                size={24}
                color='white'
              />
            </LoadingWrapper>
          </Button>
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
