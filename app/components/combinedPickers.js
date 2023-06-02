import { StyleSheet, View } from 'react-native';

import Picker from './picker';
import Text from './text';
import {
  handleTimeInput,
  convertPaceToSpeedString,
  convertSpeedToPace,
} from '../utils';

// This needs to be done outside the Picker because of a double rendering bug
const convertToValAndLabel = (value) => ({ value, label: String(value) });

const MINUTE_OPTIONS = [...Array(16).keys()].slice(3).map(convertToValAndLabel);
const SECOND_OPTIONS = [...Array(12).keys()].map(convertToValAndLabel);

const SPEED_OPTIONS = [...Array(16).keys()].map(convertToValAndLabel);
const SPEED_DECIMAL_OPTIONS = [...Array(10).keys()].map(convertToValAndLabel);

export default function CombinedPickers(props) {
  const { usePace, mainVal, secondaryVal, onChangeMain, onChangeSecondary } =
    props;

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        {usePace ? (
          <>
            <Picker
              options={MINUTE_OPTIONS}
              value={mainVal}
              onChange={(value) => handleTimeInput(value, onChangeMain)}
              name="minutes"
            />
            <Text>:</Text>
            <Picker
              options={SECOND_OPTIONS}
              value={secondaryVal}
              onChange={(value) => handleTimeInput(value, onChangeSecondary)}
              name="seconds"
            />
          </>
        ) : (
          <>
            <Picker
              options={SPEED_OPTIONS}
              value={mainVal}
              onChange={(value) => handleTimeInput(value, onChangeMain)}
              name="mph"
            />
            <Text>.</Text>
            <Picker
              options={SPEED_DECIMAL_OPTIONS}
              value={secondaryVal}
              onChange={(value) => handleTimeInput(value, onChangeSecondary)}
              name="mphDecimal"
            />
          </>
        )}
      </View>
      <Text style={styles.text}>{usePace ? 'minutes per mile' : 'mph'}</Text>
      <Text>
        {`This ${usePace ? 'pace' : 'speed'} is equal to ${
          usePace
            ? convertPaceToSpeedString(mainVal, secondaryVal) + ' mph'
            : convertSpeedToPace(mainVal, secondaryVal) + ' minutes per mile'
        } `}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 16,
  },
  text: {
    marginBottom: 16,
  },
});
