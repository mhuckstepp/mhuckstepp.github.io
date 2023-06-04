import { StyleSheet, View } from 'react-native';

import Picker from './picker';
import Text from './text';
import {
  handleTimeInput,
  convertPaceToSpeedString,
  convertSpeedToPace,
  MINUTE_OPTIONS,
  SECOND_OPTIONS,
  SPEED_OPTIONS,
  SPEED_DECIMAL_OPTIONS,
} from '../utils';

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
              onChange={(value: string) =>
                handleTimeInput(value, onChangeSecondary)
              }
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
