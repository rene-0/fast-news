import { useTheme } from '@/ui/hooks/useTheme'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

type DotPaginationProps = {
  activeIndex: number
  numberOfDots: number
}

export function DotPagination({ activeIndex, numberOfDots }: DotPaginationProps) {
  const { appTheme, color } = useTheme()

  return (
    <View style={styles.dotPaginationContainer}>
      <AntDesign
        name='left'
        size={7}
        color={color}
        style={styles.arrow}
      />
      {new Array(numberOfDots).fill(0).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === activeIndex ? { backgroundColor: appTheme === 'light' ? '#161616' : '#ffffff' } : {}]}
        />
      ))}
      <AntDesign
        style={styles.arrow}
        name='right'
        size={7}
        color={color}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dotPaginationContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 7,
    height: 7,
    elevation: 2,
    backgroundColor: '#aaa',
    borderRadius: 8,
    marginRight: 5,
  },
  activeDot: {
    backgroundColor: 'white',
    // backgroundColor: '#161616',
  },
  arrow: {
    marginRight: 5,
  },
})
