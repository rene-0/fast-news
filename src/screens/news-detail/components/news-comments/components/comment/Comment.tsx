import { Image, StyleSheet, Text, View } from 'react-native'

export function Comment() {
  return (
    <View style={styles.commentRoot}>
      <Image
        source={{
          uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
        }}
        style={styles.userImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>User name</Text>
        <View style={styles.userCommentContainer}>
          <Text style={styles.userComment}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione mollitia cupiditate qui provident commodi magni porro omnis distinctio vitae hic voluptate, iure illum
            eaque, voluptatem sapiente sed earum laborum numquam?
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentRoot: {
    flexDirection: 'row',
    flex: 1,
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
  },
  userCommentContainer: {
    flexDirection: 'row',
  },
  userComment: {
    flex: 1,
    textAlign: 'justify',
  },
})
