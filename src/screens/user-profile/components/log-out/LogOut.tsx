import { Button } from '@/ui/components/button/Button'
import { StyleSheet, Text, View } from 'react-native'

export function LogOut() {
  return (
    <View style={styles.logOutContainer}>
      <Button
        android_ripple={{ color: '#5f5f5f' }}
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
