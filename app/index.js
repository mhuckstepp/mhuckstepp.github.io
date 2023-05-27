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
  { value: 1, label: '1 Mile' },
  { value: 2, label: '2 Mile' },
  { value: 3.10686, label: '5K' },
  { value: 5, label: '5 Mile' },
  { value: 6.21371, label: '10K' },
  { value: 10, label: '10 Miler' },
  { value: 13.1094, label: 'Half marathon' },
  { value: 20, label: '20 Mile' },
  { value: 26.2188, label: ' Marathon' },
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

  useEffect(() => {
    if (switchValue) return;
    const [newMainSpeed, newDecimalSpeed] = getSpeedValuesFromPace(
      minute,
      second,
    );
    setMainSpeed(newMainSpeed);
    setDecimalSpeed(Math.round(newDecimalSpeed * 10));
  }, [minute, second]);

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
              {distance?.label}
            </Text>
            <Button onPress={() => setDistance(null)} title="clear distance" />
            <FlatList
              data={speedList}
              style={styles.speedListContainer}
              ListHeaderComponent={<TimeTableHeader />}
              renderItem={({ item }) => (
                <TimeTableRow speed={item} distance={distance?.value} />
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
              {raceDistances.map((distanceObj) => (
                <Button
                  style={styles.raceButton}
                  title={distanceObj.label}
                  onPress={() => setDistance(distanceObj)}
                  key={distanceObj.value}
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
    paddingHorizontal: 8,
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
