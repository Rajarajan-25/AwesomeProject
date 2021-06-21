import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input=props=>{
    return <TextInput {...props} style={{...styles.input, ...props.style}}/>;
}
export default Input;
const styles=StyleSheet.create({
    input:{
        height:50,
        marginVertical:10,
        borderBottomColor:'grey',
        borderBottomWidth:1
    }
})