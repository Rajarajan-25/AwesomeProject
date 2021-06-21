import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
const NumberInput=(props)=>{
    return(
        <TextInput style={styles.mobileNum}
    
     keyboardType='number-pad'
     />
    )
}
export default NumberInput;

const styles=StyleSheet.create({
    mobileNum:{
        height:40,
        width:'85%',
        borderRadius:20,
        backgroundColor:'#f2f2f2',
        marginBottom:'10%',
        fontSize:15,
        position:'relative',
        
      }
})