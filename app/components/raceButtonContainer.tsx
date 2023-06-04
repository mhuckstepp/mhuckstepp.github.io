import { ScrollView, StyleSheet } from 'react-native';

import Button from './button';
import { RACE_DISTANCES } from '../utils';

export default function RaceButtonContainer(props) {
  const { useValue, setDistance } = props;
  return (
    <ScrollView contentContainerStyle={styles.raceButtonContainer}>
      {RACE_DISTANCES.map((distanceObj) => (
        <Button
          style={styles.raceButton}
          title={distanceObj.label}
          onPress={() =>
            setDistance(useValue ? distanceObj.value : distanceObj)
          }
          key={distanceObj.value}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  raceButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 500,
  },
  raceButton: {
    width: '30%',
    margin: 10,
    maxWidth: 250,
  },
});
