import { Button } from '@/ui/components/button/Button'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

type BackButtonProps = {
  titleText: string
}

export function HeaderControl({ titleText }: BackButtonProps) {
  const navigation = useNavigation()

  return (
    <View style={styles.headControlContainer}>
      <Button
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        android_ripple={{ color: '#16161620' }}
      >
        <AntDesign
          name='arrowleft'
          size={24}
          color='black'
        />
      </Button>
      <Text style={styles.textTitle}>{titleText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headControlContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#16161615',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 500,
    overflow: 'hidden',
  },
  textTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
})
