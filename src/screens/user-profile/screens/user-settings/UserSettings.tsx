import { ActionItem } from '@/ui/components/action-item'
import { appConfigStates } from '@/ui/components/atoms'
import { RootView } from '@/ui/components/root-view/RootView'
import { useTheme } from '@/ui/hooks/useTheme'
import { Picker } from '@react-native-picker/picker'
import { useIsFocused } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'

import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useRecoilState } from 'recoil'
import { HeaderControl } from '../components/header-control/HeaderControl'

export function UserSettings() {
  const [appConfig, setAppConfig] = useRecoilState(appConfigStates)
  const [selectedAppLanguage, setSelectedAppLanguage] = useState<string>(i18n.language)

  const { statusbarColor } = useTheme()
  const isFocused = useIsFocused()
  const { t } = useTranslation()

  const pickerRef = useRef<Picker<string> | null>()

  const isLightTheme = appConfig.appTheme === 'light'

  const handleToggleTheme = () => {
    setAppConfig({
      appTheme: !isLightTheme ? 'light' : 'dark',
    })
  }

  const openAppLanguagePicker = () => {
    if (pickerRef.current) {
      pickerRef.current.focus()
    }
  }

  const handleChangeLanguage = (appLanguage: string) => {
    setSelectedAppLanguage(appLanguage)
    i18n.changeLanguage(appLanguage)
  }

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle(statusbarColor)
    }
  }, [isFocused, statusbarColor])

  return (
    <RootView style={styles.userSettingsContainer}>
      <HeaderControl titleText={t('User settings')} />
      <View style={styles.userSettingContentContainer}>
        <ActionItem.ActionItemRoot onPress={handleToggleTheme}>
          <ActionItem.ActionItemIcon name={isLightTheme ? 'infocirlceo' : 'infocirlce'} />
          <ActionItem.ActionItemText>{t(`${isLightTheme ? 'Light' : 'Dark'} Theme`)}</ActionItem.ActionItemText>
        </ActionItem.ActionItemRoot>
        <ActionItem.ActionItemRoot onPress={openAppLanguagePicker}>
          <ActionItem.ActionItemIcon name='filetext1' />
          <ActionItem.ActionItemText>{t('App language')}</ActionItem.ActionItemText>
          <Picker
            ref={(ref) => (pickerRef.current = ref)}
            selectedValue={selectedAppLanguage}
            onValueChange={handleChangeLanguage}
            style={styles.appLanguagePicker}
          >
            <Picker.Item
              label={t('Portuguese')}
              value='ptBr'
            />
            <Picker.Item
              label={t('English')}
              value='en'
            />
          </Picker>
        </ActionItem.ActionItemRoot>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  userSettingsContainer: {
    flex: 1,
  },
  userSettingContentContainer: {
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  appLanguagePicker: {
    display: 'none',
  },
})
