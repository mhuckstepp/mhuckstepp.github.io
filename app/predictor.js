import { useState } from 'react';
import { View, StyleSheet, TextInput, FlatList } from 'react-native';

import {
  Footer,
  RaceButtonContainer,
  Text,
  PredictTableRow,
} from './components';
import { RACE_DISTANCES } from './utils';

export default function Predictor() {
  const [distance, setDistance] = useState(RACE_DISTANCES[0].value);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(7);
  const [second, setSecond] = useState(0);
  return (
    <>
      <View style={styles.container}>
        <Text> Existing Distance </Text>
        <TextInput onChangeText={setDistance} value={distance} set />
        <Text> Existing Time </Text>
        <View style={styles.timeRow}>
          <TextInput value={hour} onChangeText={setHour} />
          <TextInput value={minute} onChangeText={setMinute} />
          <TextInput value={second} onChangeText={setSecond} />
        </View>
        <RaceButtonContainer useValue setDistance={setDistance} />;
        <FlatList
          data={RACE_DISTANCES}
          renderItem={({ item }) => (
            <PredictTableRow time={minute * 60} distance={item} />
          )}
          keyExtractor={(item) => item.value}
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
  },
});
