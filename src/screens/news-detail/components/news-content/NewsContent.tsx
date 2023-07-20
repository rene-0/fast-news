import { StyleSheet, Text, View } from 'react-native'

export function NewsContent() {
  return (
    <View style={style.newsContentContainer}>
      <Text style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </Text>
      <Text style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </Text>
      <Text style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </Text>
      <Text style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </Text>
      <Text style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </Text>
      <Text style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  newsContentContainer: {
    paddingTop: 10,
  },
  newsParagrapher: {
    textAlign: 'justify',
    marginBottom: 10,
  },
})
