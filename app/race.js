import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {Picker} from '@react-native-picker/picker';
import Footer from "./components/footer";
import { convertSpeedToPace, hoursToFormattedTime } from "./utils";
import { SpeedToPace } from "./components";


export default function Races() {
  const { distance, speed } = useLocalSearchParams();
    const [ speedVal, setSpeedVal ] = useState(speed)
  return (
    <View style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
    <Text>Race: {distance} miles</Text>
      <FlatList
        data={createSpeeds(speedVal)}
        renderItem={({item}) => <TimeTableRow speed={item} distance={distance} />}
        keyExtractor={item => item}
      />
    <Footer />
    </View>
  )
}