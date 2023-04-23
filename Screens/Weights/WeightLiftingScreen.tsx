import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import Workout from '../../Components/Workout';
import {useEffect, useState} from "react"
import {ref,get} from "firebase/database"
import { db } from '../../FireBaseConfig';


interface exerSize 
{
name:string,
sets:number
}

interface workout 
{
    exersizes:exerSize[],
    id:string,
    name:string
}

export default function WeightLiftingScreen({ navigation }:any) {

    const [Workouts, setWorkouts] = useState<workout[]>([])
    useEffect(() => {
        const dailyStatsRef = ref(db, `workouts/`);
        get(dailyStatsRef).then((snapshot) => {
          if (snapshot.exists()) {
            const arr:workout[] = []
           const workouts = snapshot.val()
           Object.values(workouts).map((value) => {
            // @ts-ignore
            const newWorkout:workout ={exersizes:value.exercises,id:value.id,name:value.name}
            arr.push(newWorkout)
          });
          setWorkouts(arr)
          }
        });
      }, []);
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Your Workouts</Text>
            </View>

            <TouchableHighlight
            onPress={() => navigation.navigate('Create Workout')}
            style={styles.CreateWorkout}
              >
              <Text style={styles.CreateWorkoutText}>Create Workouts</Text>
            </TouchableHighlight>

            <Text style={styles.YourWorkoutsText}>Your Workouts</Text>

            {Workouts.map((workout)=>{
                return <Workout Workouts={Workouts} setWorkouts={setWorkouts} navigation={navigation}  workout={workout}/>
            })}


       </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    Heading: {
        height: 80,
        backgroundColor: "#007FFF",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    HeadingText: {
        color: "white",
        fontWeight: "800",
        fontSize: 35
    },
    YourWorkoutsText: {
        fontWeight: "800",
        fontSize: 30,
        marginBottom: 20
    },
    scrollViewContent: {
        alignItems: 'center'
    },
    CreateWorkout: {
      height: 45,
      borderRadius: 5,
      backgroundColor: "#00BFFF",
      width: 250,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40
  },
  CreateWorkoutText: {
      color: "white",
      fontWeight: "800",
      fontSize: 20
  },
});