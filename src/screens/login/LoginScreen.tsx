import { firebaseAuth } from '@/remote/firebase'
import { AppText } from '@/ui/components/app-text/AppText'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { LanguagePicker } from '@/ui/components/language-picker/LanguagePicker'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { RootView } from '@/ui/components/root-view/RootView'
import { useNavigation } from '@react-navigation/native'
import { FirebaseError } from 'firebase/app'
import { User, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSetRecoilState } from 'recoil'

export function LoginScreen() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isLanguagePickerOpen, setIsLanguagePickerOpen] = useState(false)

  const setUserAuth = useSetRecoilState(userAuthState)

  const navigation = useNavigation()
  const { t } = useTranslation()

  const authenticate = async () => {
    try {
      if (isLoginLoading) {
        return
      }
      setIsLoginLoading(true)
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password)
      //Não passar a refernência ao objeto 'user' para o estado do recoil, recoil vai congelar objeto (Object.freeze()) impedindo que o sdk do firebase consiga faz mutações
      // Para uma explicação melhor veja a 'issue' = https://github.com/firebase/firebase-js-sdk/issues/5722
      const appUSer = JSON.parse(JSON.stringify(user)) as User
      setUserAuth({
        displayName: appUSer.displayName,
        email: appUSer.email,
        photoURL: appUSer.photoURL,
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Invalid e-mail or password')
        } else {
          Alert.alert('Network error!')
        }
      }
    } finally {
      setIsLoginLoading(false)
    }
  }

  const openLanguagePicker = () => {
    setIsLanguagePickerOpen((isLanguagePickerOpen) => !isLanguagePickerOpen)
  }

  return (
    <RootView style={styles.rootView}>
      <View style={styles.loginContainer}>
        <AppText style={styles.loginTitle}>{t('Log in')}</AppText>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>{t('E-mail')}</AppText>
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            inputMode='email'
            autoCapitalize='none'
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>{t('Password')}</AppText>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry
            autoCapitalize='none'
            style={styles.textInput}
          />
        </View>
        <Button
          style={styles.loginButton}
          onPress={authenticate}
        >
          <LoadingWrapper
            isLoading={isLoginLoading}
            color='white'
            size='small'
          >
            <Text style={styles.buttonInnerText}>{t('Log in')}</Text>
          </LoadingWrapper>
        </Button>
        <Button onPress={() => navigation.navigate('CreateAccountScreen')}>
          <LoadingWrapper
            isLoading={isLoginLoading}
            color='white'
            size='small'
          >
            <Text style={styles.buttonInnerText}>{t('Create account')}</Text>
          </LoadingWrapper>
        </Button>
      </View>
      <View style={styles.changeAppLanguageContainer}>
        <AppText style={styles.changeAppLanguage}>{t('Change app language:')}</AppText>
        <Button onPress={openLanguagePicker}>{t('current_language')}</Button>
        <LanguagePicker
          open={isLanguagePickerOpen}
          onBlur={openLanguagePicker}
        />
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    elevation: 6,
    shadowColor: '#000000',
    width: 500,
    maxWidth: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#161616',
    borderRadius: 6,
    fontSize: 18,
    color: 'white',
    padding: 6,
  },
  loginButton: {
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  loginTitle: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  buttonInnerText: {
    fontWeight: 'bold',
  },
  changeAppLanguageContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeAppLanguage: {
    fontSize: 16,
    marginRight: 10,
  },
})
