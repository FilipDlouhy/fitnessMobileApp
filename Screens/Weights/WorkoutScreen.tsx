import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import Workout from '../../Components/Workout';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { get, ref, set } from 'firebase/database';
import { db } from '../../FireBaseConfig';
import WorkoutExerSize from '../../Components/WorkoutExerSize';
import uuid from 'react-uuid';

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

type ParamList = { WorkoutScreen: { workoutId: string }; }
type Props = {
    route: RouteProp<ParamList, 'WorkoutScreen'>;
    navigation:any
  }

export default function WorkoutScreen({navigation,route}: Props) {
    const [Wokrout, setWokrout] = useState<workout>()
    const [ShowUpdate, setShowUpdate] = useState<boolean>(false)
    const [ExerSizes,setExerSizes] = useState<exerSize[]>([])

    useEffect(() => {
        const workoutsRef = ref(db, `workouts/${route.params.workoutId}`);
        get(workoutsRef).then((snapshot) => {
          if (snapshot.exists()) {
           const workout = snapshot.val()
           let exersizes
           let id
           let name
           Object.values(workout).map((value,index) => {
            if(index ===0)
            {
                exersizes=value
            }
            else if(index === 1)
            {
                id=value
            }
            else if(index === 2)
            {
                name=value
            }
             });
             // @ts-ignore
            const newWorkout:workout ={exersizes:exersizes,id:id,name:name}
            setWokrout(newWorkout)
            setExerSizes(newWorkout.exersizes)
          }
        });
      }, []);

      function updateWorkout()
      {
        if(Wokrout){
            const newWorokout:workout= {exersizes:ExerSizes,id:Wokrout?.id,name:Wokrout?.name}
            const dailyStatsRef = ref(db, `workouts/${Wokrout?.id}`);
            set(dailyStatsRef,newWorokout);
            navigation.navigate("Weight Lifting")
        }

      }

      function addWorkoutForToday()
      {
        const date = new Date()
        const id = uuid()
        const workoutsRef = ref(db, `wokroutDoneByDay/${id}`);
        set(workoutsRef,  {date:date.toDateString(),id:Wokrout?.id});
        let calories = 0
        Wokrout?.exersizes.map((exersize)=>{
           calories += exersize.sets * 15
        })

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
        });

        navigation.navigate("Weight Lifting")
      }

    return (<ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Your Workout</Text>
            </View>

            <Text style={styles.WorkoutHeading}>{Wokrout?.name}</Text>



            <View style={styles.ExersizeContainer}>
                {ExerSizes.map((workout)=>{
                    return <WorkoutExerSize ExerSizes={ExerSizes} setExerSizes={setExerSizes} setShowUpdate={setShowUpdate} exerSize={workout}/>
                })}
            </View>


            <View style={styles.BottomButtonsContainer}>

            <View style={styles.BottomButton}>
                        <TouchableHighlight  style={styles.BottomButtonTouch}>
                                <Text style={styles.BottomButtonTouchText}>Delete Workout</Text>
                            </TouchableHighlight>
                        </View>

                       {ShowUpdate&&  <View style={styles.BottomButton}>
                            <TouchableHighlight onPress={()=>{updateWorkout()}} style={styles.BottomButtonTouch}>
                                <Text style={styles.BottomButtonTouchText}>Update Workout</Text>
                            </TouchableHighlight>
                        </View>}

            </View>


            <TouchableHighlight onPress={()=>{addWorkoutForToday()}}  style={styles.AddWrokoutBtn} >
                    <Text  style={styles.AddWrokoutBtnText}>Add Workout for Today</Text>
            </TouchableHighlight>


       </ScrollView>);
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
    WorkoutHeading: {
        marginBottom: 40,
        marginTop: 40,
        fontSize: 30,
        fontWeight: "700"
    },
    ExersizeContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around",
        flexWrap: "wrap"
    },
    ExerSize: {
        width: "45%",
        borderRadius: 5,
        height: 150,
        backgroundColor: "#3F00FF",
        marginTop: 20,
        marginBottom: 20
    },
    ExerSizeTop: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    ExerSizeTopText: {
        fontWeight: "700",
        fontSize: 17,
        color: "white",
    },
    ExerSizeBottom: {
        width: "100%",
        height: "50%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ExerSizeBottomTop: {
        width: "100%",
        height: "50%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    ExerSizeBottomBot: {
        width: "100%",
        height: "50%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    ExerSizeBottomText: {
        fontSize: 20,
        fontWeight: "500",
        color: "white"
    },
    BottomButtonsContainer:
    {
        width:"100%",
        height:200,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    BottomButton:{
        width:"45%",
        height:70,
        borderRadius:5,
        backgroundColor:"#1877F2",
        justifyContent:"center",
        alignItems:"center"
    },
    BottomButtonTouch:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    BottomButtonTouchText:{
        fontSize:20,
        color:"white",
        fontWeight:"500"
    },
    AddWrokoutBtn:{
        width:"75%",
        height:80,
        marginBottom:50,
        marginTop:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#15f4ee",
        borderRadius:5
    },
    AddWrokoutBtnText:{
        fontSize:25,
        color:"white",
        fontWeight:"700"
    }
});