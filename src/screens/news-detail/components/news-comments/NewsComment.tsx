import { AppText } from '@/ui/components/app-text/AppText'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { CommentInput } from './components/comment-input/CommentInput'
import { Comment } from './components/comment/Comment'

export function NewsComment() {
  const { t } = useTranslation()

  return (
    <View style={styles.newsCommentRoot}>
      <AppText style={styles.commentTittle}>{t('Comments')}</AppText>
      <CommentInput />
      <View style={styles.commentsContainer}>
        <Comment />
        <Comment />
        <Comment />
      </View>
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
})
