import { View, StyleSheet } from 'react-native';

import Text from './text';
import { convertSpeedToPace, hoursToFormattedTime } from '../utils';

export default function TimeTableRow(props) {
  const { speed, distance } = props;
  return (
    <View style={styles.container}>
      <Text textStyle={styles.textStyle}> {speed?.toFixed(2)} mph </Text>
      <Text textStyle={styles.textStyle}>
        {convertSpeedToPace(speed, 0)} min/mile{' '}
      </Text>
      <Text textStyle={styles.textStyle}>
        {hoursToFormattedTime(distance / speed)}
      </Text>
    </View>
  );
}

export const TimeTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.textContainer} size={22}>
      Speed
    </Text>
    <Text style={styles.textContainer} size={22}>
      Pace
    </Text>
    <Text style={styles.textContainer} size={22}>
      Finish Time
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});
