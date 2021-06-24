import React,{useRef, useState} from 'react';
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-datepicker';
import { date } from 'yup/lib/locale';
import {Picker} from '@react-native-picker/picker';

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
  
const [date, setDate]=useState(new Date());
const [isSelected, setisSelected] = useState([
  {id: 1, value: true, name: 'Male', selected: false},
  {id: 2, value: false, name: 'Female', selected: false},
]);  

const [selectedZone, setSelectedZone] = useState();

const onRadioBtnClick = (item) => {
  let updatedState = isSelected.map((isSelectedItem) =>
    isSelectedItem.id === item.id
      ? {...isSelectedItem, selected: true}
      : {...isSelectedItem, selected: false},
  );
  setisSelected(updatedState);
};


  return (
    <>
    
      <StatusBar barStyle="dark-content" />
      <ScrollView>
      <DismissKeyboard>
      <KeyboardAvoidingView behavior='height' style={styles.container}>
      <View style={styles.loginContainer}>
          <Text>FORMIK FORM WITH YUP VALIDATION</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ fullName:'',date:'26-01-2021' ,mobileNumber:'' ,email: '', password: '', confirmPassword:'' }}
            onSubmit={values =>{ 
              values.date=date;
              Alert.alert(JSON.stringify(values))
            
            }}
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
                  name="fullName eg) John Smith"
                  maxLength={20}
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

            <View style={styles.gender}>
            <View style={{justifyContent: 'flex-start'}}>
              <Text>Gender</Text>
            </View>
              {isSelected.map((item) => (
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    onRadioBtnClick(item);
                  }}
                  style={styles.radioButton}>
                  {item.selected ? (
                    <View style={styles.radioButtonIcon} />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onRadioBtnClick(item);
                  }}>
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.ageData}>
            <Text>Language</Text>
          
          <View style={styles.pickDrop}>
            <Picker
              selectedValue={selectedZone}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedZone(itemValue)
              }>
              <Picker.Item label="Tamil" value="tamil" />
              <Picker.Item label="Telugu" value="telugu" />
              <Picker.Item label="Malayalam" value="malayalam" />
              <Picker.Item label="Kannada" value="kannada" />
              <Picker.Item label="Marathi" value="marathi" />
              <Picker.Item label="Hindi" value="hindi" />
            </Picker>
          </View>
          </View>
            
            <DatePicker
              
              style={styles.textInput}
               date={date} 
              onDateChange={setDate}
              mode="date"
              showIcon={false}
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-1921"
              maxDate="24-06-2021"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  left: 6,
                  top: 5,
                  marginLeft: 0,
                },
                dateInput: {
                  
                  borderColor: 'white',
                  borderWidth:0,
                  alignItems:'flex-start'

                },
              }}
              value={values.date}
              
              
            />
          

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
                  maxLength={30}
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
                  maxLength={15}
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
                  maxLength={20}
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
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30
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
    paddingLeft:'5%',
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginVertical:'4%'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
  gender: {
    marginTop: '8%',
    flexDirection: 'row',
    marginVertical: '2%',
    marginLeft: '6%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  radioButtonContainer: {
    marginVertical: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#98CFB6',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  ageData: {
    flexDirection:'row',
    marginLeft: '3%',
    alignItems: 'center',
    marginVertical: '2%',
    marginTop:'8%',
    marginBottom:'6%'
  },
  pickDrop: {
    height: 40,
    width: '65%',
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginVertical: '2%',
    fontSize: 10,
    position: 'relative',
    marginLeft: '7%',
    justifyContent: 'center',
  }

})


export default App