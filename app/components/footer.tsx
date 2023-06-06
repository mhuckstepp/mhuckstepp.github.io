import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';

import Text from './text';
import { COLORS } from '../styles';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.stack}>
          <Text>Calculator</Text>
          <Ionicons name="calculator-outline" size={32} color={COLORS.blue} />
        </Pressable>
      </Link>
      <Link href="/predictor">
        <Pressable style={styles.stack}>
          <Text>Predictor</Text>
          <Ionicons name="analytics-outline" size={32} color={COLORS.blue} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  stack: {
    alignItems: 'center',
  },
});
