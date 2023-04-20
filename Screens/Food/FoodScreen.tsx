import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableHighlight } from 'react-native';



interface food
{
  name: string
  brand:  string
  calories: string
}


import { useState } from 'react';
import FoodItem from '../../Components/WeightLifting/FoodItem';


export default function FoodScreen({ navigation }:any) {
  const [foodData, setFoodData] = useState<food[]>();
  const [text, setText] = useState('');

  const fetchNutritionData = async (query:string) => {
    const url = `https://api.nutritionix.com/v1_1/search/${query}%20?results=0:10&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=df2b8056&appKey=074d2738d57a739a5789cb7847bd91ae`;
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  }


  const handleTextChange = (newText:string) => {
    if(newText.length > 0)
    {
      setText(newText);
      fetchNutritionData(newText).then((hits) => {
    
        let arr:food[] = []
  
        hits.forEach((hit:any) => {
          arr.push({brand:hit.fields.brand_name,calories:hit.fields.nf_calories,name:hit.fields.item_name})
        });
        setFoodData(arr)
      });
    }else
    {
      setFoodData([])
    }

  };



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.Heading}>
        <Text style={styles.HeadingText}>Food</Text>
      </View>


              <TouchableHighlight  onPress={()=>{
                navigation.navigate("Food Today")
              }}
                 style={styles.ChangeStatsBtn}>
                <Text style={styles.ChangeStatsBtnText}>See your food</Text>
            </TouchableHighlight>


      <View style={styles.label}>
                <Text style={styles.labelText}>Name of the food</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={handleTextChange}
                    value={text}
                    placeholder="Type here"
                /> 
       </View>


    {foodData && foodData.map((item)=>{
      return <FoodItem   foodItem={item}/>
    })
          
    }


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
ChangeStatsBtn:
{
    width:"75%",
    marginBottom:30,
    marginTop:30,
    height:50,
    backgroundColor:"#009000",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5
}    ,
ChangeStatsBtnText:
{
    color:"white",
    fontSize:20,
    fontWeight:"700"
}
});