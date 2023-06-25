import { View, StyleSheet } from 'react-native';

import Text from './text';
import { RACE_DISTANCES } from '../constants';
import { convertSpeedToPace, hoursToFormattedTime } from '../utils';

export default function TimeTableRow(props) {
  const { speed, distance } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}> {speed?.toFixed(2)} mph </Text>
      <Text style={styles.textStyle}>
        {convertSpeedToPace(speed, 0)} min/mile{' '}
      </Text>
      <Text style={styles.textStyle}>
        {hoursToFormattedTime(distance / speed)}
      </Text>
    </View>
  );
}

export const TimeTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.textStyle} size={22}>
      Speed
    </Text>
    <Text style={styles.textStyle} size={22}>
      Pace
    </Text>
    <Text style={styles.textStyle} size={22}>
      Finish Time
    </Text>
  </View>
);

export const TimeTableFooter = (props) => {
  const { distance } = props;
  const { speed, pace, time } =
    RACE_DISTANCES.find((d) => d.value === distance)?.worldRecordStats ?? {};
  console.log(speed, pace, time);
  if (!speed || !pace || !time) return null;
  return (
    <View style={styles.worldRecordRow}>
      <Text size={22} style={{ textAlign: 'center' }}>
        World Record
      </Text>
      <View style={styles.container}>
        <Text style={styles.textStyle}> {speed} mph </Text>
        <Text style={styles.textStyle}>{pace} min/mile</Text>
        <Text style={styles.textStyle}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 8,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  worldRecordRow: {
    paddingVertical: 8,
  },
});
