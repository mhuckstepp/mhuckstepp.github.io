import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Switch, StyleSheet, View, Platform } from 'react-native';

import {
  CombinedPickers,
  TimeTableRow,
  TimeTableHeader,
  TimeTableFooter,
  Button,
  Text,
  RaceButtonContainer,
  Screen,
} from '../components';
import {
  createSpeeds,
  getPaceValuesFromSpeed,
  getSpeedValuesFromPace,
  roundToClosestValidOption,
} from '../utils';

export default function App() {
  const router = useRouter();
  const { support } = useLocalSearchParams();
  const [useSpeed, setUseSpeed] = useState(false);
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
    if (!useSpeed) return;
    const [newMin, newSec] = getPaceValuesFromSpeed(mainSpeed, decimalSpeed);
    setMinute(newMin);
    setSecond(roundToClosestValidOption(newSec));
  }, [mainSpeed, decimalSpeed]);

  useEffect(() => {
    if (useSpeed) return;
    const [newMainSpeed, newDecimalSpeed] = getSpeedValuesFromPace(
      minute,
      second,
    );
    setMainSpeed(newMainSpeed);
    setDecimalSpeed(Math.round(newDecimalSpeed * 10));
  }, [minute, second]);

  if (Platform.OS === 'web' && support) {
    router.push('support');
  }

  return (
    <Screen title="Calculator">
      <ScrollView
        style={styles.bodyContainer}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Switch value={useSpeed} onValueChange={setUseSpeed} />
        {useSpeed ? (
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
              {'Run: '}
              {distance?.label}
            </Text>
            <Button onPress={() => setDistance(null)} title="clear distance" />
            <View style={styles.speedListContainer}>
              <TimeTableHeader />
              {speedList.map((speed) => (
                <TimeTableRow
                  key={speed}
                  speed={speed}
                  distance={distance?.value}
                />
              ))}
              {distance ? <TimeTableFooter distance={distance?.value} /> : null}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textStyle} size={16}>
              {`Check your total race time based on your current ${
                useSpeed ? 'speed' : 'pace'
              } for one of the following distances`}
            </Text>
            <RaceButtonContainer setDistance={setDistance} />
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  scrollViewContent: {
    alignItems: 'center',
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
    paddingVertical: 12,
  },
  textStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
