import { StyleSheet, View } from 'react-native';

import { Picker, Text } from '.';
import {
  handleTimeInput,
  convertPaceToSpeedString,
  convertSpeedToPace,
} from '../utils';

const MINUTE_OPTIONS = [...Array(16).keys()].slice(3);
const SECOND_OPTIONS = [...Array(60).keys()];

export default function CombinedPickers(props) {
  const { usePace, mainVal, secondaryVal, onChangeMain, onChangeSecondary } =
    props;

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <Picker
          options={MINUTE_OPTIONS}
          value={mainVal}
          onChange={(value) => handleTimeInput(value, onChangeMain)}
        />
        <Text>:</Text>
        <Picker
          options={SECOND_OPTIONS}
          value={secondaryVal}
          onChange={(value) => handleTimeInput(value, onChangeSecondary)}
        />
      </View>
      <Text>
        {usePace
          ? `${convertPaceToSpeedString(mainVal, secondaryVal)} mph`
          : `${convertSpeedToPace(mainVal, secondaryVal)} minutes per mile`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
