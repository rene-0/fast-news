import { ActionItem } from '@/ui/components/action-item'
import { Picker } from '@react-native-picker/picker'
import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderControl } from '../components/header-control/HeaderControl'

export function UserSettings() {
  const insets = useSafeAreaInsets()

  const [lightTheme, setLightTheme] = useState(true)
  const [selectedAppLanguage, setSelectedAppLanguage] = useState()

  const safeAreaPadding = { paddingTop: insets.top, paddingBottom: insets.bottom }

  const pickerRef = useRef()

  function openAppLanguagePicker() {
    pickerRef.current.focus()
  }

  return (
    <View style={[styles.userSettingsContainer, safeAreaPadding]}>
      <HeaderControl titleText='User Settings' />
      <View style={styles.userSettingContentContainer}>
        {/* <Text style={styles.textTitle}>User Settings</Text> */}
        <View>
          <ActionItem.ActionItemRoot onPress={() => setLightTheme((oldLightTheme) => !oldLightTheme)}>
            <ActionItem.ActionItemIcon name={lightTheme ? 'infocirlceo' : 'infocirlce'} />
            <ActionItem.ActionItemText>{lightTheme ? 'Light Theme' : 'Dark Theme'}</ActionItem.ActionItemText>
          </ActionItem.ActionItemRoot>
          <ActionItem.ActionItemRoot onPress={openAppLanguagePicker}>
            <ActionItem.ActionItemIcon name='filetext1' />
            <ActionItem.ActionItemText>App language</ActionItem.ActionItemText>
            <Picker
              ref={pickerRef}
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userSettingsContainer: {
    flex: 1,
    backgroundColor: 'white',
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
