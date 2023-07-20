import { Button } from '@/ui/components/button/Button'
import { StyleSheet, TextInput, View } from 'react-native'

export function CommentInput() {
  return (
    <View style={styles.commentInputContainer}>
      <TextInput
        multiline
        style={styles.commentInput}
      />
      <Button>Comment</Button>
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
})
