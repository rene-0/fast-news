import * as ExpoImagePicker from 'expo-image-picker'
import { Image, StyleSheet, View } from 'react-native'
import { Button } from '../button/Button'

type ImagePickerProps = {
  image: ExpoImagePicker.ImagePickerAsset | undefined
  pickImage: () => Promise<void>
}

export function ImagePicker({ image, pickImage }: ImagePickerProps) {
  return (
    <View style={styles.imagePickerContainer}>
      {image?.uri && (
        <Image
          source={{ uri: image?.uri }}
          style={styles.imagePickerImage}
        />
      )}
      <Button
        style={styles.button}
        onPress={pickImage}
      >
        Pick an image from camera roll
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
  imagePickerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
})
