import { UserProfile } from '@/screens/user-profile/UserProfile'
import { FavoriteNews } from '@/screens/user-profile/screens/favorite-news/FavoriteNews'
import { NewsHistory } from '@/screens/user-profile/screens/news-history/NewsHistory'
import { UserSettings } from '@/screens/user-profile/screens/user-settings/UserSettings'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './navigation-types'

const Stack = createStackNavigator<RootStackParamList>()

export function UserProfileStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserSetting'
        component={UserSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='FavoriteNews'
        component={FavoriteNews}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NewsHistory'
        component={NewsHistory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
