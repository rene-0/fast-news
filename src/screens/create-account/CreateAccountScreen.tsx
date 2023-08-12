import { firebaseAuth, firebaseStorage } from '@/remote/firebase'
import { AppText } from '@/ui/components/app-text/AppText'
import { userAuthState } from '@/ui/components/atoms'
import { Button } from '@/ui/components/button/Button'
import { ImagePicker } from '@/ui/components/image-picker/ImagePicker'
import { LabeledInput } from '@/ui/components/labeled-input/LabeledInput'
import { LoadingWrapper } from '@/ui/components/loading-wrapper/LoadingWrapper'
import { RootView } from '@/ui/components/root-view/RootView'
import { useTheme } from '@/ui/hooks/useTheme'

import * as ExpoImagePicker from 'expo-image-picker'
import { FirebaseError } from 'firebase/app'
import { User, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text } from 'react-native'
import { useSetRecoilState } from 'recoil'

type NewsUser = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type NewUserValidation = {
  nameHelp: string
  emailHelp: string
  passwordHelp: string
  confirmPasswordHelp: string
}

export function CreateAccountScreen() {
  const [newUser, setNewUser] = useState<NewsUser>({ name: '', email: '', password: '', confirmPassword: '' })
  const [newUserValidation, setNewUserValidation] = useState<NewUserValidation>({ nameHelp: '', passwordHelp: '', emailHelp: '', confirmPasswordHelp: '' })
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [pickedImage, setPickedImage] = useState<ExpoImagePicker.ImagePickerAsset>()

  const { t } = useTranslation()
  const { backgroundColor } = useTheme()

  const setUserAuth = useSetRecoilState(userAuthState)

  const createAccount = async () => {
    try {
      if (isCreatingAccount) {
        return
      }
      setIsCreatingAccount(true)
      const hasValidationMessage = Object.values(newUserValidation).some((value) => value)
      const hasEmptyField = Object.values(newUser).some((value) => !value)
      if (!newUser || hasValidationMessage || hasEmptyField || !pickedImage?.uri) {
        return
      }
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, newUser.email, newUser.password)
      //Não passar a refernência ao objeto 'user' para o estado do recoil, recoil vai congelar objeto (Object.freeze()) impedindo que o sdk do firebase consiga faz mutações
      // Para uma explicação melhor veja a 'issue' = https://github.com/firebase/firebase-js-sdk/issues/5722
      const appUSer = JSON.parse(JSON.stringify(user)) as User

      const profilePhotoRef = ref(firebaseStorage, 'user-avatar/' + firebaseAuth.currentUser?.uid)

      const imageBlob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', pickedImage?.uri, true)
        xhr.send(null)
      })

      await uploadBytes(profilePhotoRef, imageBlob)

      const photoURL = await getDownloadURL(ref(firebaseStorage, `user-avatar/${firebaseAuth.currentUser?.uid}`))

      if (firebaseAuth.currentUser) {
        await updateProfile(firebaseAuth.currentUser, {
          displayName: newUser.name,
          photoURL,
        })
      }
      setUserAuth({
        email: appUSer.email,
        displayName: newUser.name,
        photoURL,
      })
    } catch (error) {
      console.log('error', error)
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/weak-password':
            Alert.alert('Password is too weak.')
            break
          case 'auth/email-already-in-use':
            Alert.alert('Email is already in use.')
            break
          default:
            Alert.alert('An error occurred during registration')
            break
        }
      } else {
        Alert.alert('An error occurred during registration')
      }
    } finally {
      setIsCreatingAccount(false)
    }
  }

  const setName = (name: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, name }))
    if (name.length < 3 || !/^[a-zA-Z]{3,}/.test(name)) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, nameHelp: t('User name must contain 5 or more letters') }))
    } else {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, nameHelp: '' }))
    }
  }

  const setPassword = (password: string) => {
    const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    setNewUser((oldNewUser) => ({ ...oldNewUser, password }))
    if (!passwordRegEx.test(password)) {
      setNewUserValidation((oldNewUserValidation) => ({
        ...oldNewUserValidation,
        passwordHelp: t('password_help'),
      }))
    } else {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, passwordHelp: '' }))
    }
  }

  const setConfirmPassword = (confirmPassword: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, confirmPassword }))
    if (confirmPassword !== newUser.password) {
      setNewUserValidation((oldNewUserValidation) => ({
        ...oldNewUserValidation,
        confirmPasswordHelp: t('Password and confirm password must be equal'),
      }))
    } else {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, confirmPasswordHelp: '' }))
    }
  }

  const setEmail = (email: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, email }))
    const emailRegEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!emailRegEx.test(email)) {
      setNewUserValidation((oldNewUserValidation) => ({
        ...oldNewUserValidation,
        emailHelp: t('Invalid e-mail'),
      }))
    } else {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, emailHelp: '' }))
    }
  }

  const pickImage = async () => {
    try {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        setPickedImage(result.assets[0])
      }
    } catch (error) {
      Alert.alert('Failed to select image')
    }
  }

  return (
    <RootView style={styles.rootView}>
      <AppText style={styles.screenTitle}>{t('Create account')}</AppText>
      <LabeledInput
        label={t('Name')}
        errorText={newUserValidation.nameHelp}
        onChangeText={setName}
      />
      <LabeledInput
        label={t('Email')}
        errorText={newUserValidation.emailHelp}
        onChangeText={setEmail}
      />
      <LabeledInput
        label={t('Password')}
        errorText={newUserValidation.passwordHelp}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LabeledInput
        label={t('Confirm Password')}
        errorText={newUserValidation.confirmPasswordHelp}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <ImagePicker
        image={pickedImage}
        pickImage={pickImage}
      />
      <Button
        onPress={createAccount}
        style={styles.createAccountButton}
      >
        <LoadingWrapper
          color={backgroundColor}
          isLoading={isCreatingAccount}
        >
          <Text style={styles.buttonInnerText}>{t('Create account')}</Text>
        </LoadingWrapper>
      </Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
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
  inputLabel: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 25,
  },
  buttonInnerText: {
    fontWeight: 'bold',
  },
})
