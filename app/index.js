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
// import Footer from './components/footer';
import {
  createSpeeds,
  getPaceValuesFromSpeed,
  getSpeedValuesFromPace,
} from './utils';

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
  const [minute, setMinute] = useState(7);
  const [second, setSecond] = useState(30);
  const [mainSpeed, setMainSpeed] = useState(7);
  const [decimalSpeed, setDecimalSpeed] = useState(5);
  const [distance, setDistance] = useState(null);
  const [speedList, setSpeedList] = useState([]);

  useEffect(() => {
    setSpeedList(createSpeeds(minute, second));
  }, [minute, second]);

  useEffect(() => {
    if (!switchValue) return;
    const [newMin, newSec] = getPaceValuesFromSpeed(mainSpeed, decimalSpeed);
    setMinute(newMin);
    setSecond(newSec);
  }, [mainSpeed, decimalSpeed]);

  // useEffect(() => {
  //   if (switchValue) return;
  //   const [newMainSpeed, newDecimalSpeed] = getSpeedValuesFromPace(
  //     minute,
  //     second,
  //   );
  //   setMainSpeed(newMainSpeed);
  //   setDecimalSpeed(newDecimalSpeed);
  // }, [minute, second]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.bodyContainer}>
        <Switch value={switchValue} onValueChange={setSwitchValue} />
        {switchValue ? (
          <>
            <Text size={28}>Speed to Pace Converter</Text>
            <CombinedPickers
              mainVal={mainSpeed}
              secondaryVal={decimalSpeed}
              onChangeMain={setMainSpeed}
              onChangeSecondary={setDecimalSpeed}
            />
          </>
        ) : (
          <>
            <Text size={28}>Pace to Speed Converter</Text>
            <CombinedPickers
              mainVal={minute}
              secondaryVal={second}
              onChangeMain={setMinute}
              onChangeSecondary={setSecond}
              usePace
            />
          </>
        )}
        {distance ? (
          <>
            <Text>
              Race:
              {
                raceDistances.find(
                  (distanceObj) => distanceObj[0] == distance,
                )?.[1]
              }
            </Text>
            <Button onPress={() => setDistance(null)} title="clear distance" />
            <FlatList
              data={speedList}
              style={styles.speedListContainer}
              ListHeaderComponent={<TimeTableHeader />}
              renderItem={({ item }) => (
                <TimeTableRow speed={item} distance={distance} />
              )}
              keyExtractor={(item) => item}
            />
          </>
        ) : (
          <>
            <Text size={18}>
              Check your total race time based on your current speed for one of
              the following distances
            </Text>
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
      {/* <Footer /> */}
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
    width: '100%',
    maxWidth: 500,
  },
  raceButton: {
    width: '30%',
    margin: 10,
    maxWidth: 250,
  },
  speedListContainer: {
    width: '100%',
    maxWidth: 500,
  },
});
