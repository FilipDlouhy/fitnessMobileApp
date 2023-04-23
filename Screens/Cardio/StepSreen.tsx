import { get, ref, set } from 'firebase/database';
import { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, TouchableHighlight } from 'react-native';
import { db } from '../../FireBaseConfig';

interface Steps
{
    date:string,
    stepsForToday:number
}

export default function StepSreen({navigation}:any) {
    const [steps, setSteps] = useState('');
    useEffect(() => {
        const date = new Date()
        const dailyStatsRef = ref(db, "Steps/"+date.toDateString());
        get(dailyStatsRef).then((snapshot) => {
          if (snapshot.exists()) {
            Object.values(snapshot.val()).map((Steps)=>{
                //@ts-ignore
               if(!isNaN(Steps))
               {
                //@ts-ignore
                setSteps(Steps.toString())
               } 
            })
          }
        });
      }, []);

    const handleStepsChange = (newText:string) => {
        setSteps(newText);
    };

    function addStepsToDatabase()
    {
        const date = new Date()
        const Steps:Steps =
        {
            date:date.toDateString(),
            stepsForToday:parseInt(steps)
        }
        //set(ref(db,"Steps/"+date.toDateString()),Steps)
        let calories = 0
        const stepsRef = ref(db,"Steps/"+date.toDateString())
        get(stepsRef).then((snapshot) => {
          if (snapshot.exists()) {
            let oldSteps:any 
            Object.values(snapshot.val()).map((item:any)=>{
                oldSteps =  item
            })
            calories = (parseInt(steps) - parseInt(oldSteps)) *0.08
            
            const caloriesBurnedTodayRef = ref(db, `caloriesBurnedByDay/${date.toDateString()}`);
            get(caloriesBurnedTodayRef).then((snapshot) => {
            if (snapshot.exists()) {
                
                Object.values(snapshot.val()).map((item:any)=>{
                    calories+= item
                })
            
                set(caloriesBurnedTodayRef,{caloriesBurned:calories})
            }
            else
            {
                set(caloriesBurnedTodayRef,{caloriesBurned:calories})

            }
            set(ref(db,"Steps/"+date.toDateString()),Steps)
            });
          }
          else
          {
            calories = parseInt(steps) *0.08
            const caloriesBurnedTodayRef = ref(db, `caloriesBurnedByDay/${date.toDateString()}`);
            get(caloriesBurnedTodayRef).then((snapshot) => {
            if (snapshot.exists()) {
                
                Object.values(snapshot.val()).map((item:any)=>{
                    calories+= item
                })
            
                set(caloriesBurnedTodayRef,{caloriesBurned:calories})
            }
            else
            {
                set(caloriesBurnedTodayRef,{caloriesBurned:calories})

            }})
            set(ref(db,"Steps/"+date.toDateString()),Steps)
          }
        });


        navigation.navigate('Cardio')
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Setps</Text>
            </View>

            <View style={styles.FormContainer}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>How many Steps to Add</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleStepsChange}
                        value={steps}
                        keyboardType='numeric'
                        placeholder="Steps"
                    />
                </View>





                <View style={styles.BottomButtonContainer}>
                    <TouchableHighlight onPress={()=>{addStepsToDatabase()}} style={styles.BottomButton}>
                        <Text style={styles.BottomButtonText}>Upadate Steps for Today</Text>
                    </TouchableHighlight>
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
    scrollViewContent: {
        alignItems: 'center'
    },    Heading: {
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
    FormContainer:{
        width:"100%",
        alignItems:"center"
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
    }
    ,
    datePicker: {
        width: '80%',
        marginBottom: 10,
    },
    BottomButtonContainer:{
        width:"100%",
        marginTop:50,
        marginBottom:50,
        justifyContent:"center",
        alignItems:"center"
    },BottomButton:
    {
        width:"65%",
        height:70,
        backgroundColor:"#00FF00",
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    },
    BottomButtonText:{
        color:"white",
        fontSize:20,
        fontWeight:"700"
    }
  })
  ;