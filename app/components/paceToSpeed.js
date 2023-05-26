import { StyleSheet, TextInput, View, Text} from 'react-native';
import { handleInput, convertPaceToSpeed } from '../utils';


export default function PaceToSpeed(props) {
 const { minute, second, onChangeMinute, onChangeSecond } = props;

  return (
    <>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleInput(value, onChangeMinute)}
        value={minute}
        placeholder="Minute"
        keyboardType="numeric"
      />
      <Text>:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleInput(value, onChangeSecond)}
        value={second}
        placeholder="Second"
        keyboardType="numeric"
      />
      </View>
      <Text> {convertPaceToSpeed(minute, second)} mph </Text>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
      height: 40,
      width: 100,
      marginTop: 12,
      marginHorizontal: 12,
      marginBottom: 6,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 4,
      padding: 5,
    },
});