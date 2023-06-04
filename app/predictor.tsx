import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import {
  Footer,
  RaceButtonContainer,
  Text,
  PredictTableRow,
  PredictTableHeader,
  Screen,
  TextInput,
} from './components';
import { RACE_DISTANCES, convertToSeconds } from './utils';

export default function Predictor() {
  const [knownDistance, setKnownDistance] = useState('1');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('07');
  const [second, setSecond] = useState('00');
  return (
    <Screen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text> Distance for known race (miles) </Text>
        <TextInput onChange={setKnownDistance} value={knownDistance} />
        <Text> Time for known race (HH:MM:SS) </Text>
        <View style={styles.timeRow}>
          <TextInput value={hour} onChange={setHour} />
          <Text>:</Text>
          <TextInput value={minute} onChange={setMinute} />
          <Text>:</Text>
          <TextInput value={second} onChange={setSecond} />
        </View>
        <RaceButtonContainer
          useValue
          setDistance={(value) => setKnownDistance(String(value))}
        />
        <View style={styles.listView}>
          <PredictTableHeader />
          {RACE_DISTANCES.map((distance) => (
            <PredictTableRow
              time={convertToSeconds(hour, minute, second)}
              distanceToPredict={distance}
              knownDistance={Number(knownDistance)}
              key={distance.label}
            />
          ))}
        </View>
      </ScrollView>
      <Footer />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    marginBottom: 12,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  listView: {
    width: '100%',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});
