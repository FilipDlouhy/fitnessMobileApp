






import { View, Text, StyleSheet, TextInput,  TouchableHighlight } from 'react-native';



interface food
{
  name: string
  brand:  string
  calories: string
}

interface foodDatabase
{
  name: string
  brand:  string
  calories: string
  ammount:number,
  when:string,
  id:string,
  date:string
}




interface props
{
    foodItem:food
}

import { useState} from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../FireBaseConfig';
import uuid from 'react-uuid';
import { Picker } from '@react-native-picker/picker';

export default function FoodItem({foodItem}:props) {
  const [text, setText] = useState('');
  const handleTextChange = (newText:string) => {
    setText(newText);
  };
  const options = ["Breakfast", "Snack", "Lunch", "Dinner", "Second Dinner"];

  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const handleOptionChange = (value:string) => setSelectedOption(value);


  const AddFoodToDatabase = () => {
    const id = uuid()
    const date = new Date()
    const foodItemDatabase:foodDatabase ={
      name: foodItem.name,
      brand:  foodItem.brand,
      calories: foodItem.calories,
      ammount:parseInt(text),
      when:selectedOption,
      id:id,
      date:date.toDateString()
    }
    set(ref(db,"food/"+id),foodItemDatabase)
  };

  return (
    <View style={styles.FoodItem}>
        <View style={styles.FoodItemHeading}>
        <Text style={styles.FoodItemHeadingText}>{foodItem.name}</Text>
        </View>
        <View style={styles.FoodItemHCenter}>
            <View style={styles.FoodItemHCenterDiv}>
            <Text style={styles.FoodItemHCenterDivText}>Brand</Text>
            <Text style={styles.FoodItemHCenterDivText}>{foodItem.brand}</Text>
            </View>
            <View style={styles.FoodItemHCenterDiv}>
            <Text style={styles.FoodItemHCenterDivText}>Calories</Text>
            <Text style={styles.FoodItemHCenterDivText}>{foodItem.calories}</Text>
            </View>
        </View>

        <View style={styles.FoodItemLabel}>
                    <Text style={styles.FoodItemLabelText}>How many pieces</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.FoodItemLabelLabel}
                        onChangeText={handleTextChange}
                        value={text}
                        placeholder="Ammount"
                    />
                </View>
                <View style={styles.FoodItemLabel}>
                  <Picker
                    selectedValue={selectedOption}
                    onValueChange={handleOptionChange}
                    style={styles.FoodItemLabelLabelSelect}
                  >
                    {options.map((option) => (
                      <Picker.Item key={option} label={option} value={option} />
                    ))}
                  </Picker>
                  </View>

        <View style={styles.FoodItemBottom}>
            <TouchableHighlight style={styles.FoodItemBottomButton}>
            <Text style={styles.FoodItemBottomButtonText} onPress={()=>{
              handleTextChange("")
              AddFoodToDatabase()}}>Add To the list for today</Text>
            </TouchableHighlight>
        </View>
  </View>
  );
}

const styles = StyleSheet.create({
    FoodItem: {
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        height: 400,
        marginHorizontal: "auto",
        marginTop: 20, 
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: "#318CE7"
      },
FoodItemHeading:
{
  width:"100%",
  height:"20%",
  alignItems:"center",
  justifyContent:"center"
},
FoodItemHeadingText:
{
  color:"white",
  fontSize:20,
  fontWeight:"700",
  textAlign:"center"
},
FoodItemHCenter:
{
  width:"100%",
  height:"30%",
  alignItems:"center",
  justifyContent:"space-around",
  flexDirection:"row"
},
FoodItemHCenterDiv:
{
  width:"40%",
  height:"100%",
  justifyContent:"space-around",
  alignItems:"center"
},
FoodItemHCenterDivText:{
 fontSize:20,
 fontWeight:"500",
 color:"white" 
},
FoodItemBottom:
{
  width:"100%",
  height:"15%",
  alignItems:"center",
  justifyContent:"center"
},
FoodItemBottomButton:
{
  width:"85%",
  height:"80%",
  backgroundColor:"#32de84",
  borderRadius:5,
  justifyContent:"center",
  alignItems:"center"
},
FoodItemBottomButtonText:
{
  color:"white",
  fontSize:20,
  fontWeight:"500"
},
FoodItemLabel:
{
  width:"100%",
  height:60,
  alignItems:"center",
  justifyContent:"space-around",
  marginBottom:10 
},
FoodItemLabelLabelSelect: {
  width: "80%",
  height: 40,
  alignItems: "center",
  justifyContent: "space-around",
  marginBottom: 10,
  backgroundColor: "white"
},
FoodItemLabelText:
{
  color:"white",
  fontSize:20,
  fontWeight:"500"
}
,FoodItemLabelLabel:
{
  width:"80%",
  height:25,
  backgroundColor:"white",
  textAlign:"center",
  fontSize:20,
  fontWeight:"600"  
}
});
