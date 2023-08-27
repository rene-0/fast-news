import { createCollection, fireStoreDatabase } from '@/remote/firebase'
import { CommentType, NewsType } from '@/remote/types/data-types'
import { AppText } from '@/ui/components/app-text/AppText'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { useRecoilValue } from 'recoil'

type CommentInputProps = {
  newsId: string
}

export function CommentInput({ newsId }: CommentInputProps) {
  const [commentText, setCommentText] = useState('')

  const userAuth = useRecoilValue(userAuthState)

  const { t } = useTranslation()

  const comment = async () => {
    try {
      if (userAuth && userAuth.displayName && userAuth.email && userAuth.photoURL) {
        const { email, displayName, photoURL } = userAuth
        const commentCollection = createCollection<Omit<CommentType, 'id'>>('comments')
        const commentDoc = doc(commentCollection)
        const newsCollection = createCollection<NewsType>('news')
        const newsDoc = doc(newsCollection, '/', newsId)
        await runTransaction(fireStoreDatabase, async (transaction) => {
          const news = await transaction.get(newsDoc)
          transaction.set(commentDoc, {
            news_id: newsId,
            comment: commentText,
            comment_date: serverTimestamp(),
            user_email: email,
            user_name: displayName,
            user_image: photoURL,
          })

          if (news.exists()) {
            transaction.update(newsDoc, { total_comments: news.data().total_comments + 1 })
          } else {
            throw new Error("Document doesn't exits!")
          }
        })
      } else {
        throw new Error('Invalid user')
      }
    } catch (error) {
      Alert.alert('Network error')
    } finally {
      setCommentText('')
    }
  }

  return (
    <View style={styles.commentInputContainer}>
      {!userAuth ? (
        <View style={styles.loginToComment}>
          <AppText>{t('Login to comment!')}</AppText>
        </View>
      ) : (
        <>
          <TextInput
            multiline
            style={styles.commentInput}
            value={commentText}
            onChangeText={(comment) => setCommentText(comment)}
            onSubmitEditing={comment}
          />
          <Button onPress={comment}>{t('Comment')}</Button>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  loginToComment: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
})
