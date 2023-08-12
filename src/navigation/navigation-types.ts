import type { StackScreenProps } from '@react-navigation/stack'

type NewsDetailScreenProps = {
  newsId: number
}

export type RootStackParamList = {
  HomeScreen: undefined
  NewsDetailScreen: NewsDetailScreenProps
  UserProfile: undefined
  UserSetting: undefined
  FavoriteNews: undefined
  NewsHistory: undefined
  LoginScreen: undefined
  CreateAccountScreen: undefined
}

export type RootNativeStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
