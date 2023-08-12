import { Picker, PickerProps } from '@react-native-picker/picker'
import i18n from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

type LanguagePickerProps = {
  open?: boolean
} & PickerProps

export function LanguagePicker({ open = false, ...rest }: LanguagePickerProps) {
  const [selectedAppLanguage, setSelectedAppLanguage] = useState<string>(i18n.language)

  const pickerRef = useRef<Picker<string> | null>()
  const { t } = useTranslation()

  const handleChangeLanguage = (appLanguage: string) => {
    setSelectedAppLanguage(appLanguage)
    i18n.changeLanguage(appLanguage)
  }

  useEffect(() => {
    if (open && pickerRef.current) {
      pickerRef.current.focus()
    }
  }, [open])

  return (
    <Picker
      ref={(ref) => (pickerRef.current = ref)}
      selectedValue={selectedAppLanguage}
      onValueChange={handleChangeLanguage}
      style={styles.appLanguagePicker}
      onBlur={rest.onBlur}
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
  )
}

const styles = StyleSheet.create({
  appLanguagePicker: {
    display: 'none',
    opacity: 0,
  },
})
