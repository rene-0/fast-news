import { AppText } from '@/ui/components/app-text/AppText'
import { userAuthState } from '@/ui/components/atoms'
import { useTheme } from '@/ui/hooks/useTheme'
import { Image, StyleSheet, View } from 'react-native'
import { useRecoilValue } from 'recoil'

export function UserInfo() {
  const userAuth = useRecoilValue(userAuthState)

  const { detailColor } = useTheme()

  return (
    <View style={[styles.userContainer, { borderBottomColor: detailColor }]}>
      <Image
        style={styles.userAvatar}
        source={{ uri: userAuth?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1814/1814249.png' }}
      />
      <View>
        <AppText style={styles.userName}>{userAuth?.displayName}</AppText>
        <AppText>{userAuth?.email}</AppText>
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
    overflow: 'hidden',
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
