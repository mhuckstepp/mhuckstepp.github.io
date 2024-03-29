import { View, Text, StyleSheet } from 'react-native';

const DEFAULT_SIZE = 16;

export default function RunText(props) {
  const { size, children, style, textStyle } = props;
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <Text
        style={StyleSheet.flatten([
          { fontSize: size || DEFAULT_SIZE, textAlign: 'center' },
          textStyle,
        ])}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
