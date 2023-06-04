import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Text from './text';
import { convertSpeedToPace, formatSeconds, predictTime } from '../utils';

export default function PredictTableRow(props) {
  const { time, knownDistance, distanceToPredict } = props;
  const predictedTime = predictTime(
    time,
    knownDistance,
    distanceToPredict.value,
  );

  return (
    <View style={styles.container}>
      <Text textStyle={styles.textStyle}>{distanceToPredict.label}</Text>
      <Text textStyle={styles.textStyle}>
        {convertSpeedToPace(
          (distanceToPredict.value / predictedTime) * 3600,
          0,
        )}
        min/mile Pace
      </Text>
      <Text textStyle={styles.textStyle}>{formatSeconds(predictedTime)}</Text>
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

PredictTableRow.propTypes = {
  time: PropTypes.number,
  knownDistance: PropTypes.number,
  distanceToPredict: PropTypes.object,
};

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
