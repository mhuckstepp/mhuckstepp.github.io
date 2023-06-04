import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Link href="/">Calculator</Link>
      <Link href="/predictor">Predictor</Link>
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
});
