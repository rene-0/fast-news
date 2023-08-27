import { createCollection, fireStoreDatabase } from '@/remote/firebase'
import { NewsType, StarType } from '@/remote/types/data-types'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { AntDesign } from '@expo/vector-icons'
import { Timestamp, doc, getDoc, getDocs, limit, query, runTransaction, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'

type StarButtonType = {
  newsId: string
  changeTotalStars: (newTotalStars: number) => void
}

export function StarButton({ newsId, changeTotalStars }: StarButtonType) {
  const [isStared, setIsStared] = useState(false)
  const [isStarLoading, setIsStarLoading] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const isStarMarked = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsStarLoading(true)
      const starsCollection = createCollection('stars')
      const hasStarQuery = query(starsCollection, where('user_email', '==', userAuth.email), where('news_id', '==', newsId), limit(1))
      const stars = await getDocs(hasStarQuery)
      setIsStared(!stars.empty)
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
          transaction.set(doc(starsCollection), { news_id: newsId, user_email: userAuth.email, stared_at: Timestamp.now() })
        } else {
          starsNumber--
          newIsMarked = false
          transaction.delete(doc(fireStoreDatabase, 'stars', stars.docs[0].id))
        }
        transaction.update(newsDoc, { total_stars: starsNumber })
      })
      setIsStared(newIsMarked)
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
          name={isStared ? 'star' : 'staro'}
          size={24}
          color='white'
        />
      </LoadingWrapper>
    </Button>
  )
}

const style = StyleSheet.create({
  newsImageHeadButton: {
    backgroundColor: 'transparent',
  },
})
