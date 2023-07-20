import { StyleSheet, Text, View } from 'react-native'
import { CommentInput } from './components/comment-input/CommentInput'
import { Comment } from './components/comment/Comment'

export function NewsComment() {
  return (
    <View style={styles.newsCommentRoot}>
      <Text style={styles.commentTittle}>Comments</Text>
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
