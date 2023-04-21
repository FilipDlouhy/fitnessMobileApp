import { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { FitnessContext } from '../../FitnessContext';

export default function CardioScreen({
    navigation
}: any) {
    const {setSelectedSport} = useContext(FitnessContext)
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Your Cardio Workouts</Text>
            </View>


            
            <TouchableHighlight
            onPress={() => navigation.navigate('All Cardio Workouts')}
            style={styles.CreateWorkout}
              >
              <Text style={styles.CreateWorkoutText}>See all your cardio workouts</Text>
            </TouchableHighlight>

             <View style={styles.CardioVariants}>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("CardioAddScreen")
                        setSelectedSport("Swimming")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>Swimming</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("CardioAddScreen")
                        setSelectedSport("Bike")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>Bike</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("CardioAddScreen")
                        setSelectedSport("BasketBall")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>BasketBall</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("CardioAddScreen")
                        setSelectedSport("Walking")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>Walking</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("CardioAddScreen")
                        setSelectedSport("Eliptical")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>Eliptical</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("CardioAddScreen")
                        setSelectedSport("Sky")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>Sky</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{
                        navigation.navigate("StepSreen")
                    }} style={styles.CardioVariant}>
                        <Text style={styles.CardioVariantText}>Steps</Text>
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
    CardioVariants:
    {
        width:"100%",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around",
        marginBottom:30
    }
    ,CardioVariant:
    {
        width:"45%",
        height:150, 
        backgroundColor:"#FFD700",
        borderRadius:5,
        marginTop:20,
        marginBot:20,
        justifyContent:"center",
        alignItems:"center"
    },
    CardioVariantText:
    {
        fontSize:25,
        fontWeight:"700",
        color:"white"
    },
    CreateWorkout: {
        height: 45,
        borderRadius: 5,
        backgroundColor: "#17B169",
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    CreateWorkoutText: {
        color: "white",
        fontWeight: "800",
        fontSize: 20
    },
  });