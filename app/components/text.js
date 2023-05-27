import { View, Text } from 'react-native';

export default function RecoverText(props) {
  const { size, children } = props;
  return (
    <View>
      <Text style={{ fontSize: size }}>{children}</Text>
    </View>
  );
}
