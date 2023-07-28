import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

type DotPaginationProps = {
  activeIndex: number
  numberOfDots: number
}

export function DotPagination({ activeIndex, numberOfDots }: DotPaginationProps) {
  return (
    <View style={styles.dotPaginationContainer}>
      <AntDesign
        name='left'
        size={7}
        color='black'
        style={styles.arrow}
      />
      {new Array(numberOfDots).fill(0).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === activeIndex ? styles.activeDot : {}]}
        />
      ))}
      <AntDesign
        style={styles.arrow}
        name='right'
        size={7}
        color='black'
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
    backgroundColor: '#161616',
  },
  arrow: {
    marginRight: 5,
  },
})
