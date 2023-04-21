import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CardioScreen from './Screens/Cardio/CardioScreen';
import FoodScreen from './Screens/Food/FoodScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateWorkoutScreen from './Screens/Weights/CreateWorkoutScreen';
import CardioAddScreen from './Screens/Cardio/CardioAddScreen';
import TodayScreen from './Screens/Today/TodayScreen';
import ChangeDailyGoals from './Screens/Today/ChangeDailyGoals';
import YourStatsScreen from './Screens/YourStatsScreen';
import StepSreen from './Screens/Cardio/StepSreen';
import { FitnessContext } from './FitnessContext';
import WeightLiftingScreen from './Screens/Weights/WeightLiftingScreen';
import WorkoutScreen from './Screens/Weights/WorkoutScreen';
import FoodAddedToday from './Screens/Food/FoodAddedToday';
import AllCardioWorkoutsScreen from './Screens/Cardio/AllCardioWorkoutsScreen';

const Stack = createStackNavigator();




export default function App() {
  const [userId,setUserId] = useState<string>("69b3785d-1c5a-4f1a-9d6f-d8f630faff1a")
  const [selectedSport,setSelectedSport] = useState<string>("69b3785d-1c5a-4f1a-9d6f-d8f630faff1a")

  return (
    <FitnessContext.Provider value={{userId,selectedSport,setSelectedSport}}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create Workout" component={CreateWorkoutScreen} />
       <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Cardio" component={CardioScreen} />
        <Stack.Screen name="Weight Lifting" component={WeightLiftingScreen} />
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
        <Stack.Screen name="Today" component={TodayScreen} />
        <Stack.Screen name="CardioAddScreen" component={CardioAddScreen} />
        <Stack.Screen name="ChangeDailyGoals" component={ChangeDailyGoals} />
        <Stack.Screen name="YourStats" component={YourStatsScreen} />
        <Stack.Screen name="StepSreen" component={StepSreen} />
        <Stack.Screen name="Food Today" component={FoodAddedToday} />
        <Stack.Screen name="All Cardio Workouts" component={AllCardioWorkoutsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </FitnessContext.Provider>
  );
}
