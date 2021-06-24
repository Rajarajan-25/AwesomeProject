// import React,{useState} from 'react'
// import { View, Text, TextInput, StyleSheet } from 'react-native'
// import DatePicker from 'react-native-datepicker';

// const DateInput = (props) => {
//   const [date, setDate] = useState('');

//   const {
//     field: { name, onBlur, onChange, value },
//     form: { errors, touched, setFieldTouched },
//     ...inputProps
//   } = props

//   const hasError = errors[name] && touched[name]
  
//   return (
//     <>
    
//       <View style={styles.textInput}>
//             <DatePicker
//               style={[
                
//                 hasError && styles.errorInput
//               ]}
//               date={date}
//               mode="date"
//               showIcon={false}
//               placeholder="select date"
//               format="DD-MM-YYYY"
//               minDate="01-01-1921"
//               maxDate="23-06-2021"
//               confirmBtnText="Confirm"
//               cancelBtnText="Cancel"
//               customStyles={{
//                 dateIcon: {
//                   width: 20,
//                   height: 20,
//                   position: 'absolute',
//                   left: 6,
//                   top: 5,
//                   marginLeft: 0,
//                 },
//                 dateInput: {
                  
//                   borderColor: 'white',
//                   borderWidth:0,
//                   alignItems:'flex-start'

//                 },
//               }}
//               value={value}
//               onChangeText={(text) => onChange(name)(text)}
//               onBlur={() => {
//                 setFieldTouched(name)
//                 onBlur(name)
//               }}
//               {...inputProps}
//               onDateChange={(date) => {
//                 setDate(date);
              
//               }}
//             />
//           </View>
//       {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   textInput: {
//     height: 40,
//     width: '100%',
//     margin: 10,
//     backgroundColor: 'white',
//     borderColor: 'gray',
//     borderWidth: StyleSheet.hairlineWidth,
//     borderRadius: 10,
//   },
//   errorText: {
//     fontSize: 10,
//     color: 'red',
//   },
//   errorInput: {
//     borderColor: 'red',
//   }
// })

// export default DateInput