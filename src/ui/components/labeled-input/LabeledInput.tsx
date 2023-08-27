import { StyleSheet, Text, TextInput, View } from 'react-native'
import { AppText } from '../app-text/AppText'

type LabeledInputProps = {
  label: string
  errorText?: string
  onChangeText?: ((text: string) => void) | undefined
  secureTextEntry?: boolean
}

export function LabeledInput({ errorText, label, onChangeText, secureTextEntry }: LabeledInputProps) {
  return (
    <View style={styles.inputContainer}>
      <AppText style={styles.inputLabel}>{label}</AppText>
      <TextInput
        onChangeText={onChangeText}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
      />
      <Text style={styles.alertText}>{errorText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  alertText: {
    color: 'red',
  },
  inputContainer: {
    marginBottom: 5,
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
    lineHeight: 20,
  },
})
