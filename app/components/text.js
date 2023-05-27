import { View, Text } from 'react-native';

const DEFAULT_SIZE = 18;

export default function RecoverText(props) {
  const { size, children, style } = props;
  return (
    <View style={style}>
      <Text style={{ fontSize: size || DEFAULT_SIZE }}>{children}</Text>
    </View>
  );
}
