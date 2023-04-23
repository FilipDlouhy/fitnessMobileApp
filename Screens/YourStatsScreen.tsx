import { get, ref } from 'firebase/database';
import { useEffect,useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { db } from '../FireBaseConfig';

export default function YourStatsScreen() {

  const [avgCardioLength,setAvgCardioLength] = useState<number>()
  const [avgNumberOfExerSizesPerWorkout,setAvgNumberOfExerSizesPerWorkout] = useState<number>()
  const [favoriteWorkout,setFavoriteWorkout] = useState<string>()
  const [avgCaloriesConsumend,setAvgCaloriesConsumend] = useState<number>()
  const [avgCaloriesBurned,setAvgCaloriesBurned] = useState<number>()
  const [mostLikedCardio,setMostLikedCardio] = useState<string>()
  const [avgSteps,setAvgSteps] = useState<number>()


useEffect(()=>{
    const caloriesBurnedTodayRef = ref(db, `caloriesBurnedByDay/`);
    get(caloriesBurnedTodayRef).then((snapshot) => {
      if (snapshot.exists()) {
        let calories = 0
        let divider = 0
        Object.values(snapshot.val()).map((day:any)=>{
            calories+=  day.caloriesBurned
            divider++
        })
        setAvgCaloriesBurned(Math.round(calories / divider))
      }
      else
      {
        setAvgCaloriesBurned(0)
      }
    });

  const caloriesConsumedTodayRef = ref(db, `caloriesConsumedByDay/`);
  get(caloriesConsumedTodayRef).then((snapshot) => {
    if (snapshot.exists()) {
          let calories = 0
          let divider = 0
          Object.values(snapshot.val()).map((day:any)=>{
              calories+=  day.caloriesBurned
              divider++
          })
          setAvgCaloriesConsumend(Math.round(calories / divider))
    }
    else
    {
      setAvgCaloriesConsumend(0)
    }
      });


  const stepsRef = ref(db, `Steps/`);
  get(stepsRef).then((snapshot) => {
    if (snapshot.exists()) {
          let steps = 0
          let divider = 0
          Object.values(snapshot.val()).map((day:any)=>{
              divider++
              steps+= day.stepsForToday
          })
          setAvgSteps(Math.round(steps/divider))
    }
    else
    {
      setAvgSteps(0)
    }
  });

  const  wokroutDoneByDayRef = ref(db, `wokroutDoneByDay/`);
  get(wokroutDoneByDayRef).then((snapshot) => {
    if (snapshot.exists()) {
      const ids: string[] = []
      Object.values(snapshot.val()).map((workout: any) => {
        ids.push(workout.id)
      })
      const count: { [key: string]: number } = ids.reduce((acc:any, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommon: string = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
      const  mostCommonWokroutRef = ref(db, `workouts/${mostCommon}`);
      get(mostCommonWokroutRef).then((snapshot) => {
          if (snapshot.exists()) {
              const workout = snapshot.val()
              setFavoriteWorkout(workout.name)
          }
      });
    }
    else
    {
      setFavoriteWorkout("None")
    }
  });

  const  cardioRef = ref(db, `cardio/`);
  get(cardioRef).then((snapshot) => {
    if (snapshot.exists()) {
      const names: string[] = []
      let length = 0
      let divider = 0
      Object.values(snapshot.val()).map((cardio: any) => {
          names.push(cardio.sport)
          length += cardio.duration
          divider++
      })
      const count: { [key: string]: number } = names.reduce((acc:any, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommon: string = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
      setMostLikedCardio(mostCommon)
      setAvgCardioLength(Math.round(length / divider))
    }
    else
    {
      setAvgCardioLength(0)
      setMostLikedCardio("None")
    }
  });


  const  workoutRef = ref(db, `workouts/`);
  get(workoutRef).then((snapshot) => {
    if (snapshot.exists()) {
      let wokroutLength = 0
      let divider = 0
      Object.values(snapshot.val()).map((workout:any)=>{
          wokroutLength += workout.exersizes.length
          divider++
      })
      setAvgNumberOfExerSizesPerWorkout(Math.round(wokroutLength / divider))
    }
    else
    {
      setAvgNumberOfExerSizesPerWorkout(0)
    }
  });
},[])

return (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.Heading}>
            <Text style={styles.HeadingText}>Your Average Stats</Text>
        </View>

          <View style={styles.StatVariants}>
                <View  style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Most Liked Cardio Type</Text>               
                    <Text style={styles.StatVariantStat}>{avgCardioLength}</Text>
                </View>
                <View style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Average Cardio Length</Text>               
                    <Text style={styles.StatVariantStat}>{mostLikedCardio}</Text>
                </View>
                <View  style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Favorite Workout</Text>                  
                    <Text style={styles.StatVariantStat}>{favoriteWorkout} </Text>
                </View>
                <View style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Average Number of Exersizes per Workout</Text>              
                    <Text style={styles.StatVariantStat}>{avgNumberOfExerSizesPerWorkout}</Text>
                </View>
                <View  style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Average Steps</Text>               
                    <Text style={styles.StatVariantStat}>{avgSteps}</Text>
                </View>
                <View  style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Average Calories Consumed</Text>      
                    <Text style={styles.StatVariantStat}>{avgCaloriesConsumend}</Text>
                </View>
                <View  style={styles.StatVariant}>
                    <Text style={styles.StatVariantText}>Average Calories Burned</Text>          
                    <Text style={styles.StatVariantStat}>{avgCaloriesBurned}</Text>
                </View>
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
  StatVariants:
  {
    width:"100%",
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-around",
    marginBottom:30
  },
  StatVariant:
  {
    width:"45%",
    height:150, 
    backgroundColor:"#120A8F",
    borderRadius:5,
    marginTop:20,
    marginBot:20,
    justifyContent:"space-around",
    alignItems:"center"
  },
  StatVariantText:
  {
    fontSize:20,
    fontWeight:"500",
    color:"white",
    textAlign:"center"
  },
  StatVariantStat:
  {
  fontSize:17,
  fontWeight:"800",
  color:"white",
  textAlign:"center"
  }
});