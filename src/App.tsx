import { AntDesign, FontAwesome, Octicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NewsDetailStackNavigation } from './navigation/NewsDeatilStackNavigation'

import { UserProfileStackNavigation } from './navigation/UserProfileStackNavigation'
import { NewsDetailScreen } from './screens/news-detail/NewsDetailScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Octicons
                  name='home'
                  size={24}
                  color='black'
                />
              ),
              tabBarShowLabel: false,
            }}
            name='HomeTab'
            component={NewsDetailStackNavigation}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <AntDesign
                  name='appstore-o'
                  size={24}
                  color='black'
                />
              ),
              tabBarShowLabel: false,
            }}
            name='Categories'
            component={NewsDetailScreen}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <AntDesign
                  name='book'
                  size={24}
                  color='black'
                />
              ),
              tabBarShowLabel: false,
            }}
            name='Bookmark'
            component={NewsDetailScreen}
          />
          <Tab.Screen
            options={{
              tabBarIcon: () => (
                <FontAwesome
                  name='user-o'
                  size={24}
                  color='black'
                />
              ),
              tabBarShowLabel: false,
              headerShown: false,
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

registerRootComponent(App)
