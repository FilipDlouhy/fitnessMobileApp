import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput,  TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FitnessContext } from '../../FitnessContext';
import uuid from 'react-uuid';
import { db } from '../../FireBaseConfig';
import { ref, set } from 'firebase/database';

interface CardioWorkoutDatabase
{
    calories:number,
    sport:string,
    date:string,
    id:string
}


export default function CardioAddScreen({navigation}:any) {
    const [duration, setDuration] = useState('');
    const [selectedIntesity, setSelectedIntesity] = useState("");
    const {selectedSport} = useContext(FitnessContext)
    const handleDurationChange = (newText:string) => {
        setDuration(newText);
    };

    function calculateCaloriesBurned(sport: string, intensity: string, duration: number): number {
        const SPORTS: Record<string, Record<string, number>> = {
          basketball: {
            low: 240,
            medium: 345,
            hard: 480
          },
          bike: {
            low: 240,
            medium: 345,
            hard: 480
          },
          swimming: {
            low: 270,
            medium: 400,
            hard: 540
          },
          elliptical: {
            low: 270,
            medium: 400,
            hard: 540
          },
          sky: {
            low: 240,
            medium: 345,
            hard: 480
          },
          walking: {
            low: 50,
            medium: 150,
            hard: 200
          }
        };
      
        const sportCalories = SPORTS[sport.toLowerCase()];
        const caloriesBurned = sportCalories[intensity.toLowerCase()] * (duration / 60);
      
        return caloriesBurned;
      }

      function addCardioToDatabase()
      {
        const calories = calculateCaloriesBurned(selectedSport.toLocaleLowerCase(),selectedIntesity.toLocaleLowerCase(),parseInt(duration))
        const date = new Date()
        const id = uuid()
        const cardio:CardioWorkoutDatabase = 
        {
            calories:calories,
            date:date.toDateString(),
            sport:selectedSport,
            id:id
        }
        set(ref(db,"cardio/"+id),cardio)
        navigation.navigate('Cardio')
      }


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>{selectedSport}</Text>
            </View>

            <View style={styles.FormContainer}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>How Long it Lasted In minutes</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleDurationChange}
                        value={duration}
                        keyboardType='numeric'
                        placeholder="Minutes"
                    />
                </View>

                <View style={styles.label}>
                    <Text style={styles.labelText}>Select intesity </Text>
                    <Picker
                        selectedValue={selectedIntesity}
                        style={styles.input}
                        onValueChange={(itemValue, itemIndex) => setSelectedIntesity(itemValue)}
                    >
                        <Picker.Item key={"Low"} label={"Low"} value={"Low"} />
                        <Picker.Item key={"Medium"} label={"Medium"} value={"Medium"} />
                        <Picker.Item key={"Hard"} label={"Hard"} value={"Hard"} />
                    </Picker>
                </View>



                <View style={styles.BottomButtonContainer}>
                    <TouchableHighlight onPress={()=>{addCardioToDatabase()}} style={styles.BottomButton}>
                        <Text style={styles.BottomButtonText}>Add Cardio for Today</Text>
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
        width:"60%",
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