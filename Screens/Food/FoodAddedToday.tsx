import React, { useState,useEffect } from 'react';
import { ScrollView, TextInput, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import TodayFoodItem from '../../Components/WeightLifting/TodayFoodItem';
import { get, ref } from 'firebase/database';
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

export default function FoodAddedToday() {
  const [text, setText] = useState('');
  const [todayFood,setTodayFood] = useState<foodDatabase[]>()

  useEffect(() => {
    const date = new Date()
    const dailyStatsRef = ref(db, `food/`);
    get(dailyStatsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const arr:foodDatabase[] = []
        Object.values(snapshot.val()).map((food)=>{
            //@ts-ignore
            if(date.toDateString()=== food.date){
                //@ts-ignore
                arr.push(food)
            }

        })
        setTodayFood(arr)
      }
    });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.Heading}>
        <Text style={styles.HeadingText}>Your Food for Today</Text>
      </View>



      <View style={styles.label}>
        <Text style={styles.labelText}>Find food</Text>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Type here"
        />
      </View>

      {todayFood && todayFood.map((food)=>{
        return <TodayFoodItem setTodayFood={setTodayFood} todayFood={todayFood} food={food}/>
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