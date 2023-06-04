import { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';

import {
  Footer,
  RaceButtonContainer,
  Text,
  PredictTableRow,
  PredictTableHeader,
} from './components';
import { RACE_DISTANCES, convertToSeconds } from './utils';

export default function Predictor() {
  const [knownDistance, setKnownDistance] = useState('1');
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('7');
  const [second, setSecond] = useState('0');
  return (
    <>
      <View style={styles.container}>
        <Text> Distance for known race </Text>
        <TextInput
          style={styles.input}
          onChangeText={setKnownDistance}
          value={knownDistance}
        />
        <Text> Time for known race </Text>
        <View style={styles.timeRow}>
          <TextInput style={styles.input} value={hour} onChangeText={setHour} />
          <Text>:</Text>
          <TextInput
            style={styles.input}
            value={minute}
            onChangeText={setMinute}
          />
          <Text>:</Text>
          <TextInput
            style={styles.input}
            value={second}
            onChangeText={setSecond}
          />
        </View>
        <RaceButtonContainer useValue setDistance={setKnownDistance} />;
        <FlatList
          data={RACE_DISTANCES}
          ListHeaderComponent={PredictTableHeader}
          renderItem={({ item }) => (
            <PredictTableRow
              time={convertToSeconds(hour, minute, second)}
              distanceToPredict={item}
              knownDistance={Number(knownDistance)}
            />
          )}
          keyExtractor={(item) => item.label}
        />
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 12,
    borderRadius: 2,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginHorizontal: 4,
    width: 80,
    height: 20,
  },
});
