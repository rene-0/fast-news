import { HomeScreen } from '@/screens/home/HomeScreen'
import { NewsDetailScreen } from '@/screens/news-detail/NewsDetailScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './navigation-types'

const Stack = createStackNavigator<RootStackParamList>()

export function NewsDetailStackNavigation() {
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
