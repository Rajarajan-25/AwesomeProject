import React,{useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter First and Last Name')
      .required('Full name is required'),
  mobileNumber: yup
      .string()
      .matches(/(91)(\d){10}\b/, 'Enter a valid phone number')
      .required('Mobile number is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

const DismissKeyboard = ({children})=>(
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const App = () => {
  const ref_mobileNumber = useRef();
  const ref_email = useRef();
  const ref_password = useRef();
  const ref_confirmPassword = useRef();
  

  return (
    <>
    
      <StatusBar barStyle="dark-content" />
      <DismissKeyboard>
      <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={styles.loginContainer}>
          <Text>Login Screen</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ fullName:'',email: '', password: '' }}
            onSubmit={values => console.log(values)}
          >
            {({ 
            handleChange, 
            handleBlur, 
            handleSubmit, 
            values, 
            touched, 
            errors, 
            isValid }) => (
              <>
                <TextInput
                  name="fullName"
                  placeholder="First and Last Name"
                  style={styles.textInput}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  keyboardType="default"
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => ref_mobileNumber.current.focus()}
                />
                {errors.fullName &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.fullName}</Text>
                }

                <TextInput
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  style={styles.textInput}
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  value={values.mobileNumber}
                  keyboardType="phone-pad"
                  autoFocus={true}
                  onSubmitEditing={() => ref_email.current.focus()}
                  ref={ref_mobileNumber}
                />
                 {errors.email &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.mobileNumber}</Text>
                 }


                <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoFocus={true}
                  blurOnSubmit={false}
                  onSubmitEditing={() => ref_password.current.focus()}
                  ref={ref_email}
                />
                 {errors.email &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                 }

                
                <TextInput
                  name="password"
                  placeholder="Password"
                  
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoFocus={true}
                  onSubmitEditing={() => ref_confirmPassword.current.focus()}
                  ref={ref_password}
                  secureTextEntry
                />
                {errors.password &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                }

                <TextInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.textInput}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                  autoFocus={true}
                  ref={ref_confirmPassword}
                />
                {errors.confirmPassword &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
                }
                

                <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
})


export default App