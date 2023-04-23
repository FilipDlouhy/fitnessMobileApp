import { get, ref, set } from 'firebase/database';
import React,{useEffect} from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { db } from '../../FireBaseConfig';


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

interface props
{
    food:foodDatabase,
    setTodayFood: React.Dispatch<React.SetStateAction<foodDatabase[] | undefined>>
    todayFood: foodDatabase[] | undefined
    setTodayFoodRender: React.Dispatch<React.SetStateAction<foodDatabase[] | undefined>>
    todayFoodRender: foodDatabase[]
    setCaloriesEaten: React.Dispatch<React.SetStateAction<Calories | undefined>>
    caloriesEaten: Calories | undefined
}
export default function TodayFoodItem({setCaloriesEaten,caloriesEaten,todayFoodRender,setTodayFoodRender,food,setTodayFood,todayFood}:props) {


    function deleteFood()
    {
        const arr:foodDatabase[] =[]
        const arrToRender:foodDatabase[] =[]
        todayFood?.map((obj)=>{
            if(food.id !== obj.id)
            {
                arr.push(obj)
            }
            else
            {
              const caloriesToSubtract:number = obj.ammount * parseInt(obj.calories)
              if(caloriesEaten)
              {
                setCaloriesEaten({eaten:caloriesEaten?.eaten-caloriesToSubtract,planned:caloriesEaten?.planned})
              }
            }
        })
        todayFoodRender?.map((obj)=>{
          if(food.id !== obj.id)
          {
            arrToRender.push(obj)
          }
      })

        const caloriesConsumedByDay = ref(db, `caloriesConsumedByDay/${food.date}`);
        let calories = -(parseInt(food.calories) * food.ammount);
        get(caloriesConsumedByDay).then((snapshot) => {
          if (snapshot.exists()) {
            
            Object.values(snapshot.val()).map((item:any)=>{
                calories+= item
            })
           
            set(caloriesConsumedByDay,{caloriesBurned:calories})
          }
          else
          {
            set(caloriesConsumedByDay,{caloriesBurned:calories})
    
          }
        });

        setTodayFood(arr)
        setTodayFoodRender(arrToRender)
        const dailyStatsRef = ref(db, `food/${food.id}`);
        set(dailyStatsRef, null);
    }

  return (
    <View style={styles.FoodTodayItem}>
      <View style={styles.FoodTodayItemViewCenter}>
        <Text style={styles.FoodTodayItemHeading}>{food.name}</Text>
      </View>
      <View style={styles.FoodTodayItemViewArround}>
        <View style={styles.FoodTodayItemViewArroundInnerData}>
          <Text style={styles.FoodTodayItemViewArroundInnerDataHeading}>Brand</Text>
          <Text style={styles.FoodTodayItemViewArroundInnerDataData}>{food.brand}</Text>
        </View>
        <View style={styles.FoodTodayItemViewArroundInnerData}>
          <Text style={styles.FoodTodayItemViewArroundInnerDataHeading}>When</Text>
          <Text style={styles.FoodTodayItemViewArroundInnerDataData}>{food.when}</Text>
        </View>
      </View>
      <View style={styles.FoodTodayItemViewArround}>
        <View style={styles.FoodTodayItemViewArroundInnerData}>
          <Text style={styles.FoodTodayItemViewArroundInnerDataHeading}>Ammount</Text>
          <Text style={styles.FoodTodayItemViewArroundInnerDataData}>{food.ammount}</Text>
        </View>
        <View style={styles.FoodTodayItemViewArroundInnerData}>
          <Text style={styles.FoodTodayItemViewArroundInnerDataHeading}>Calories</Text>
          <Text style={styles.FoodTodayItemViewArroundInnerDataData}>{food.calories}</Text>
        </View>
      </View>
      <View style={styles.FoodTodayItemViewButtons}>
        <TouchableHighlight onPress={()=>{deleteFood()}} style={styles.DeleteButton}>
          <Text style={styles.DeleteButtonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
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