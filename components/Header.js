import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
const Header = props=>{
return(
    <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
    );
};
export default Header;

const styles=StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        paddingTop: 5,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle:{
        color: 'black',
        fontSize: 18
    }
});