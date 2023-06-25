import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen(props) {
  const { children, title } = props;
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {title ? (
        <Stack.Screen
          options={{
            title,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      ) : null}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
