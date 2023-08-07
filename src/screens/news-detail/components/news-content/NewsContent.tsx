import { AppText } from '@/ui/components/app-text/AppText'
import { StyleSheet, View } from 'react-native'

export function NewsContent() {
  return (
    <View style={style.newsContentContainer}>
      <AppText style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </AppText>
      <AppText style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </AppText>
      <AppText style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </AppText>
      <AppText style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </AppText>
      <AppText style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </AppText>
      <AppText style={style.newsParagrapher}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas sint excepturi ad provident perspiciatis ullam reiciendis? Facilis voluptatibus sint excepturi
        recusandae velit architecto aut numquam, itaque fuga, corporis debitis?
      </AppText>
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
