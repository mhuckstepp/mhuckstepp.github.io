import { StyleSheet, View } from 'react-native';

import { Picker, Text } from '.';
import { handleSpeedInput, convertSpeedToPace } from '../utils';

const SPEED_OPTIONS = [...Array(16).keys()];
const SPEED_DECIMAL_OPTIONS = [...Array(10).keys()];

export default function SpeedToPace(props) {
  const { main, decimal, onChangeSpeed, onChangeSpeedDecimal } = props;

  return (
    <>
      <View style={styles.container}>
        <Picker
          onChange={(value) => handleSpeedInput(value, onChangeSpeed)}
          value={main}
          options={SPEED_OPTIONS}
        />
        <Text>.</Text>
        <Picker
          onChange={(value) => handleSpeedInput(value, onChangeSpeedDecimal)}
          value={decimal}
          options={SPEED_DECIMAL_OPTIONS}
        />
      </View>
      <Text> {convertSpeedToPace(main, decimal)} minutes per mile </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    height: 40,
    width: 100,
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
  },
});
