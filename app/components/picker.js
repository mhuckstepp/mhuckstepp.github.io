import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

const PICKER_HEIGHT = 50;

export default function RunCalcPicker(props) {
  const { value, onChange, options } = props;
  return (
    <Picker
      style={styles.input}
      itemStyle={styles.pickerItem}
      selectedValue={value}
      onValueChange={onChange}
    >
      {options.map((option) => (
        <Picker.Item label={String(option)} value={option} key={value} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  input: {
    height: PICKER_HEIGHT,
    width: 150,
    marginBottom: 6,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: 'lightgrey',
  },
  pickerItem: {
    height: PICKER_HEIGHT,
  },
});
