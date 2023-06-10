import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => (
            <Ionicons name="md-calculator-outline" size={40} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="predictor"
        options={{
          tabBarLabel: () => (
            <Ionicons name="md-timer-outline" size={40} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
