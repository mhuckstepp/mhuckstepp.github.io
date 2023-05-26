import { StyleSheet, TextInput, View, Text} from 'react-native';
import { handleSpeedInput, convertSpeedToPace } from '../utils';


export default function SpeedToPace(props) {
 const { main, decimal, onChangeSpeed, onChangeSpeedDecimal } = props;

  return (
    <>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleSpeedInput(value, onChangeSpeed)}
        value={main}
        placeholder="mph"
        keyboardType="numeric"
      />
      <Text>.</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleSpeedInput(value, onChangeSpeedDecimal)}
        value={decimal}
        placeholder="mph"
        keyboardType="numeric"
      />
      </View>
      <Text> {convertSpeedToPace(main, decimal)} minutes per mile </Text>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    input: {
    height: 40,
    width: 100,
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
  },
});