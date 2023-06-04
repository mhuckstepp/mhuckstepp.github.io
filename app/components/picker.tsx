import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

const PICKER_HEIGHT = 45;

export default function RunCalcPicker(props) {
  const { value, onChange, options, name } = props;
  return (
    <Picker
      style={styles.input}
      itemStyle={styles.pickerItem}
      selectedValue={value}
      onValueChange={onChange}
    >
      {options.map(({ value, label }) => (
        <Picker.Item label={label} value={value} key={label + name} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  input: {
    height: PICKER_HEIGHT,
    width: 100,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: 'lightgrey',
    textAlign: 'center',
  },
  pickerItem: {
    height: PICKER_HEIGHT,
  },
});
