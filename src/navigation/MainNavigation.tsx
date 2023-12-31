import { BookmarksScreen } from '@/screens/bookmarks/BookmarksScreen'
import { NewsSearchScreen } from '@/screens/news-search/NewsSearchScreen'
import { AntDesign, FontAwesome, Octicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import 'react-native-gesture-handler' // build falha sem
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NewsDetailStackNavigation } from './NewsDeatilStackNavigation'
import { UserProfileStackNavigation } from './UserProfileStackNavigation'

const Tab = createBottomTabNavigator()
export function MainNavigation() {
  return (
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
  )
}
