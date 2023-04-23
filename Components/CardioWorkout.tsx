import React from 'react'
import { ref, set } from 'firebase/database';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { db } from '../FireBaseConfig';

interface CardioWorkoutDatabase
{
  calories:number,
  sport:string,
  date:string,
  id:string,
  duration:number
}

interface props
{
  cardioWorkouts: CardioWorkoutDatabase[] | undefined
  setCardioWorkouts: React.Dispatch<React.SetStateAction<CardioWorkoutDatabase[] | undefined>>
  cardio:CardioWorkoutDatabase
}

function CardioWorkout({cardio,cardioWorkouts,setCardioWorkouts}:props) {
  function deleteWorkout()
  {
    const arr:CardioWorkoutDatabase[] = []
    cardioWorkouts?.map((item)=>{
        if(cardio.id !== item.id)
        {
            arr.push(item)
        }
    })
    setCardioWorkouts(arr)
    const dailyStatsRef = ref(db, `cardio/${cardio.id}`);
    set(dailyStatsRef, null);
  }

return (
  <View style={styles.cardioWorkout}> 
    <View style={styles.cardioWorkoutViewCenter}>
        <Text style={styles.cardioWorkoutHeading}>{cardio.sport}</Text>
    </View>

    <View style={styles.cardioWorkoutViewAround}>
        <View style={styles.cardioWorkoutViewAroundView}>
            <Text style={styles.cardioWorkoutViewAroundViewHeading}>Date</Text>
            <Text style={styles.cardioWorkoutViewAroundViewData}>{cardio.date}</Text>
        </View>

        <View style={styles.cardioWorkoutViewAroundView}>
            <Text style={styles.cardioWorkoutViewAroundViewHeading}>Calories</Text>
            <Text style={styles.cardioWorkoutViewAroundViewData}>{cardio.calories}</Text>
        </View>            
    </View>
    <View style={styles.cardioWorkoutViewCenter}>
        <View style={styles.cardioWorkoutViewAroundView}>
            <Text style={styles.cardioWorkoutViewAroundViewHeading}>Minutes</Text>
            <Text style={styles.cardioWorkoutViewAroundViewData}>{cardio.duration} </Text>
        </View>            
    </View>

    <View style={styles.cardioWorkoutViewCenter}>
        <TouchableHighlight onPress={()=>{deleteWorkout()}} style={styles.DeleteBTN}>
            <Text style={styles.DeleteBTNText}>Delete</Text>
        </TouchableHighlight>
    </View>
  </View>
  )
}

export default CardioWorkout

const styles = StyleSheet.create({
  cardioWorkout:
  {
    width:"80%",
    height:200,
    backgroundColor:"#1CAC78",
    marginTop:20,
    marginBottom:20,
    borderRadius:5
  },
  cardioWorkoutHeading:
  {
    fontSize:25,
    fontWeight:"700",
    color:"white"
  },
  cardioWorkoutViewCenter:
  {
    width:"100%",
    height:"20%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  cardioWorkoutViewAround:
  {
    width:"100%",
    height:"40%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  cardioWorkoutViewAroundView:{
    width:"50%",
    height:"100%",
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center"
  },
  cardioWorkoutViewAroundViewHeading:
  {
    fontSize:20,
    fontWeight:"700",
    color:"white"
  },
  cardioWorkoutViewAroundViewData:
  {
    fontSize:15,
    fontWeight:"500",
    color:"white",
    textAlign:"center"
  },
  DeleteBTN:{
    width:"50%",
    height:"50%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:5,
  },
  DeleteBTNText:
  {
    fontSize:15,
    fontWeight:"500"
  }
});







