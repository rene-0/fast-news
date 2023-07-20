import { AntDesign, FontAwesome, Octicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootStackParamList } from './navigation/navigation-types'
import { HomeScreen } from './screens/home/HomeScreen'
import { NewsDetailScreen } from './screens/news-detail/NewsDetailScreen'

const Stack = createStackNavigator<RootStackParamList>()

const Tab = createBottomTabNavigator()

const NewsDetailStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NewsDetailScreen'
        component={NewsDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

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
                  name='appstore1'
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
            }}
            name='User'
            component={NewsDetailScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='light' />
    </SafeAreaProvider>
  )
}

registerRootComponent(App)
