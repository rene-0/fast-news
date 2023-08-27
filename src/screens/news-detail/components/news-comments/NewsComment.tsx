import { createCollection, getDocsDataWithId } from '@/remote/firebase'
import { CommentType } from '@/remote/types/data-types'
import { AppText } from '@/ui/components/app-text/AppText'
import { DocumentData, Query, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, View } from 'react-native'
import { CommentInput } from './components/comment-input/CommentInput'
import { Comment } from './components/comment/Comment'

type NewsCommentProps = {
  newsId: string
  changeTotalComments: (newTotalComments: number) => void
}

export function NewsComment({ newsId, changeTotalComments }: NewsCommentProps) {
  const [comments, setComments] = useState<CommentType[]>([])
  const { t } = useTranslation()

  const getComments = async (commentQuery: Query<CommentType, DocumentData>) => {
    try {
      const comments = await getDocsDataWithId<CommentType>(commentQuery)
      setComments(comments)
    } catch (error) {
      Alert.alert('Network error')
    }
  }

  useEffect(() => {
    const commentCollection = createCollection<CommentType>('comments')
    const commentQuery = query(commentCollection, where('news_id', '==', newsId || ''), orderBy('comment_date'))
    getComments(commentQuery)
    const unsubscribe = onSnapshot(commentQuery, (doc) => {
      const newComments = doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setComments(newComments)
      changeTotalComments(newComments.length)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <View style={styles.newsCommentRoot}>
      <AppText style={styles.commentTittle}>{t('Comments')}</AppText>
      <CommentInput newsId={newsId} />
      {comments.length > 0 ? (
        <View style={styles.commentsContainer}>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment.comment}
              imageUrl={comment.user_image}
              userEmail={comment.user_email}
              userName={comment.user_name}
            />
          ))}
        </View>
      ) : (
        <View style={styles.noComments}>
          <AppText>{t('No comments yet, be the first to comment!')}</AppText>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  newsCommentRoot: {
    marginTop: 10,
  },
  commentTittle: {
    fontWeight: '700',
    fontSize: 18,
  },
  commentsContainer: {
    flex: 1,
  },
  noComments: {
    alignItems: 'center',
    alignContent: 'center',
    padding: 15,
  },
})
