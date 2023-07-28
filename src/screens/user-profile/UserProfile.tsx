import { ActionItem } from '@/ui/components/action-item'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LogOut } from './components/log-out/LogOut'
import { UserInfo } from './components/user-info/UserInfo'

export function UserProfile() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const safeAreaPadding = { paddingTop: insets.top }

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle('dark')
    }
  }, [isFocused])

  return (
    <View style={[styles.userRoot, safeAreaPadding]}>
      <Text style={styles.textTitle}>User profile</Text>
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
})
