import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import Workout from '../Components/WeightLifting/Workout';

export default function YourStatsScreen({ navigation }:any) {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>Your Average Stats</Text>
            </View>

             <View style={styles.StatVariants}>
                    <View  style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Most Liked Cardio Type</Text>               
                        <Text style={styles.StatVariantStat}>BasketBall</Text>
                    </View>
                    <View style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Average Cardio Length</Text>               
                        <Text style={styles.StatVariantStat}>80</Text>
                    </View>
                    <View  style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Favorite Workout</Text>                  
                        <Text style={styles.StatVariantStat}>Favorite </Text>
                    </View>
                    <View style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Average Number of Exersizes per Workout</Text>              
                        <Text style={styles.StatVariantStat}>5</Text>
                    </View>
                    <View  style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Average Steps</Text>               
                        <Text style={styles.StatVariantStat}>5050</Text>
                    </View>
                    <View  style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Average Calories Consumed</Text>      
                        <Text style={styles.StatVariantStat}>54050</Text>
                    </View>
                    <View  style={styles.StatVariant}>
                        <Text style={styles.StatVariantText}>Average Calories Burned</Text>          
                        <Text style={styles.StatVariantStat}>5000</Text>
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
    CreateWorkout: {
      height: 45,
      borderRadius: 5,
      backgroundColor: "#00BFFF",
      width: 250,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40
  },
  CreateWorkoutText: {
      color: "white",
      fontWeight: "800",
      fontSize: 20
  },
  StatVariants:
  {
      width:"100%",
      flexDirection:"row",
      flexWrap:"wrap",
      justifyContent:"space-around",
      marginBottom:30
  },
  StatVariant:
  {
      width:"45%",
      height:150, 
      backgroundColor:"#120A8F",
      borderRadius:5,
      marginTop:20,
      marginBot:20,
      justifyContent:"space-around",
      alignItems:"center"
  },
  StatVariantText:
  {
      fontSize:20,
      fontWeight:"500",
      color:"white",
      textAlign:"center"
  },
  StatVariantStat:
  {
    fontSize:17,
    fontWeight:"800",
    color:"white",
    textAlign:"center"
  }
});