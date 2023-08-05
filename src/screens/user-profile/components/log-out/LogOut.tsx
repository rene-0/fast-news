import { Button } from '@/ui/components/button/Button'
import { useTheme } from '@/ui/hooks/useTheme'
import { StyleSheet, Text, View } from 'react-native'

export function LogOut() {
  const { detailColor } = useTheme()

  return (
    <View style={styles.logOutContainer}>
      <Button
        android_ripple={{ color: detailColor }}
        style={styles.logOutButton}
      >
        <Text style={styles.logOutText}>Log out</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  logOutContainer: {
    marginTop: 'auto',
    marginBottom: 25,
    alignItems: 'center',
  },
  logOutButton: {
    width: '100%',
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
})
