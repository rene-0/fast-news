import { ActionItem } from '@/ui/components/action-item'
import { AppText } from '@/ui/components/app-text/AppText'
import { RootView } from '@/ui/components/root-view/RootView'
import { useTheme } from '@/ui/hooks/useTheme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { LogOut } from './components/log-out/LogOut'
import { UserInfo } from './components/user-info/UserInfo'

export function UserProfile() {
  const navigation = useNavigation()
  const { statusbarColor } = useTheme()

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle(statusbarColor)
    }
  }, [isFocused])

  return (
    <RootView style={styles.userRoot}>
      <AppText style={styles.textTitle}>User profile</AppText>
      <UserInfo />
      <View>
        <ActionItem.ActionItemRoot onPress={() => navigation.navigate('UserSetting')}>
          <ActionItem.ActionItemIcon name='setting' />
          <ActionItem.ActionItemText>User settings</ActionItem.ActionItemText>
          <ActionItem.ActionItemIcon name='right' />
        </ActionItem.ActionItemRoot>
        <ActionItem.ActionItemRoot onPress={() => navigation.navigate('FavoriteNews')}>
          <ActionItem.ActionItemIcon name='staro' />
          <ActionItem.ActionItemText>Favorite news</ActionItem.ActionItemText>
          <ActionItem.ActionItemIcon name='right' />
        </ActionItem.ActionItemRoot>
        <ActionItem.ActionItemRoot onPress={() => navigation.navigate('NewsHistory')}>
          <ActionItem.ActionItemIcon name='profile' />
          <ActionItem.ActionItemText>History</ActionItem.ActionItemText>
          <ActionItem.ActionItemIcon name='right' />
        </ActionItem.ActionItemRoot>
      </View>
      <LogOut />
    </RootView>
  )
}

const styles = StyleSheet.create({
  userRoot: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 15,
  },
})
