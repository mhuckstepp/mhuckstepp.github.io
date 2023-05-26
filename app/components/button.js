import { Button, StyleSheet, View } from 'react-native'
import React from 'react'

export default function RecoverButton(props) {
    const { title, style, onPress } = props
  return  (<View style={StyleSheet.flatten(styles.container, style)}>
        <Button title={title} onPress={onPress} />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        margin: 5,
        height: 40,
    }
})