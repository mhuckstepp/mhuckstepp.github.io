import { View, StyleSheet } from 'react-native';

import { Text } from '.';
import { convertSpeedToPace, hoursToFormattedTime } from '../utils';

export default function TimeTableRow(props) {
  const { speed, distance } = props;
  return (
    <View style={styles.container}>
      <Text> {speed?.toFixed(2)} mph </Text>
      <Text> {convertSpeedToPace(speed, 0)} min/mile </Text>
      <Text> {hoursToFormattedTime(distance / speed)}</Text>
    </View>
  );
}

export const TimeTableHeader = () => (
  <View style={styles.container}>
    <Text size={28}> Speed </Text>
    <Text size={28}> Pace </Text>
    <Text size={28}> Finish Time</Text>
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
});
