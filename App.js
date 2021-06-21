import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Button
} from 'react-native';

const students = [
  {id: '123', name: 'Rahul', mark: [60, 50, 40, 80], gender: 'male'},
  {id: '345', name: 'puma', mark: [50, 45, 90, 70], gender: 'male'},
  {id: '678', name: ' Daenerys', mark: [50, 48, 87, 57], gender: 'female'},
  {id: '911', name: 'Arya Stark', mark: [58, 47, 70, 73], gender: 'female'},
  {id: '913', name: 'snow', mark: [68, 45, 100, 67], gender: 'male'},
];

const total=students.reduce((currentTotal,item)=>{
  return item.mark[0] + currentTotal;
},0);

// const didPassed=students.every((item)=>{
//   return item.mark<=45;
// })

const allMarks=(students)=>{
  
  let marks=[[]];
  for(let i=0; i<students.length; i++)
  {
      for(let j=0; j<students.mark.length; j++)
      {
        marks = students[i].mark[j];
      }
  }
  // return <Text>{marks}</Text>;
  
}

const App = ()=>{
return(
<View style={{height:'100%', width:'100%'}}> 
  <View>
  {
    
      students.map((item)=>{
      return(
        <Text>{item.mark[0]}</Text>
      )})
    
  }
  </View>
  <Text>{total/students.length}</Text>
  <Button title="all pass students"/>
  
  <Text>{marks}</Text> 
</View>
);
}
export default App;

const styles=StyleSheet.create({

})