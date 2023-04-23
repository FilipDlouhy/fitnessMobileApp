import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {useEffect,useContext,useState} from "react"
import {ref,get} from "firebase/database"
import { FitnessContext } from '../../FitnessContext';
import { db } from '../../FireBaseConfig';
export default function TodayScreen({ navigation }:any) {

  const {userId} =useContext(FitnessContext)
  const [CaloriesConsumed, setCaloriesConsumed] = useState('');    
  const [CaloriesConsumedFromData, setCaloriesConsumedFromData] = useState(0);
  const [CaloriesBurnedFromData, setCaloriesBurnedFromData] = useState(0);    
  const [CaloriesBurned, setCaloriesBurned] = useState('');
  const [Steps, setSteps] = useState('0');
  const [StepsData, setStepsData] = useState('');


  async function getTotalCaloriesBurned() {

    const dailySteps = ref(db, `Steps/`);
    const dailyWorkouts = ref(db, `wokroutDoneByDay`);
    const dailyCardio = ref(db, `cardio`);
    let totalCaloriesBurned = 0;
  
    const stepsSnapshot = await get(dailySteps);
    if (stepsSnapshot.exists()) {
      const steps = stepsSnapshot.val();
      const date = new Date();
      Object.values(steps).forEach((step:any)=>{
        if(step.date === date.toDateString()) {
          const caloriesBurned = (Math.round(parseInt(step.stepsForToday)*0.08));
          totalCaloriesBurned += caloriesBurned;
        }
      });
    }
      
    const workoutsSnapshot = await get(dailyWorkouts);

    if (workoutsSnapshot.exists()) {
      const workouts= workoutsSnapshot.val();
      const date = new Date();

      Object.values(workouts).forEach(async (wokrout:any,index:number)=>{

        if(date.toDateString() === wokrout) {
          const id= Object.keys(workouts)[index];
          const theWorkout = ref(db, `workouts/${id}`);
          const workoutSnapshot = await get(theWorkout);
          if (workoutSnapshot.exists()) {
            let workoutCalories = 0;
            Object.values(workoutSnapshot.val()).forEach((item)=>{
              if(Array.isArray(item)) {
                item.forEach((exersize)=>{
                  workoutCalories +=parseInt(exersize.sets)* 15;
                });
              }
            });
            totalCaloriesBurned += workoutCalories;
          }
        }
      });
    }
        const cardioSnapshot = await get(dailyCardio);
        if (cardioSnapshot.exists()) {
          const cardio = cardioSnapshot.val();
          const date = new Date();
          Object.values(cardio).forEach((wokrout:any)=>{
            if(wokrout.date === date.toDateString()) {
              totalCaloriesBurned += wokrout.calories;
            }
          });
        }
      
        setCaloriesBurnedFromData(totalCaloriesBurned);
    }
    
  useEffect(() => {
      const dailyStatsRef = ref(db, `dailyStats/${userId}`);
      get(dailyStatsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const stats = snapshot.val();
          setCaloriesConsumed(stats.CaloriesConsumed);
          setCaloriesBurned(stats.CaloriesBurned);
          setSteps(stats.Steps);
        }
      });
      const dailyFood = ref(db, `food/`);
      get(dailyFood).then((snapshot) => {
        if (snapshot.exists()) {
          const food = snapshot.val();
          const date = new Date();
          let caloriesConsumed = 0;
          Object.values(food).map((item:any)=>{
            if(item.date === date.toDateString())
              caloriesConsumed+=(parseInt(item.calories) * parseInt(item.ammount));
          });
          setCaloriesConsumedFromData(caloriesConsumed)
        }
      });

      getTotalCaloriesBurned()

      const date = new Date();
      const dailySteps = ref(db, `Steps/${date.toDateString()}`);

      get(dailySteps).then((snapshot) => {
      if (snapshot.exists()) {
          const data = snapshot.val()
          setStepsData(data.stepsForToday)
      }
      else
      {
        setStepsData("0")
      }
  });
  }, []);

return (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.Heading}>
        <Text style={styles.HeadingText}>Your Stats for Today</Text>
    </View>

    <TouchableHighlight onPress={()=>{
        navigation.navigate("ChangeDailyGoals")
    }} style={styles.ChangeStatsBtn}>
        <Text style={styles.ChangeStatsBtnText}>Change Your Daily Goals</Text>
    </TouchableHighlight>

    <View style={styles.CategoryDiv}>
        <Text style={styles.CategoryDivHeading}>Calories Consumed</Text>
        <Text style={styles.CategoryDivStats}> {CaloriesConsumedFromData}/{CaloriesConsumed}</Text>
    </View>

    <View style={styles.CategoryDiv}>
        <Text style={styles.CategoryDivHeading}>Calories Burned</Text>
        <Text style={styles.CategoryDivStats}> {CaloriesBurnedFromData}/{CaloriesBurned}</Text>
    </View>

    <View style={styles.CategoryDiv}>
        <Text style={styles.CategoryDivHeading}>Steps</Text>
        <Text style={styles.CategoryDivStats}> {StepsData}/{Steps}</Text>
    </View>
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
  scrollViewContent: {
      alignItems: 'center'
  },
  ChangeStatsBtn:
  {
      width:"75%",
      marginBottom:30,
      marginTop:30,
      height:50,
      backgroundColor:"#009000",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:5
  }    ,
  ChangeStatsBtnText:
  {
      color:"white",
      fontSize:20,
      fontWeight:"700"
  },
  CategoryDiv:
  {
      width:"100%",
      height:120,
      marginBottom:30,
      marginTop:30,
      justifyContent:'space-around',
      alignItems:"center",
      backgroundColor:"#00CCCC"
  },
  CategoryDivHeading:
  {
      fontSize:25,
      fontWeight:"600",
      color:"white"
  },
  CategoryDivStats:
  {
      fontSize:25,
      fontWeight:"600",
      color:"green"
  }
});

