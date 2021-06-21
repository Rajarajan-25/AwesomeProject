import React, {useState} from 'react';
import {
    Text, 
    View,
    StyleSheet,
    TextInput,
     Button,
     TouchableWithoutFeedback,
     Keyboard,
     Alert
} from 'react-native';

import Card from '../components/Card';
import colors from '../constants/Colors';
import Input from '../components/Input';
import NumberContainer from '../components/numberContainer';

const StartGameScreen=props=>{
        const [enteredValue, setEnteredValue] = useState('');
        const [confirmed, setConfirmed]= useState(false);
        const [selectedNumber, setSelectedNumber]= useState();

        const numberInputHandler=inputText=>{
            setEnteredValue(inputText.replace(/[^0-9]/g, ''));
        };

        const resetInputHandler=()=>{
            setEnteredValue('');
            setConfirmed(false)
        };

        const confirmInputHandler=()=>{
            const chosenNumber= parseInt(enteredValue);
            if( isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99 ) {
                Alert.alert('Invalid Number', 'Number has to be between 1 and 99', [{ text:'Okay', style:'destructive', onPress:resetInputHandler }])
                return;
            }

            setConfirmed(true);
            setSelectedNumber(parseInt(chosenNumber))
            setEnteredValue('');
        };

        let confirmedOutput;

        if(confirmed) {
            confirmedOutput=(
                <Card style={styles.summaryContainer}> 
                <Text>You Selected</Text>
                <View style={styles.selectedNum}><Text style={{color:colors.secondary,fontSize: 22}}>{selectedNumber}</Text></View>
                </Card>
            )
        }

    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
            }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} 
                onChangeText={numberInputHandler} value={enteredValue} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={colors.secondary}/></View>
                    <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={colors.primary}/></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};
export default StartGameScreen;

const styles=StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems:'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer:{
        width:300,
        maxWidth: '80%',
        alignItems: 'center',
               
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        paddingHorizontal:15,
        justifyContent:'space-between'
    },
    button:{
        width:80
    },
    input: {
        width:50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop:20
    },
    selectedNum:{
        
            borderWidth:2,
            borderRadius:10,
            borderColor:colors.secondary,
            padding:10,
            marginVertical:10,
            justifyContent:'center',
            alignItems:'center',
    }
    
});