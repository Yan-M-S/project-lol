import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import MatchHistory from '../Screens/MatchHistory/MatchHistory';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
        >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="MatchHistory" component={MatchHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;