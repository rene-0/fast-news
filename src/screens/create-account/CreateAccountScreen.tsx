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
import { ScrollView } from 'react-native-gesture-handler'
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
  imageHelp: string
}

export function CreateAccountScreen() {
  const [newUser, setNewUser] = useState<NewsUser>({ name: '', email: '', password: '', confirmPassword: '' })
  const [newUserValidation, setNewUserValidation] = useState<NewUserValidation>({ nameHelp: '', passwordHelp: '', emailHelp: '', confirmPasswordHelp: '', imageHelp: '' })
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [pickedImage, setPickedImage] = useState<ExpoImagePicker.ImagePickerAsset>()
  const [isLoadingImagePicker, setIsLoadingImagePicker] = useState(false)

  const { t } = useTranslation()
  const { backgroundColor } = useTheme()

  const setUserAuth = useSetRecoilState(userAuthState)

  const createAccount = async () => {
    try {
      if (isCreatingAccount) {
        return
      }
      setIsCreatingAccount(true)
      const hasError = [
        validateEmail(newUser.email),
        validateImage(pickedImage),
        validateConfirmPassword(newUser.confirmPassword),
        validatePassword(newUser.password),
        validateName(newUser.name),
      ].some((error) => error === false)
      if (hasError || !newUser || !pickedImage?.uri) {
        return
      }
      console.log('cc')
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

  const validateName = (name: string) => {
    if (name.length < 3 || !/^[a-zA-Z]{3,}/.test(name)) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, nameHelp: t('User name must contain 5 or more letters') }))
      return false
    }
    return true
  }

  const setName = (name: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, name }))
    if (validateName(name)) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, nameHelp: '' }))
    }
  }

  const validatePassword = (password: string) => {
    const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (!passwordRegEx.test(password)) {
      setNewUserValidation((oldNewUserValidation) => ({
        ...oldNewUserValidation,
        passwordHelp: t('password_help'),
      }))
      return false
    }
    return true
  }

  const setPassword = (password: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, password }))
    if (validatePassword(password)) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, passwordHelp: '' }))
    }
  }

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== newUser.password) {
      setNewUserValidation((oldNewUserValidation) => ({
        ...oldNewUserValidation,
        confirmPasswordHelp: t('Password and confirm password must be equal'),
      }))
      return false
    }
    return true
  }

  const setConfirmPassword = (confirmPassword: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, confirmPassword }))
    if (validateConfirmPassword(confirmPassword)) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, confirmPasswordHelp: '' }))
    }
  }

  const validateEmail = (email: string) => {
    const emailRegEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!emailRegEx.test(email)) {
      setNewUserValidation((oldNewUserValidation) => ({
        ...oldNewUserValidation,
        emailHelp: t('Invalid e-mail'),
      }))
      return false
    }
    return true
  }

  const setEmail = (email: string) => {
    setNewUser((oldNewUser) => ({ ...oldNewUser, email }))
    if (validateEmail(email)) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, emailHelp: '' }))
    }
  }

  const validateImage = (image: ExpoImagePicker.ImagePickerAsset | undefined) => {
    if (!image || !image.uri) {
      setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, imageHelp: t('No image selected') }))
      return false
    }
    setNewUserValidation((oldNewUserValidation) => ({ ...oldNewUserValidation, imageHelp: '' }))
    return true
  }

  const pickImage = async () => {
    try {
      setIsLoadingImagePicker(true)
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
    } finally {
      setIsLoadingImagePicker(false)
    }
  }

  return (
    <ScrollView>
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
        <LoadingWrapper isLoading={isLoadingImagePicker}>
          <ImagePicker
            image={pickedImage}
            pickImage={pickImage}
          />
        </LoadingWrapper>
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
        <AppText style={styles.alertText}>{newUserValidation.imageHelp}</AppText>
      </RootView>
    </ScrollView>
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
  alertText: {
    color: 'red',
    marginTop: 5,
  },
})
