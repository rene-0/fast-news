import { CreateAccountScreen } from '@/screens/create-account/CreateAccountScreen'
import { LoginScreen } from '@/screens/login/LoginScreen'
import { UserProfile } from '@/screens/user-profile/UserProfile'
import { FavoriteNews } from '@/screens/user-profile/screens/favorite-news/FavoriteNews'
import { NewsHistory } from '@/screens/user-profile/screens/news-history/NewsHistory'
import { UserSettings } from '@/screens/user-profile/screens/user-settings/UserSettings'
import { userAuthState } from '@/ui/components/atoms'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler' // build falha sem
import { useRecoilValue } from 'recoil'
import { RootStackParamList } from './navigation-types'

const Stack = createStackNavigator<RootStackParamList>()

export function UserProfileStackNavigation() {
  const userAuth = useRecoilValue(userAuthState)

  return (
    <Stack.Navigator>
      {!userAuth ? (
        <>
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='CreateAccountScreen'
            component={CreateAccountScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  )
}
