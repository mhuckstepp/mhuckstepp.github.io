import { View, Text, StyleSheet } from 'react-native'
import { convertSpeedToPace, hoursToFormattedTime } from '../utils'

export default function TimeTableRow(props) {
    const { speed, distance } = props
    return (
      <View style={styles.container}>
        <Text> {speed.toFixed(2)} mph </Text>
        <Text> {convertSpeedToPace(speed, 0)} min/mile </Text>
        <Text> {hoursToFormattedTime(distance / speed)} total time</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  }
})