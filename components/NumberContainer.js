import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

const NumberContainer = props => {
    return(
        
        <View><Text>{props.children}</Text></View>
    );
};
export default NumberContainer;

const styles=StyleSheet.create({
    container: {
        borderWidth:2,
        borderRadius:10,
        borderColor:Colors.secondary,
        padding:10,
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
    },
    number:{
        color:Colors.secondary,
        fontSize: 22
    }
})