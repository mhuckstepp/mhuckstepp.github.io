import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';

const interceptOnChange = (value: string, onChange) => {
  if (isNaN(value)) {
    onChange('0');
  } else {
    onChange(value);
  }
};

export default function RunTextInput(props) {
  const { style, value, onChange } = props;
  return (
    <TextInput
      style={StyleSheet.flatten([styles.input, style])}
      value={value}
      onChangeText={(value) => interceptOnChange(value, onChange)}
      keyboardType="numeric"
    />
  );
}

RunTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 2,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginHorizontal: 4,
    width: 80,
    height: 40,
  },
});
