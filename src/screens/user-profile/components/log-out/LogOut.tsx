import { firebaseAuth } from '@/remote/firebase'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { useTheme } from '@/ui/hooks/useTheme'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useSetRecoilState } from 'recoil'

export function LogOut() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const setUserAuth = useSetRecoilState(userAuthState)

  const { t } = useTranslation()
  const { backgroundColor } = useTheme()

  const logOut = async () => {
    try {
      if (isLoggingOut) {
        return
      }
      setIsLoggingOut(true)
      await firebaseAuth.signOut()
      setUserAuth(null)
    } catch (error) {
      console.log('error', error)
      Alert.alert('Network error')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <View style={styles.logOutContainer}>
      <Button
        onPress={logOut}
        style={styles.logOutButton}
      >
        <LoadingWrapper
          color={backgroundColor}
          isLoading={isLoggingOut}
        >
          <Text style={styles.logOutText}>{t('Log out')}</Text>
        </LoadingWrapper>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  logOutContainer: {
    marginTop: 'auto',
    marginBottom: 25,
    alignItems: 'center',
  },
  logOutButton: {
    width: '100%',
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
})
