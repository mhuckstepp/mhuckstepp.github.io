import { useEffect, useState } from 'react'; 
import { Text, View, Switch, StyleSheet, FlatList } from "react-native";
import Footer from "./components/footer";
import {PaceToSpeed, SpeedToPace, TimeTableRow, Button} from "./components"
import { convertPaceToSpeed, createSpeeds } from "./utils";

let raceDistances = [[1, "1 Mile"], [2, "2 Mile"], [3.10686, "5K"], [5, "5 Mile"], [6.21371, "10K"] , [10, "10 Miler"], [13.1094, "Half marathon"], [20, '20 Mile'], [26.2188, " Marathon"]];

export default function App() {
  const [switchValue, setSwitchValue] = useState(false);
  const [minute, onChangeMinute] = useState(7);
  const [second, onChangeSecond] = useState(30);
  const [main, onChangeSpeed] = useState(null);
  const [decimal, onChangeSpeedDecimal] = useState(null);
  const [distance, setDistance] = useState(null);
  const [speedList, setSpeedList] = useState([])

  useEffect(() => {
    setSpeedList(createSpeeds(minute, second))
  }, [minute, second])
  
  
  return (
  <View style={{ height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
    <View style={{justifyContent: 'flex-start', flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}} >
      <Switch value={switchValue} onValueChange={setSwitchValue} />
      {switchValue ?  (<>
    <Text>Speed to Pace Converter</Text>
    <SpeedToPace main={main} onChangeSpeed={onChangeSpeed} decimal={decimal} onChangeSpeedDecimal={onChangeSpeedDecimal} /> 
    </>) : (
      <>
      <Text>Pace to Speed Converter</Text>
    <PaceToSpeed minute={minute} onChangeMinute={onChangeMinute} second={second} onChangeSecond={onChangeSecond} />
    </>)}
    {distance ? (
         <>  
         <Text>Race: {distance} miles</Text>
         <Button onPress={() => setDistance(null)} title="clear distance" />
      <FlatList
        data={speedList}
        renderItem={({item}) => <TimeTableRow speed={item} distance={distance} />}
        keyExtractor={item => item}
      /></>)  : (
      <>    
      <Text>Check time for specific distances</Text>
      <View style={styles.raceButtonContainer}>
      {raceDistances.map(([distance, label]) => <Button style={styles.raceButton} title={label} onPress={() => setDistance(distance)} />
      )}</View>
      </> ) }
    </View>
    <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  raceButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '75%',
  },
  raceButton: {
    width: '20%',
    margin: 10,
  }
})