import { useEffect, useState } from 'react';
import { View, Switch, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CombinedPickers,
  TimeTableRow,
  TimeTableHeader,
  Button,
  Text,
} from './components';
import Footer from './components/footer';
import { createSpeeds } from './utils';

const raceDistances = [
  [1, '1 Mile'],
  [2, '2 Mile'],
  [3.10686, '5K'],
  [5, '5 Mile'],
  [6.21371, '10K'],
  [10, '10 Miler'],
  [13.1094, 'Half marathon'],
  [20, '20 Mile'],
  [26.2188, ' Marathon'],
];

export default function App() {
  const [switchValue, setSwitchValue] = useState(false);
  const [minute, onChangeMinute] = useState(7);
  const [second, onChangeSecond] = useState(30);
  const [main, onChangeSpeed] = useState(7);
  const [decimal, onChangeSpeedDecimal] = useState(5);
  const [distance, setDistance] = useState(null);
  const [speedList, setSpeedList] = useState([]);

  useEffect(() => {
    setSpeedList(createSpeeds(minute, second));
  }, [minute, second]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.bodyContainer}>
        <Switch value={switchValue} onValueChange={setSwitchValue} />
        {switchValue ? (
          <>
            <Text size={28}>Speed to Pace Converter</Text>
            <CombinedPickers
              mainVal={main}
              secondaryVal={decimal}
              onChangeMain={onChangeSpeed}
              onChangeSecondary={onChangeSpeedDecimal}
              usePace
            />
          </>
        ) : (
          <>
            <Text size={28}>Pace to Speed Converter</Text>
            <CombinedPickers
              mainVal={minute}
              secondaryVal={second}
              onChangeMain={onChangeMinute}
              onChangeSecondary={onChangeSecond}
            />
          </>
        )}
        {distance ? (
          <>
            <Text>Race: {distance} miles</Text>
            <Button onPress={() => setDistance(null)} title="clear distance" />
            <FlatList
              data={speedList}
              ListHeaderComponent={<TimeTableHeader />}
              renderItem={({ item }) => (
                <TimeTableRow speed={item} distance={distance} />
              )}
              keyExtractor={(item) => item}
            />
          </>
        ) : (
          <>
            <Text>Check time for specific distances</Text>
            <View style={styles.raceButtonContainer}>
              {raceDistances.map(([distance, label]) => (
                <Button
                  style={styles.raceButton}
                  title={label}
                  onPress={() => setDistance(distance)}
                />
              ))}
            </View>
          </>
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 16,
  },
  bodyContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  raceButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '75%',
  },
  raceButton: {
    width: '20%',
    margin: 10,
  },
});
