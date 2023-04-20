import { View, Text, StyleSheet,ScrollView,TextInput, TouchableHighlight } from 'react-native';
interface exerSize 
{
name:string,
sets:number
}
interface props
{
    ExerSize:exerSize
    ExerSizes: exerSize[]
    setExerSizes: React.Dispatch<React.SetStateAction<exerSize[]>>
}
function ExerSize({ExerSize,ExerSizes,setExerSizes}:props) {

    function deleteExerSize ()
    {
        let arr:exerSize[] = []
        ExerSizes.map((exerSize)=>{
            if(exerSize.name !== ExerSize.name )
            {
                arr.push(exerSize)
            }
        })
        setExerSizes(arr)
    }

  return (
    <View style={styles.Exersize}>
        <Text style={styles.ExersizesNameSets}>{ExerSize.name} Sets:{ExerSize.sets}</Text>
        <Text onPress={()=>{deleteExerSize()}} style={styles.DeleteExerSize} > X</Text>
    </View>
  )
}

export default ExerSize

const styles = StyleSheet.create({

    Exersize:
    {
        width:"80%",
        height:45,
        marginBottom:20,
        marginTop:20,
        backgroundColor:"#1E90FF",
        justifyContent:"space-between",
        paddingLeft:20,
        paddingRight:20,
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