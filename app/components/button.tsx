import { Pressable, StyleSheet } from 'react-native';

import Text from './text';

export default function RunButton(props) {
  const { title, style, onPress } = props;
  return (
    <Pressable
      style={StyleSheet.flatten([styles.container, style])}
      onPress={onPress}
    >
      <Text> {title} </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    margin: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8E7CC3',
  },
});
