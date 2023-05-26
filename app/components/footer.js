import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function Footer() {
  return (
  <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: "center" }}>
    <Link href="/"asChild><Button title="home" /></Link>
    <Link href="/race" asChild>
      <Button title="Race" /></Link>
    </View>
  )
}