import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { LabeledIcon } from '../../../../ui/components/labeled-icon/LabeledIcon'
import { GenericStyles } from '../../../../ui/styles/generic-styles'

export function HeroSection() {
  return (
    <View style={style.hero}>
      <Image
        style={style.heroImage}
        source={{
          uri: 'https://s.yimg.com/ny/api/res/1.2/DHUbSCioJVAQm4qIvpU8sA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-07/68afad20-1ffb-11ee-b7fd-e1ad02e58223',
        }}
      />
      <View style={style.heroDescriptionMask}>
        <View style={style.heroDescriptionContainer}>
          <Text style={[style.heroTitle, GenericStyles.textShadow]}>Home Tab</Text>
          <View style={style.iconLabelContainer}>
            <LabeledIcon
              iconName='eye'
              label='366'
              color='white'
            />
            <LabeledIcon
              iconName='clockcircle'
              label='13/12/1998'
              color='white'
              size={14}
            />
            <LabeledIcon
              iconName='message1'
              label='366'
              color='white'
              size={14}
            />
            <LabeledIcon
              iconName='star'
              label='89'
              color='white'
              size={14}
            />
          </View>
          <Text style={[style.heroDescription, GenericStyles.textShadow]}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, recusandae blanditiis unde odio sapiente ipsum neque quibusdam? Sapiente consequatur facilis quam
            pariatur, totam odit mollitia sit nam ducimus officia ipsa?
          </Text>
        </View>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  hero: {
    position: 'relative',
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  heroDescriptionMask: {
    backgroundColor: '#00000045',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroDescriptionContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    padding: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
  },
  heroDescription: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'justify',
  },
  iconLabelContainer: {
    flexDirection: 'row',
  },
})
