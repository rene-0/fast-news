import { Image, StyleSheet, Text, View } from 'react-native'

export function UserInfo() {
  return (
    <View style={styles.userContainer}>
      <Image
        style={styles.userAvatar}
        source={{
          uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
        }}
      />
      <View>
        <Text style={styles.userName}>User name</Text>
        <Text>rene.colombaro@hotmail.com</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userRoot: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#16161640',
    paddingBottom: 10,
    marginBottom: 10,
  },
  userAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginRight: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: '500',
  },
})
