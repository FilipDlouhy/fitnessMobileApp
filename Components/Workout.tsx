import { ref, set } from 'firebase/database';
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { db } from '../FireBaseConfig';

interface exerSize 
{
    name:string,
    sets:number
}

interface workout 
{
    exersizes:exerSize[],
    id:string,
    name:string
}

interface props
{
    workout:workout,
    navigation:any
    Workouts: workout[]
    setWorkouts: React.Dispatch<React.SetStateAction<workout[]>>    
}

export default function Workout({navigation,workout,Workouts,setWorkouts}:props) {
    function deleteWorkout ()
    {
        const arr:workout[] =[]
        Workouts.map((WORKOUT)=>{
            if(WORKOUT.id !== workout.id)
            {
                arr.push(WORKOUT)
            }
        })
        setWorkouts(arr)
        const dailyStatsRef = ref(db, `workouts/${workout.id}`);
        set(dailyStatsRef, null);
    }

    return (
        <TouchableHighlight onPress={()=>{navigation.navigate("WorkoutScreen",{workoutId:workout.id})}}  style={styles.Workout}>
            <View style={styles.WorkoutContianer}>
                <Text style={styles.WokroutName}>{workout?.name}</Text>
                <Text  onPress={()=>{deleteWorkout()}} style={styles.DeleteWorkout}>X</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    Workout: {
        height: 60,
        width: 300,
        backgroundColor: "#007FFF",
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        paddingLeft:10,
        paddingRight:10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection:"row"
    },
    WorkoutContianer:{
        width:"100%",
        height:"100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft:10,
        paddingRight:10,
        flexDirection:"row"
    },
    WokroutName: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
        letterSpacing: 5
    },
    DeleteWorkout:
    {
        color: "red",
        fontWeight: "900",
        fontSize: 30,
        letterSpacing: 5,
    }
});