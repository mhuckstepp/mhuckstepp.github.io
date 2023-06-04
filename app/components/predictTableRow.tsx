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
      <Text style={styles.textStyle}>{distanceToPredict.label}</Text>
      <Text style={styles.textStyle}>
        {convertSpeedToPace(
          (distanceToPredict.value / predictedTime) * 3600,
          0,
        )}
        {' min/mile'}
      </Text>
      <Text style={styles.textStyle}>{formatSeconds(predictedTime)}</Text>
    </View>
  );
}

export const PredictTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.textStyle} size={22}>
      Distance
    </Text>
    <Text style={styles.textStyle} size={22}>
      Pace
    </Text>
    <Text style={styles.textStyle} size={22}>
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
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  textStyle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 8,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
});
