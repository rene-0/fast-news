import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Home } from './src/screens/home/Home'
import { NewDetail } from './src/screens/new-detail/NewDetail'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <FontAwesome5
                  name='home'
                  size={24}
                  color='black'
                />
              ),
              tabBarShowLabel: false,
            }}
            name='Home'
            component={Home}
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
            name='Settings'
            component={NewDetail}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='light' />
    </>
  )
}
