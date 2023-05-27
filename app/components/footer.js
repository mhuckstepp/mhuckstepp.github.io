import { Link } from 'expo-router';
import { Button, View, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Button title="Home" />
      </Link>
      <Link href="/timePredictor" asChild>
        <Button title="Time Predictor" />
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
});
