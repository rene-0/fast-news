import { AntDesign, FontAwesome, Octicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NewsDetailStackNavigation } from './navigation/NewsDeatilStackNavigation'

import 'react-native-gesture-handler'
import { RecoilRoot } from 'recoil'
import { UserProfileStackNavigation } from './navigation/UserProfileStackNavigation'
import { BookmarksScreen } from './screens/bookmarks/BookmarksScreen'
import { NewsSearchScreen } from './screens/news-search/NewsSearchScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Octicons
                    name='home'
                    size={24}
                    color={focused ? 'white' : 'black'}
                  />
                ),
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#161616',
              }}
              name='HomeTab'
              component={NewsDetailStackNavigation}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <AntDesign
                    name='appstore-o'
                    size={24}
                    color={focused ? 'white' : 'black'}
                  />
                ),
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#161616',
              }}
              name='NewsSearch'
              component={NewsSearchScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <AntDesign
                    name='book'
                    size={24}
                    color={focused ? 'white' : 'black'}
                  />
                ),
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#161616',
              }}
              name='Bookmarks'
              component={BookmarksScreen}
            />
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <FontAwesome
                    name='user-o'
                    size={24}
                    color={focused ? 'white' : 'black'}
                  />
                ),
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#161616',
              }}
              name='UserProfileTab'
              component={UserProfileStackNavigation}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style='light' />
      </SafeAreaProvider>
    </RecoilRoot>
  )
}

registerRootComponent(App)
