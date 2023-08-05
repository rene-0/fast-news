import { AppText } from '@/ui/components/app-text/AppText'
import { Button } from '@/ui/components/button/Button'
import { useTheme } from '@/ui/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'

type BackButtonProps = {
  titleText: string
}

export function HeaderControl({ titleText }: BackButtonProps) {
  const navigation = useNavigation()
  const { color } = useTheme()

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
          color={color}
        />
      </Button>
      <AppText style={styles.textTitle}>{titleText}</AppText>
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
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
    marginLeft: 20,
  },
})
