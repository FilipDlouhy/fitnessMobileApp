import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CardioAddScreen() {
    const [text, setText] = useState('');
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleTextChange = (newText:string) => {
        setText(newText);
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.Heading}>
                <Text style={styles.HeadingText}>BasketBall</Text>
            </View>

            <View style={styles.FormContainer}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>How Long it Lasted In minutes</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleTextChange}
                        value={text}
                        placeholder="Minutes"
                    />
                </View>

                <View style={styles.label}>
                    <Text style={styles.labelText}>Select sasadasdadasd </Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.input}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item key={"Low"} label={"Low"} value={"Low"} />
                        <Picker.Item key={"Medium"} label={"Medium"} value={"Medium"} />
                        <Picker.Item key={"Hard"} label={"Hard"} value={"Hard"} />
                        <Picker.Item key={"Itense"} label={"Itense"} value={"Itense"} />
                    </Picker>
                </View>



                <View style={styles.BottomButtonContainer}>
                    <TouchableHighlight style={styles.BottomButton}>
                        <Text style={styles.BottomButtonText}>Add Cardio for Today</Text>
                    </TouchableHighlight>
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
    FormContainer:{
        width:"100%",
        alignItems:"center"
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
    datePicker: {
        width: '80%',
        marginBottom: 10,
    },
    BottomButtonContainer:{
        width:"100%",
        marginTop:50,
        marginBottom:50,
        justifyContent:"center",
        alignItems:"center"
    },BottomButton:
    {
        width:"60%",
        height:70,
        backgroundColor:"#00FF00",
        borderRadius:5,
        justifyContent:"center",
        alignItems:"center"
    },
    BottomButtonText:{
        color:"white",
        fontSize:20,
        fontWeight:"700"
    }
  })
  ;