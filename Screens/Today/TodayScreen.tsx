import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import {useEffect,useContext,useState} from "react"
import {ref,get} from "firebase/database"
import { FitnessContext } from '../../FitnessContext';
import { db } from '../../FireBaseConfig';
export default function TodayScreen({ navigation }:any) {
    const {userId} =useContext(FitnessContext)
    const [CaloriesConsumed, setCaloriesConsumed] = useState('');
    const [CaloriesBurned, setCaloriesBurned] = useState('');
    const [Steps, setSteps] = useState('');


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
                <Text style={styles.HeadingText}>Your Stats for Today</Text>
            </View>

            <TouchableHighlight onPress={()=>{
                navigation.navigate("ChangeDailyGoals")
            }} style={styles.ChangeStatsBtn}>
                <Text style={styles.ChangeStatsBtnText}>Change Your Daily Goals</Text>
            </TouchableHighlight>

            <View style={styles.CategoryDiv}>
                <Text style={styles.CategoryDivHeading}>Calories Consumed</Text>
                <Text style={styles.CategoryDivStats}> 400/{CaloriesConsumed}</Text>
            </View>

            <View style={styles.CategoryDiv}>
                <Text style={styles.CategoryDivHeading}>Calories Burned</Text>
                <Text style={styles.CategoryDivStats}> 400/{CaloriesBurned}</Text>
            </View>

            <View style={styles.CategoryDiv}>
                <Text style={styles.CategoryDivHeading}>Steps</Text>
                <Text style={styles.CategoryDivStats}> 400/{Steps}</Text>
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

