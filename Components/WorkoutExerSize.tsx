import { useState } from 'react';
import {View,Text,StyleSheet,TouchableHighlight,} from 'react-native';

interface exerSize 
{
    name:string,
    sets:number
}

interface props{
    exerSize:exerSize
    setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    ExerSizes: exerSize[]
    setExerSizes: React.Dispatch<React.SetStateAction<exerSize[]>>
}
  
export default function WorkoutExerSize({exerSize,setShowUpdate,ExerSizes,setExerSizes}:props) {

    const [Sets, setSets] = useState(exerSize.sets)
    const updateExerSizeSets = (newSets: number) => {
        const index = ExerSizes.findIndex((e) => e.name === exerSize.name);
        const updatedExerSizes = [...ExerSizes];
        updatedExerSizes[index] = { ...exerSize, sets: newSets };
        console.log(updatedExerSizes)
        setExerSizes(updatedExerSizes);
        setShowUpdate(true);
      };
return (
    <View style={styles.ExerSize}>
        <View style={styles.ExerSizeTop}>
            <Text style={styles.ExerSizeTopText}>{exerSize.name}</Text>
        </View>
        <View style={styles.ExerSizeBottom}>
            <View style={styles.ExerSizeBottomTop}>
                <Text style={styles.ExerSizeBottomText}>Sets</Text>
            </View>
            <View style={styles.ExerSizeBottomBot}>
                <TouchableHighlight >
                    <Text onPress={()=>{
                        setSets(Sets-1)
                        setShowUpdate(true)
                        updateExerSizeSets(Sets-1)
                    }} style={styles.ExerSizeBottomText}>-</Text>
                </TouchableHighlight>
                <Text style={styles.ExerSizeBottomText}>{Sets}</Text>
                <TouchableHighlight >
                    <Text onPress={()=>{
                        setSets(Sets+1)
                        setShowUpdate(true)
                        updateExerSizeSets(Sets+1)
                    }} style={styles.ExerSizeBottomText}>+</Text>
                </TouchableHighlight>
            </View>
        </View>
        <View style={styles.ExerSizeTopTop}>
            <Text style={styles.ExerSizeTopTopText} >Delete</Text>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    ExerSize: {
        width: "45%",
        borderRadius: 5,
        height: 150,
        backgroundColor: "#3F00FF",
        marginTop: 20,
        marginBottom: 20
    },
    ExerSizeTopTop: {
        width: "100%",
        height: "25%",
        alignItems: "center",
    },
    ExerSizeTopTopText:{
        fontSize:25,
        fontWeight:"700",
        color:"red"
    }
    , ExerSizeTop: {
        width: "100%",
        height: "25%",
        justifyContent: "space-around",
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
    }
});