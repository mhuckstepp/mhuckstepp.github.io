import { useEffect, useState } from 'react';
import { ScrollView, Switch, StyleSheet, View } from 'react-native';

import {
  CombinedPickers,
  TimeTableRow,
  TimeTableHeader,
  Button,
  Text,
  RaceButtonContainer,
  Screen,
} from './components';
import Footer from './components/footer';
import {
  CHECK_TEXT,
  createSpeeds,
  getPaceValuesFromSpeed,
  getSpeedValuesFromPace,
  roundToClosestValidOption,
} from './utils';

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
    setSecond(roundToClosestValidOption(newSec));
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
    <Screen>
      <ScrollView
        style={styles.bodyContainer}
        contentContainerStyle={styles.scrollViewContent}
      >
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
            </View>
          </>
        ) : (
          <>
            <Text style={styles.textStyle} size={16}>
              {CHECK_TEXT}
            </Text>
            <RaceButtonContainer setDistance={setDistance} />
          </>
        )}
      </ScrollView>
      <Footer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: '100%',
    marginHorizontal: 8,
    marginBottom: 12,
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
  },
  textStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});