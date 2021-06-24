// import React from 'react'
// import {
//   Keyboard,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   TextInput,
//   Button,
//   Alert,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback
// } from 'react-native'

// import { Formik, Field } from 'formik'
// import * as yup from 'yup'
// import CustomInput from './CustomInput'
// import DateInput from './DateInput'

// const DismissKeyboard = ({children})=>(
//   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// )

// const signUpValidationSchema = yup.object().shape({
//     fullName: yup
//       .string()
//       .matches(/(\w.+\s).+/, 'Enter First and Last Name')
//       .required('Full name is required'),
//     dateOfBirth: yup
//     .string()
//     .email("Please enter valid email"),
  
//     phoneNumber: yup
//       .string()
//       .matches(/(91)(\d){10}\b/, 'Enter a valid phone number')
//       .required('Phone number is required'),
//     email: yup
//       .string()
//       .email("Please enter valid email")
//       .required('Email is required'),
//     password: yup
//             .string()
//       .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
//       .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
//       .matches(/\d/, "Password must have a number")
//       .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
//       .min(8, ({ min }) => `Password must be at least ${min} characters`)
//       .required('Password is required'),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref('password')], 'Passwords do not match')
//       .required('Confirm password is required'),
      
//       check: yup.boolean().oneOf([true], 'Please check the agreement')
//     })


// const SignUp = () => {
//   return (
    
//     <>
//       <StatusBar barStyle="dark-content" />
//       <DismissKeyboard>
//       <KeyboardAvoidingView behavior='height' style={styles.container}>
//         <View style={styles.signupContainer}>
//           <Text>FORMIK FORM</Text>
          
//           <Formik
//           validationSchema={signUpValidationSchema}
//             initialValues={{
//               fullName: '',
//               date: '',
//               email: '',
//               phoneNumber: '',
//               password: '',
//               confirmPassword: '',
//               check: false

//             }}
            
//             onSubmit={values => Alert.alert(JSON.stringify(values))}
            
//           >
//             {({ handleSubmit, isValid }) => (
//               <>
//                 <Field
//                   component={CustomInput}
//                   name="fullName"
//                   placeholder="Full Name"
//                   // onSubmitHandler={()=>{secondTextInput.focus();}}
//                 />
//                 <Field
//                   // ref={(input)=>{secondTextInput=input;}}
//                   component={DateInput}
//                   name="date"
//                   placeholder="Date of Birth"
//                   keyboardType="numeric"
//                 />
//                 <Field
//                   component={CustomInput}
//                   name="email"
//                   placeholder="Email Address"
//                   keyboardType="email-address"
//                 />
//                 <Field
//                   component={CustomInput}
//                   name="phoneNumber"
//                   placeholder="Phone Number"
//                   keyboardType="numeric"
//                 />
//                 <Field
//                   component={CustomInput}
//                   name="passowrd"
//                   placeholder="Password"
//                   secureTextEntry
//                 />
//                 <Field
//                   component={CustomInput}
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   secureTextEntry
//                 />
                

//                 <Button
//                   color='#ff5d60'
//                   onPress={handleSubmit}
//                   title="SUBMIT"
//                   disabled={!isValid}
//                 />
//               </>
//             )}
//           </Formik>
//         </View>
//       </KeyboardAvoidingView>
//       </DismissKeyboard>
//     </>
    
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height:'100%',
//     width:'100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signupContainer: {
//     width: '80%',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 10,
//     elevation: 10,
//     backgroundColor: '#e6e6e6'
//   },
// })
// export default SignUp