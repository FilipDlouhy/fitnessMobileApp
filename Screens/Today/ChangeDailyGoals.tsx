import { View, Text, StyleSheet, TouchableHighlight, ScrollView, TextInput } from 'react-native';
import { useState ,useEffect} from 'react';
import {ref,set,get} from "firebase/database"
import { db } from '../../FireBaseConfig';
import {useContext} from "react"
import { FitnessContext } from '../../FitnessContext';





export default function ChangeDailyGoals({ navigation }:any) {
    const {userId} =useContext(FitnessContext)
    const [CaloriesConsumed, setCaloriesConsumed] = useState('');
    const [CaloriesBurned, setCaloriesBurned] = useState('');
    const [Steps, setSteps] = useState('');
    const handleCaloriesConsumed = (newText:string) => {
        setCaloriesConsumed(newText);
      };    
      const handleCaloriesBurned = (newText:string) => {
        setCaloriesBurned(newText);
      };    
      const handleSteps = (newText:string) => {
        setSteps(newText);
      };
      const ChangeStats = () => {

        set(ref(db,"dailyStats/"+userId),{
            CaloriesConsumed:CaloriesConsumed,
            CaloriesBurned:CaloriesBurned,
            Steps:Steps,
            id:userId
        })

      };

      function UpdateStats() {
        set(ref(db, `dailyStats/${userId}`), {
            CaloriesConsumed:CaloriesConsumed,
            CaloriesBurned:CaloriesBurned,
            Steps:Steps,
            id:userId
        });
      }
      useEffect(() => {
        const dailyStatsRef = ref(db, `dailyStats/${userId}`);
        get(dailyStatsRef).then((snapshot) => {
          if (snapshot.exists()) {
            const stats= snapshot.val()
            setCaloriesConsumed(stats.CaloriesConsumed)
            setCaloriesBurned(stats.CaloriesBurned)
            setSteps(stats.Steps)
          }
        });
      }, []);


    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Change Your Stats for Today</Text>
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Calories Consumed in a Day</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleCaloriesConsumed}
                    value={CaloriesConsumed}
                    placeholder="Type here"
                    keyboardType='numeric'
                />
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Calories Burned in a Day</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleCaloriesBurned}
                    value={CaloriesBurned}
                    placeholder="Type here"
                    keyboardType='numeric'
                />
            </View>


            <View style={styles.label}>
                <Text style={styles.labelText}>Steps in a Day</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSteps}
                    value={Steps}
                    placeholder="Type here"
                    keyboardType='numeric'
                />
            </View>


            <View style={styles.BottomG}>
                <TouchableHighlight onPress={()=>{
                    if(CaloriesConsumed && CaloriesBurned&& Steps)
                    {
                        UpdateStats()
                    }
                    else
                    {
                        ChangeStats()
                    }
                    navigation.navigate("Today")
                  }} style={styles.ChangeStatsBtn}>
                    <Text style={styles.ChangeStatsBtnText}>Update Daily Goals</Text>
                </TouchableHighlight>
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
        fontSize:25
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
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
      }
    ,label:
    {
        width:"100%",
        height:100,
        marginTop:30,
        marginBottom:30,
        alignItems:'center',
        justifyContent:"center"
    },
    labelText:{
        fontSize:20,
        fontWeight:"600"
    },
    BottomG:{
        width:"100%",
        height:80,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:30
    }
});

