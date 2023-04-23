import {useContext, useState} from "react"
import Workout from '../../Components/WeightLifting/Workout';
import { View, Text, StyleSheet,ScrollView,TextInput, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ExerSize from "../../Components/WeightLifting/ExerSize";
import {ref,set,get} from "firebase/database"
import { db } from '../../FireBaseConfig';
import { FitnessContext } from '../../FitnessContext';
import uuid from "react-uuid";
export default function CreateWorkoutScreen({ navigation }:any) {

interface exerSize 
{
name:string,
sets:number
}


    const [WokroutName, setWorkoutName] = useState('');
    const [SelectedExerSize, setSelectedExerSize] = useState("");
    const [ExerSizeSets, setExerSizeSets] = useState<number>(0);
    const [ExerSizes, setExerSizes] = useState<exerSize[]>([]);
    const numbers = [0,1,2,3,4,5,6,7];
    const exercises = [
        " ",
        "Bench Press",
        "Squat",
        "Deadlift",
        "Overhead Press",
        "Barbell Row",
        "Pull-ups",
        "Chin-ups",
        "Dips",
        "Push-ups",
        "Cable Flys",
        "Incline Press",
        "Decline Press",
        "Hammer Curls",
        "Bicep Curls",
        "Tricep Pushdowns",
        "Skull Crushers",
        "Leg Press",
        "Lunges",
        "Step-ups",
        "Leg Curls",
        "Calf Raises",
        "Lat Pulldowns",
        "Seated Rows",
        "Face Pulls",
        "Shoulder Raises",
        "Front Raises",
        "Side Raises",
        "Reverse Flys",
        "Crunches",
        "Planks",
      ];

    const handleWokroutName = (newText:string) => {
      setWorkoutName(newText);
    };
    const handleSelectedExerSize = (newText:string) => {
        setSelectedExerSize(newText);
      };
      const handleExerSizeSets = (sets:number) => {
        setExerSizeSets(sets);
      };

      function addExerSiez() {
        let contains = true
        ExerSizes.map((exercise)=>{
            if(exercise.name === SelectedExerSize)
            {
                contains = false
            }
        })
        if(contains)
        {
            const newExersize: exerSize = { name: SelectedExerSize, sets: ExerSizeSets };
            setExerSizes((prevExerSizes) => [...prevExerSizes, newExersize]);
            setSelectedExerSize("")
            setExerSizeSets(0)
        }

      }



      const AddWorkoutToDatabase = () => {
        const id = uuid()
        const workout ={
            name:WokroutName,
            exersizes:ExerSizes,
            id:id
        }
        set(ref(db,"workouts/"+id),workout)
        navigation.navigate('Weight Lifting')
      };

    return (

      <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Create your workout</Text>
            </View>

            <View style={styles.label}>
                <Text style={styles.labelText}>Name of Your Workout</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleWokroutName}
                    value={WokroutName}
                    placeholder="Type here"
                />
            </View>




            <View style={styles.label}>
                <Text style={styles.labelText}>Select Exersize</Text>
                <Picker
                selectedValue={SelectedExerSize}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => handleSelectedExerSize(itemValue)}
                    >
                {exercises.map((exercise) => (
                    <Picker.Item key={exercise} label={exercise} value={exercise} />
                ))}
                </Picker>
            </View>


            <View style={styles.label}>
                <Text style={styles.labelText}>Select Number of Sets for a Exersize</Text>
                <Picker
                selectedValue={ExerSizeSets}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => handleExerSizeSets(itemValue)}
                    >
                {numbers.map((number) => (
                    <Picker.Item key={number} label={number.toString()} value={number} />
                ))}
                </Picker>
            </View>

            <TouchableHighlight onPress={()=>{
                if(ExerSizeSets > 0)
                {
                    addExerSiez()
                }
            }} style={styles.AddExersize}>
             <Text style={styles.AddExersizeText}>Add Exersize</Text>
            </TouchableHighlight>



            <Text style={styles.ExersizesText} >Exersizes</Text>



            {
                ExerSizes&& ExerSizes.map((exerSize)=>{
                    return <ExerSize ExerSizes={ExerSizes} setExerSizes={setExerSizes} ExerSize={exerSize}/>
                })
            }

            
            <TouchableHighlight onPress={()=>{AddWorkoutToDatabase()}} style={styles.AddWorkout}>
             <Text style={styles.AddExersizeText}>Add Workout</Text>
            </TouchableHighlight>

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
    AddExersize: {
        height: 45,
        borderRadius: 5,
        backgroundColor: "#00BFFF",
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    AddExersizeText:
    {
        fontSize:25,
        color:"white",
        fontWeight:"500"
    },
    AddWorkout:
    {
        height: 60,
        borderRadius: 5,
        backgroundColor: "#00BFFF",
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40
    },
    AddWorkoutText:
    {
        fontSize:40,
        color:"white",
        fontWeight:"500"
    },
    ExersizesText:
    {
        fontSize:40,
        fontWeight:"600",
        marginBottom:30,
        marginTop:30
    },
    Exersize:
    {
        width:"80%",
        height:45,
        marginBottom:20,
        marginTop:20,
        backgroundColor:"#1E90FF",
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row"
    },
    ExersizesNameSets:{
        color:"white",
        fontSize:20,
        fontWeight:"600"
    },
    DeleteExerSize:
    {
        color:"red",
        fontSize:30,
        fontWeight:"900"
    }

});