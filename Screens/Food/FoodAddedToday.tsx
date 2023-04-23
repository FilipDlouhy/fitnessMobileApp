import React, { useState,useEffect, useContext } from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet } from 'react-native';
import TodayFoodItem from '../../Components/TodayFoodItem';
import { get, ref } from 'firebase/database';
import { db } from '../../FireBaseConfig';
import { FitnessContext } from '../../FitnessContext';

interface foodDatabase
{
  name: string
  brand:  string
  calories: string
  ammount:number,
  when:string,
  id:string,
  date:string
}
interface Calories{
  eaten:number,
  planned:number
}

export default function FoodAddedToday() {
  const [todayFood,setTodayFood] = useState<foodDatabase[]>()
  const [todayFoodRender,setTodayFoodRender] = useState<foodDatabase[]>()
  const [caloriesEaten,setCaloriesEaten] = useState<Calories>()
  const {userId} = useContext(FitnessContext)

  useEffect(() => {
    let caloriesEaten = 0 
    const date = new Date()
    const dailyFoodRef = ref(db, `food/`);
    get(dailyFoodRef).then((snapshot) => {
      if (snapshot.exists()) {
        const arr:foodDatabase[] = []
        Object.values(snapshot.val()).map((food:any)=>{
            if(date.toDateString()=== food.date){
                arr.push(food)
                caloriesEaten = caloriesEaten + (parseInt(food.calories) * parseInt(food.ammount))
            }

        })
        setTodayFood(arr)
        setTodayFoodRender(arr)
        console.log(caloriesEaten)
        const dailyCaloriesRef= ref(db,`dailyStats/${userId}`);
        get(dailyCaloriesRef).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val(); // get the data from the snapshot
            const caloriesConsumed = data.CaloriesConsumed; // access the value of CaloriesBurned property
            setCaloriesEaten({eaten:caloriesEaten,planned:caloriesConsumed})
          }
        });
      }
    });
  }, []);


  function filterArray(name:string) {
    const arr: foodDatabase[] = [];
    if(name.length > 0)
    {
      todayFood?.map((item) => {
        if (item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
          arr.push(item);
        }
      });
  
      setTodayFoodRender(arr)
    }
    else
    {
      setTodayFoodRender(todayFood)
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.Heading}>
        <Text style={styles.HeadingText}>Your Food for Today</Text>
      </View>

      <View style={styles.caloriesEaten}>
        <Text style={styles.caloriesEatenText}>Calories Eaten</Text>
        <Text style={styles.caloriesEatenText}>{caloriesEaten?.eaten} / {caloriesEaten?.planned}</Text>
      </View>

      <View style={styles.label}>
        <Text style={styles.labelText}>Find food</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          onChangeText={(e: string)=>{
            filterArray(e)
          }}
        />
      </View>

      {todayFoodRender && todayFoodRender.map((food)=>{
        return <TodayFoodItem setCaloriesEaten={setCaloriesEaten} caloriesEaten={caloriesEaten} todayFoodRender={todayFoodRender} setTodayFoodRender={setTodayFoodRender} setTodayFood={setTodayFood} todayFood={todayFood} food={food}/>
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
  caloriesEaten:{
    height: 70,
    backgroundColor: "#7FFFD4",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  caloriesEatenText: {
    color: "white",
    fontWeight: "800",
    fontSize: 25
  },
  scrollViewContent: {
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label:
  {
    width: "100%",
    height: 100,
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: "center"
  },
  labelText: {
    fontSize: 20,
    fontWeight: "600"
  },

  FoodTodayItem:{
    width:"80%",
    height:200,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#00BFFF",
    marginBottom:40,
    borderRadius:5
  },
  FoodTodayItemViewCenter:
  {
    width:"100%",
    height:"15%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  FoodTodayItemViewButtons:
  {
    width:"100%",
    height:"15%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  FoodTodayItemViewArround:
  {
    width:"100%",
    height:"35%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
  },
  FoodTodayItemViewArroundInnerData:
  {
    width:"50%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
  },
  FoodTodayItemViewArroundInnerDataHeading:
  {
    fontSize:20,
    fontWeight:"700",
    color:"white",
  },
  FoodTodayItemViewArroundInnerDataData:
  {
    fontSize:17,
    fontWeight:"500",
    color:"white",
  },
  FoodTodayItemHeading:
  {
    fontSize:25,
    fontWeight:"800",
    color:"white",
  },
  DeleteButton:
  {
    width:"50%",
    height:"70%",
    borderRadius:5,
    backgroundColor:"#50C878",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  DeleteButtonText:
  {
    fontSize:15,
    fontWeight:"500",
    color:"white"
  }
});