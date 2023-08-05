import { ActionItem } from '@/ui/components/action-item'
import { appConfigStates } from '@/ui/components/atoms'
import { RootView } from '@/ui/components/root-view/RootView'
import { useTheme } from '@/ui/hooks/useTheme'
import { Picker } from '@react-native-picker/picker'
import { useIsFocused } from '@react-navigation/native'
import { setStatusBarStyle } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useRecoilState } from 'recoil'
import { HeaderControl } from '../components/header-control/HeaderControl'

export function UserSettings() {
  const [appConfig, setAppConfig] = useRecoilState(appConfigStates)
  const [selectedAppLanguage, setSelectedAppLanguage] = useState()

  const { statusbarColor } = useTheme()
  const isFocused = useIsFocused()

  const pickerRef = useRef<Picker<undefined> | null>()

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

  useEffect(() => {
    if (isFocused) {
      setStatusBarStyle(statusbarColor)
    }
  }, [isFocused, statusbarColor])

  return (
    <RootView style={styles.userSettingsContainer}>
      <HeaderControl titleText='User Settings' />
      <View style={styles.userSettingContentContainer}>
        <ActionItem.ActionItemRoot onPress={handleToggleTheme}>
          <ActionItem.ActionItemIcon name={isLightTheme ? 'infocirlceo' : 'infocirlce'} />
          <ActionItem.ActionItemText>{isLightTheme ? 'Light Theme' : 'Dark Theme'}</ActionItem.ActionItemText>
        </ActionItem.ActionItemRoot>
        <ActionItem.ActionItemRoot onPress={openAppLanguagePicker}>
          <ActionItem.ActionItemIcon name='filetext1' />
          <ActionItem.ActionItemText>App language</ActionItem.ActionItemText>
          <Picker
            ref={(ref) => (pickerRef.current = ref)}
            selectedValue={selectedAppLanguage}
            onValueChange={(appLanguage) => setSelectedAppLanguage(appLanguage)}
            style={styles.appLanguagePicker}
          >
            <Picker.Item
              label='Portuguese'
              value='portuguese'
            />
            <Picker.Item
              label='English'
              value='english'
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
