import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';



export default function HomeScreen({ navigation }:any) {
    return (
      <ScrollView >
        <View style={styles.container}>
    
                <View style={styles.headingBG} >
                <Text style={styles.heading}>ShapeShift</Text>
                </View>
        
                <Text style={styles.cathLine}>Unlock Your  Potential - One Step at a Time</Text>
        

                <TouchableHighlight
                style={styles.button5}
                onPress={() => navigation.navigate('Today')}
                >
                <Text style={styles.text}>Today Stats</Text>
                </TouchableHighlight>

                <TouchableHighlight
                style={styles.button1}
                onPress={() => navigation.navigate('Weight Lifting')}
                >
                <Text style={styles.text}>Weight Lifting</Text>
                </TouchableHighlight>
        
                <TouchableHighlight
                style={styles.button2}
                onPress={() => navigation.navigate('Food')}
                >
                <Text style={styles.text}>Food</Text>
                </TouchableHighlight>
        
                <TouchableHighlight
                style={styles.button3}
                onPress={() => navigation.navigate('Cardio')}
                >
                <Text style={styles.text}>Cardio</Text>
                </TouchableHighlight>

                <TouchableHighlight
                style={styles.button6}
                onPress={() => navigation.navigate('YourStats')}
                >
                <Text style={styles.text}>Yout Stats </Text>
                </TouchableHighlight>
            </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:"flex",
      alignItems:"center"
    },
    button1:{
      width:200,
      borderRadius:5,
      height:60,
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"#3457D5",
      marginBottom:50,
      cursor: "pointer",
    },
    button2:{
      width:200,
      borderRadius:5,
      height:60,
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"#FEBE10",
      marginBottom:50,
      cursor: "pointer",
    },  
    button3:{
      width:200,
      borderRadius:5,
      height:60,
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"#32de84",
      marginBottom:50,
      cursor: "pointer",
    }, 
    
    button4:{
      width:200,
      borderRadius:5,
      height:60,
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"#EE204D",
      marginBottom:50,
      cursor: "pointer",
    }
    ,  
    button5:{
      width:200,
      borderRadius:5,
      height:60,
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"#15f4ee",
      marginBottom:50,
      cursor: "pointer",
    },    
     button6:{
        width:200,
        borderRadius:5,
        height:60,
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#FF4500",
        marginBottom:50,
        cursor: "pointer",
      },
    text: {
      fontSize: 18,
      color: 'white',
      fontWeight:"700"
    },
    heading:
    {
      fontSize:25,
      fontWeight:"900",
      color:"white"
    },
    cathLine:{
      fontSize:16,
      fontWeight:"900",
      marginBottom:100
  
    },
    headingBG:
    {
      backgroundColor:"#00BFFF",
      width:"100%",
      height:100,
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      marginBottom:50
  
    }
  
  
  });