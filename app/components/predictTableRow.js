import { View, StyleSheet } from 'react-native';

import Text from './text';
import { convertSpeedToPace } from '../utils';

export default function PredictTableRow(props) {
  const { time, distance } = props;
  return (
    <View style={styles.container}>
      <Text textStyle={styles.textStyle}>{distance.label}</Text>
      {/* <Text textStyle={styles.textStyle}>
        {convertSpeedToPace((distance / time) * 3600, 0)} min/mile Pace
      </Text> */}
      <Text textStyle={styles.textStyle}>{time}</Text>
    </View>
  );
}

export const PredictTableHeader = () => (
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
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
  },
});
