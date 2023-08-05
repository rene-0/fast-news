import { AppText } from '@/ui/components/app-text/AppText'
import { useTheme } from '@/ui/hooks/useTheme'
import { Image, StyleSheet, View } from 'react-native'

export function UserInfo() {
  const { detailColor } = useTheme()

  return (
    <View style={[styles.userContainer, { borderBottomColor: detailColor }]}>
      <Image
        style={styles.userAvatar}
        source={{
          uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
        }}
      />
      <View>
        <AppText style={styles.userName}>User name</AppText>
        <AppText>rene.colombaro@hotmail.com</AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
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
