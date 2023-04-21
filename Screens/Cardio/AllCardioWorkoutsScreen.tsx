import { get, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { db } from '../../FireBaseConfig';
import CardioWorkout from '../../Components/WeightLifting/CardioWorkout';


interface CardioWorkoutDatabase
{
    calories:number,
    sport:string,
    date:string,
    id:string
}


export default function AllCardioWorkoutsScreen({ navigation }: any) {



  const [cardioWorkouts,setCardioWorkouts] = useState<CardioWorkoutDatabase[]>()
  
  useEffect(() => {
    const arr:CardioWorkoutDatabase[] = []
    const dailyStatsRef = ref(db,'cardio/');
    get(dailyStatsRef).then((snapshot) => {
      if (snapshot.exists()) {
        Object.values(snapshot.val()).map((Cardio) => {
          //@ts-ignore
          arr.push(Cardio) 
        });
        setCardioWorkouts(arr); // Move the console.log here
      }
    });
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>All your Cardio workouts</Text>
      </View>

      {cardioWorkouts&& cardioWorkouts.map((cardio)=>{
      return  <CardioWorkout setCardioWorkouts={setCardioWorkouts} cardioWorkouts={cardioWorkouts} cardio={cardio}/>
      })}


      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
  },
  heading: {
    height: 80,
    backgroundColor: '#007FFF',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  bottomButtonContainer: {
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '60%',
    height: 70,
    backgroundColor: '#00FF00',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});