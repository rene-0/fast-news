import { createCollection } from '@/remote/firebase'
import { BookmarksType } from '@/remote/types/data-types'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { FontAwesome } from '@expo/vector-icons'
import { Timestamp, deleteDoc, doc, getDocs, limit, query, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useRecoilValue } from 'recoil'

type BookmarkButtonType = {
  newsId: string
}

export function BookmarkButton({ newsId }: BookmarkButtonType) {
  const [isBookMarkLoading, setIsBookmarkLoading] = useState(false)
  const [isBookMarked, setIsBookMarked] = useState(false)

  const userAuth = useRecoilValue(userAuthState)

  const toggleBookMark = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsBookmarkLoading(true)

      const bookmarkCollection = createCollection<Omit<BookmarksType, 'id'>>('bookmarks')
      const hasBookmarkQuery = query(bookmarkCollection, where('user_email', '==', userAuth.email), where('news_id', '==', newsId), limit(1))
      const bookmark = await getDocs(hasBookmarkQuery)
      const isAlreadyBookmarked = bookmark.empty

      if (isAlreadyBookmarked) {
        const bookmarkDoc = doc(bookmarkCollection)
        await setDoc(bookmarkDoc, { bookmarked_at: Timestamp.now(), news_id: newsId, user_email: userAuth.email })
        setIsBookMarked(true)
      } else {
        await deleteDoc(doc(bookmarkCollection, bookmark.docs[0].id))
        setIsBookMarked(false)
      }
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsBookmarkLoading(false)
    }
  }

  const isBookmarked = async () => {
    try {
      if (!userAuth) {
        return
      }
      setIsBookmarkLoading(true)
      const bookmarkCollection = createCollection<Omit<BookmarksType, 'id'>>('bookmarks')
      const hasBookmarkQuery = query(bookmarkCollection, where('user_email', '==', userAuth.email), where('news_id', '==', newsId), limit(1))
      const bookmark = await getDocs(hasBookmarkQuery)

      setIsBookMarked(!bookmark.empty)
    } catch (error) {
      Alert.alert('Network error!')
    } finally {
      setIsBookmarkLoading(false)
    }
  }

  useEffect(() => {
    isBookmarked()
  }, [])

  return (
    <Button
      onPress={toggleBookMark}
      style={style.newsImageHeadButton}
    >
      <LoadingWrapper
        color='white'
        size={24}
        isLoading={isBookMarkLoading}
      >
        <FontAwesome
          name={isBookMarked ? 'bookmark' : 'bookmark-o'}
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
