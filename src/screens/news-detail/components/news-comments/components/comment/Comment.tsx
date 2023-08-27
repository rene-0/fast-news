import { AppText } from '@/ui/components/app-text/AppText'
import { Image, StyleSheet, View } from 'react-native'

type CommentProps = {
  imageUrl: string
  userName: string
  comment: string
  userEmail: string
}

export function Comment({ imageUrl, comment, userName, userEmail }: CommentProps) {
  return (
    <View style={styles.commentRoot}>
      <Image
        source={{ uri: imageUrl || 'https://cdn-icons-png.flaticon.com/128/1814/1814249.png' }}
        style={styles.userImage}
      />
      <View style={styles.textContainer}>
        <AppText style={styles.userName}>{userName}</AppText>
        <AppText style={styles.userEmail}>{userEmail}</AppText>
        <View style={styles.userCommentContainer}>
          <AppText style={styles.userComment}>{comment}</AppText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentRoot: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16,
  },
  userEmail: {
    fontSize: 10,
    lineHeight: 10,
  },
  userCommentContainer: {
    flexDirection: 'row',
  },
  userComment: {
    flex: 1,
    textAlign: 'justify',
  },
})
